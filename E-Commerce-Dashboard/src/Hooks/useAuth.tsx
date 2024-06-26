import { create } from "zustand";
import { axiosClient } from "../Library/axiosClient";
import { persist, createJSONStorage } from "zustand/middleware";
import config from "../Constants/config";
interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  address: string;
  birthDay: Date;
  role: string;
  avatar: string;
}

interface Auth {
  employee: Employee | null;
  setEmployee: (employee: Employee) => void;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (
    email: string,
    password: string
  ) => Promise<{ isAuthenticated: boolean; error: string }>;
  logout: () => void;
}

const useAuth = create(
  persist<Auth>(
    (set) => ({
      employee: null, //Lưu thông tin của user sau khi login thành công {id: 1, name: 'john'}
      setEmployee: (employee: Employee) => {
        set({ employee });
      },
      isLoading: false, // set trạng thái cho sự kiện login
      isAuthenticated: false, //trạng thái user đã login chưa
      login: async (email: string, password: string) => {
        try {
          //Khi nhấn nút login thì cập nhật trạng thái loading
          set({ isLoading: true });

          //dùng thư viện axiosClient để handle việc check, gửi và lưu token xuống localStorage
          const response = await axiosClient.post(
            config.urlAPI + "/auth/login",
            { email, password }
          );
          console.log("useAuth", response);
          //Check nếu login thành công
          if (response && response.status === 200) {
            const isAuthenticated = response.status === 200; //==> TRUE
            //Gọi tiếp API lấy thông tin User
            const { data } = await axiosClient.get(
              config.urlAPI + "/auth/profile"
            );
            

            //cập nhật lại state
            set({ employee: data.data, isAuthenticated, isLoading: false });

            //trả lại thông tin cho hàm login
            return { isAuthenticated, error: "", isLoading: false };
          }
          //Ngược lại thất bại
          else {
            set({ isLoading: false });
            return {
              isAuthenticated: false,
              isLoading: false,
              error: "Username or password is invalid",
            };
          }
        } catch (error) {
          //Gọi API lỗi
          console.log("login error", error);
          set({ isLoading: false });
          return {
            isAuthenticated: false,
            isLoading: false,
            error: "Login failed",
          };
        }
      },
      logout: () => {
        // Xóa trạng thái user và isAuthenticated
        set({ employee: null, isAuthenticated: false });
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
      },
    }),
    {
      name: "auth-storage", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    }
  )
);

export default useAuth;
