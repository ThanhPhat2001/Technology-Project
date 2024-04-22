import React from "react";
import {
  Space,
  Table,
  Button,
  Modal,
  Form,
  Input,
  message,
  Pagination,
  Popconfirm,
  Card,
  Select,
  Image
} from "antd";
import type { ColumnsType } from "antd/es/table";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosClient } from "../../Library/axiosClient";
import { useNavigate, useSearchParams } from "react-router-dom";
import config from "../../Constants/config";
import type { PaginationProps } from "antd";
import {
  DeleteOutlined,
  QuestionCircleOutlined,
  EditOutlined,
} from "@ant-design/icons";

interface DataType {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  phoneNumber: number;
  address: string;
  birthDay: string;
  password: string;
  avatar: string;
  role: string;
}

const EmployeePage = () => {
  const [messageApi, contextHolder] = message.useMessage();
  // Toggle Modal Edit
  const [isModalEditOpen, setIsModalEditOpen] = React.useState(false);
  // Toggle Modal Create
  const [isModalCreateOpen, setIsModalCreateOpen] = React.useState(false);
  const { Option } = Select;
  const navigate = useNavigate();
  //=========================== PHÂN TRANG =================================//
  const [params] = useSearchParams();
  const page = params.get("page");
  const limit = params.get("limit");
  const int_page = page ? parseInt(page) : 1;
  const int_limit = limit ? parseInt(limit) : 5;
  const onChangePagination: PaginationProps["onChange"] = (pageNumber) => {
    console.log("Page: ", pageNumber);
    navigate(`/employees?page=${pageNumber}`);
  };

  //Lay danh sach danhmuc
  const getEmployees = async (page = 1, int_limit = 5) => {
    return axiosClient.get(
      config.urlAPI + `/employees?page=${page}&limit=${int_limit}`
    );
  };

  // Access the client
  const queryClient = useQueryClient();

  //Lấy danh sách về
  const queryEmployee = useQuery({
    queryKey: ["employees", int_page],
    queryFn: () => getEmployees(int_page, int_limit),
  });

  console.log(
    "<<=== 🚀 queryEmployee.data.data.data ===>>",
    queryEmployee.data?.data.data
  );

  //======= Sự kiện XÓA =====//
  const fetchDelete = async (objectID: string) => {
    return axiosClient.delete(config.urlAPI + "/employees/" + objectID);
  };
  // Mutations => Thêm mới, xóa, edit
  const mutationDelete = useMutation({
    mutationFn: fetchDelete,
    onSuccess: () => {
      console.log("Delete success !");
      messageApi.open({
        type: "success",
        content: "Delete success !",
      });
      // Làm tươi lại danh sách danh mục dựa trên key đã định nghĩa
      queryClient.invalidateQueries({ queryKey: ["employees"] });
    },
    onError: () => {
      //khi gọi API bị lỗi
    },
  });

  //======= Sự kiện EDit =====//
  const fetchUpdate = async (formData: DataType) => {
    const { id, ...payload } = formData;
    return axiosClient.patch(config.urlAPI + "/employees/" + id, payload);
  };
  // Mutations => Thêm mới, xóa, edit
  const mutationUpdate = useMutation({
    mutationFn: fetchUpdate,
    onSuccess: () => {
      console.log("Update success !");
      messageApi.open({
        type: "success",
        content: "Update success !",
      });
      // Làm tươi lại danh sách danh mục dựa trên key đã định nghĩa
      queryClient.invalidateQueries({ queryKey: ["employees"] });
      //Ẩn modal
      setIsModalEditOpen(false);
    },
    onError: () => {
      //khi gọi API bị lỗi
    },
  });

  const [updateForm] = Form.useForm();
  //Khi nhấn nut OK trên Modal
  const handleEditOk = () => {
    // setIsModalEditOpen(false);
    console.log("edit submit");
    //Cho submit form trong Modal
    updateForm.submit();
  };
  //Khi nhấn nut Cancel trên modal
  const handleEditCancel = () => {
    setIsModalEditOpen(false);
    console.log("edit cancel");
  };

  // //hàm lấy thông tin từ form Edit
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onFinishEdit = async (values: any) => {
    console.log("Success:", values); //=> chính là thông tin ở form edit
    //Gọi API để update category
    mutationUpdate.mutate(values);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onFinishEditFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  //======= Sự kiện Create =====//
  const fetchCreate = async (formData: DataType) => {
    return axiosClient.post(config.urlAPI + "/employees", formData);
  };
  // Mutations => Thêm mới, xóa, edit
  const mutationCreate = useMutation({
    mutationFn: fetchCreate,
    onSuccess: () => {
      console.log("Create success !");
      messageApi.open({
        type: "success",
        content: "Create success !",
      });
      // Làm tươi lại danh sách danh mục dựa trên key đã định nghĩa
      queryClient.invalidateQueries({ queryKey: ["employees"] });
      //Ẩn modal
      setIsModalCreateOpen(false);
      createForm.resetFields(); //làm trống các input
    },
    onError: () => {
      //khi gọi API bị lỗi
    },
  });

  const [createForm] = Form.useForm();
  //Khi nhấn nut OK trên Modal
  const handleCreateOk = () => {
    // setIsModalCreateOpen(false);
    console.log("Create submit");
    //Cho submit form trong Modal
    createForm.submit();
  };
  //Khi nhấn nut Cancel trên modal
  const handleCreateCancel = () => {
    setIsModalCreateOpen(false);
    console.log("Create cancel");
  };

  //hàm lấy thông tin từ form Create
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onFinishCreate = async (values: any) => {
    console.log("Success:", values); //=> chính là thông tin ở form edit
    //Gọi API để update category
    mutationCreate.mutate(values);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onFinishCreateFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const columns: ColumnsType<DataType> = [
    {
      title: "FirstName",
      dataIndex: "firstName",
      key: "firstName",
    },
    {
      title: "LastName",
      dataIndex: "lastName",
      key: "lastName",
    },
    {
      title: "FullName",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "PhoneNumber",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "BirthDay",
      dataIndex: "birthDay",
      key: "birthDay",
    },
    {
      title: "Password",
      dataIndex: "password",
      key: "password",
    },
    {
      title: "Avatar",
      dataIndex: "avatar",
      key: "active",
      render: (text) => <Image src={text} alt="avatar" width={50} />
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },

    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="dashed"
            icon={<EditOutlined />}
            onClick={() => {
              console.log("Edit this item");
              setIsModalEditOpen(true); //show modal edit lên
              updateForm.setFieldsValue(record);
            }}
          ></Button>

          <Popconfirm
            title="Are you sure to delete?"
            onConfirm={() => {
              // DELETE
              console.log("DELETE", record);
              mutationDelete.mutate(record.id);
            }}
            icon={<QuestionCircleOutlined style={{ color: "red" }} />}
            onCancel={() => {}}
            okText="Đồng ý"
            okType="danger"
            cancelText="Đóng"
          >
            <Button danger type="dashed" icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Card
        title="EMPLOYEES LIST"
        extra={
          <Button
            type="primary"
            onClick={() => {
              console.log("Thêm mới");
              setIsModalCreateOpen(true);
            }}
          >
            Add Employee
          </Button>
        }
      >
        {contextHolder}

        <Table
          pagination={false}
          columns={columns}
          key={"id"}
          dataSource={queryEmployee.data?.data.data.employees}
        />
        <div>
          <Pagination
            defaultCurrent={int_page}
            total={queryEmployee.data?.data.data.totalRecords}
            // showSizeChanger
            defaultPageSize={int_limit}
            onChange={onChangePagination}
            showTotal={(total) => `Total ${total} items`}
          />
        </div>
        {/* begin Edit Modal */}
        <Modal
          title="Edit Customer"
          open={isModalEditOpen}
          onOk={handleEditOk}
          onCancel={handleEditCancel}
        >
          <Form
            form={updateForm}
            name="edit-form"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={onFinishEdit}
            onFinishFailed={onFinishEditFailed}
            autoComplete="off"
          >
            <Form.Item<DataType>
              label="FirstName"
              name="firstName"
              rules={[
                { required: true, message: "Please input your FirstName!" },
                { min: 2, message: "Tối thiểu 2 kí tự" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item<DataType>
              label="LastName"
              name="lastName"
              rules={[
                { required: true, message: "Please input your LastName!" },
                { min: 2, message: "Tối thiểu 2 kí tự" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item<DataType>
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Please input your Email!" },
                { type: "email" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item<DataType>
              label="PhoneNumber"
              name="phoneNumber"
              rules={[
                { required: true, message: "Please input your Phone Number!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item<DataType>
              label="Address"
              name="address"
              rules={[
                { required: true, message: "Please input your Address!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item<DataType> label="BirthDay" name="birthDay">
              <Input />
            </Form.Item>

            <Form.Item<DataType> label="Password" name="password"
             rules={[
              { required: true, message: "Please input your Password!" },
            ]}
            >
              <Input />
            </Form.Item>

            <Form.Item<DataType> label="Avatar" name="avatar">
              <Input />
            </Form.Item>

            <Form.Item<DataType> label="Role" name="role">
              <Select>
                <Option value="Admin">Admin</Option>
                <Option value="Editor">Editor</Option>
                <Option value="User">User</Option>
              </Select>
            </Form.Item>


            <Form.Item hidden label="Id" name="id">
              <Input />
            </Form.Item>
          </Form>
        </Modal>
        {/* End Edit Modal */}

        {/* begin Create Modal */}
        <Modal
          title="Create Customer"
          open={isModalCreateOpen}
          onOk={handleCreateOk}
          onCancel={handleCreateCancel}
        >
          <Form
            form={createForm}
            name="create-form"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={onFinishCreate}
            onFinishFailed={onFinishCreateFailed}
            autoComplete="off"
          >
            <Form.Item<DataType>
              label="FirstName"
              name="firstName"
              rules={[
                { required: true, message: "Please input your FirstName!" },
                { min: 2, message: "Tối thiểu 2 kí tự" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item<DataType>
              label="LastName"
              name="lastName"
              rules={[
                { required: true, message: "Please input your LastName!" },
                { min: 2, message: "Tối thiểu 2 kí tự" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item<DataType>
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Please input your Email!" },
                { type: "email" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item<DataType>
              label="PhoneNumber"
              name="phoneNumber"
              rules={[
                { required: true, message: "Please input your Phone Number!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item<DataType>
              label="Address"
              name="address"
              rules={[
                { required: true, message: "Please input your Address!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item<DataType> label="BirthDay" name="birthDay">
              <Input />
            </Form.Item>

            <Form.Item<DataType>
              label="PassWord"
              name="password"
              rules={[
                { required: true, message: "Please input your PassWord!" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item<DataType> label="Avatar" name="avatar">
              <Input />
            </Form.Item>

            <Form.Item<DataType> label="Role" name="role" initialValue="User">
              <Select>
                <Option value="Admin">Admin</Option>
                <Option value="Editor">Editor</Option>
                <Option value="User">User</Option>
              </Select>
            </Form.Item>
          </Form>
        </Modal>
        {/* End Create Modal */}
      </Card>
    </>
  );
};

export default EmployeePage;
