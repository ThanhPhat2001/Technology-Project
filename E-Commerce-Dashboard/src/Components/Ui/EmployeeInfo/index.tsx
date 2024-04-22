import useAuth from "../../../Hooks/useAuth";
import { Link } from "react-router-dom";
import { Avatar, Button, Space } from "antd";
import { UserOutlined } from "@ant-design/icons";
const UserInfo = () => {
  const { employee, logout } = useAuth();

  return (
    <span>
      {employee ? (
        <Space wrap size={16}>
          <Avatar
            size="small"
            icon={<UserOutlined />}
            src={<img src={employee?.avatar} alt="avatar" />}
          />
          <strong className="">{employee.fullName}</strong>
          <Button type="primary" onClick={logout} danger>
            LogOut
          </Button>
        </Space>
      ) : (
        <Space wrap size={16}>
          <Link className="text-slate-100" to={"/login"}>
            Login
          </Link>
        </Space>
      )}
    </span>
  );
};

export default UserInfo;
