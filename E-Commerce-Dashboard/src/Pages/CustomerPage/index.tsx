import React from "react";
import {
  Space,
  Table,
  Button,
  Image,
  message,
  Pagination,
  Popconfirm,
  Card,
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
  // EditOutlined
} from "@ant-design/icons";


interface DataType {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  phoneNumber: number;
  street: string;
  city: string;
  state: string;
  birthDay: string;
  photo: string;
  zip_code: number
}

const CustomerPage = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const navigate = useNavigate();
  //=========================== PHÂN TRANG =================================//
  const [params] = useSearchParams();
  const page = params.get("page");
  const limit = params.get("limit");
  const int_page = page ? parseInt(page) : 1;
  const int_limit = limit ? parseInt(limit) : 5;
  const onChangePagination: PaginationProps["onChange"] = (pageNumber) => {
    console.log("Page: ", pageNumber);
    navigate(`/customers?page=${pageNumber}`);
  };

  //Lay danh sach danhmuc
  const getCustomers = async (page = 1, int_limit = 5) => {
    return axiosClient.get(
      config.urlAPI + `/customers?page=${page}&limit=${int_limit}`
    );
  };

  // Access the client
  const queryClient = useQueryClient();

  //Lấy danh sách về
  const queryCustomer = useQuery({
    queryKey: ["customers", int_page], 
    queryFn: () => getCustomers(int_page, int_limit),
  });

  console.log(
    "<<=== 🚀 queryCustomer.data ===>>",
    queryCustomer.data?.data.data.customers
  );

  //======= Sự kiện XÓA =====//
  const fetchDelete = async (objectID: string) => {
    return axiosClient.delete(config.urlAPI + "/customers/" + objectID);
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
      queryClient.invalidateQueries({ queryKey: ["customers"] });
    },
    onError: () => {
      //khi gọi API bị lỗi
    },
  });

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
      title: "Street",
      dataIndex: "street",
      key: "street",
    },
    {
      title: "City",
      dataIndex: "city",
      key: "city",
    },
    {
      title: "State",
      dataIndex: "state",
      key: "state",
    },
    {
      title: "BirthDay",
      dataIndex: "birthDay",
      key: "birthDay",
    },
    {
      title: 'Avatar',
      dataIndex: 'avatar',
      key: 'avatar',
      render: (text) => <Image src={text} alt="avatar" width={50} />,
    },
    {
      title: "Zip_code",
      dataIndex: "zip_code",
      key: "zip_code",
    },

    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">

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
     title="CUSTOMERS LIST">
      {contextHolder}
      <Table
        pagination={false}
        columns={columns}
        key={"id"}
        dataSource={queryCustomer.data?.data.data.customers}
      />
      <div>
        <Pagination
          defaultCurrent={int_page}
          total={queryCustomer.data?.data.data.totalRecords}
          // showSizeChanger
          defaultPageSize={int_limit}
          onChange={onChangePagination}
          showTotal={(total) => `Total ${total} items`}
        />
      </div>
      </Card>
    </>
  );
};

export default CustomerPage;
