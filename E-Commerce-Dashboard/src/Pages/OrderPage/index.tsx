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
  PaginationProps,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosClient } from "../../Library/axiosClient";
import { useNavigate, useSearchParams } from "react-router-dom";
import config from "../../Constants/config";
import {
  DeleteOutlined,
  QuestionCircleOutlined,
  EditOutlined,
} from "@ant-design/icons";

interface IProduct {
  id: string;
  product_name: string;
  price: number;
  discount: number;
  images: { url: string }[];
  salePrice: number;
}

interface IOrderDetail {
  product: IProduct;
  quantity: number;
  _id: string;
  totalPrice: number;
}

interface DataType {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  orderStatus: string;
  orderDate: Date;
  shippingDate: Date;
  orderNote: string;
  shippingStreet: string;
  shippingCity: string;
  shippingState: string;
  paymentType: string;
  totalPrice: number;
  orderDetail: IOrderDetail[];
}

const OrderPage = () => {
  const [messageApi, contextHolder] = message.useMessage();
  //Toggle Modal Edit
  const [isModalEditOpen, setIsModalEditOpen] = React.useState(false);
  //Toggle Modal Create
  const [isModalCreateOpen, setIsModalCreateOpen] = React.useState(false);
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [selectedOrderDetail, setSelectedOrderDetail] = React.useState<
    IOrderDetail[]
  >([]);

  const navigate = useNavigate();
  //=========================== PHÂN TRANG =================================//
  const [params] = useSearchParams();
  const page = params.get("page");
  const limit = params.get("limit");
  const int_page = page ? parseInt(page) : 1;
  const int_limit = limit ? parseInt(limit) : 5;
  const queryClient = useQueryClient();
  const [updateForm] = Form.useForm();
  const [createForm] = Form.useForm();
  const onChangePagination: PaginationProps["onChange"] = (pageNumber) => {
    console.log("Page: ", pageNumber);
    navigate(`/orders?page=${pageNumber}`);
  };

  //Lay danh sach Order
  const getOrders = async (page = 1, limit = 5) => {
    return await axiosClient.get(
      config.urlAPI + `/orders?page=${page}&limit=${limit}`
    );
  };

  // Lấy danh sách về
  const queryOrder = useQuery({
    queryKey: ["orders", int_page, int_limit],
    queryFn: () => getOrders(int_page, int_limit),
  });

  console.log("<<=== 🚀 queryOrder.data.data ===>>", queryOrder.data?.data);

  //======= Sự kiện XÓA =====//
  const fetchDelete = async (objectID: string) => {
    return axiosClient.delete(config.urlAPI + "/orders/" + objectID);
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
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
    onError: () => {
      //khi gọi API bị lỗi
    },
  });

  //======= Sự kiện EDit =====//
  const fetchUpdate = async (formData: DataType) => {
    const { id, ...payload } = formData;
    return axiosClient.patch(config.urlAPI + "/orders/" + id, payload);
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
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      //Ẩn modal
      setIsModalEditOpen(false);
    },
    onError: () => {
      //khi gọi API bị lỗi
    },
  });

  // show order details
  const showModal = (orderDetail: IOrderDetail[]) => {
    setSelectedOrderDetail(orderDetail);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

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

  //hàm lấy thông tin từ form Edit
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
    return axiosClient.post(config.urlAPI + "/orders", formData);
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
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      //Ẩn modal
      setIsModalCreateOpen(false);
      createForm.resetFields(); //làm trống các input
    },
    onError: () => {
      //khi gọi API bị lỗi
    },
  });

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
      title: "Full Name",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Order Status",
      dataIndex: "orderStatus",
      key: "orderStatus",
    },
    {
      title: "Order Date",
      dataIndex: "orderDate",
      key: "orderDate",
    },
    {
      title: "Order Notes",
      dataIndex: "orderNote",
      key: "orderNote",
    },
    {
      title: "Shipping Street",
      dataIndex: "shippingStreet",
      key: "shippingStreet",
    },
    {
      title: "Shipping City",
      dataIndex: "shippingCity",
      key: "shippingCity",
    },
    {
      title: "Payment Type",
      dataIndex: "paymentType",
      key: "paymentType",
    },
    {
      title: "Total Price",
      dataIndex: "totalPrice",
      key: "totalPrice",
    },
    {
      title: "Order Detail",
      dataIndex: "orderDetail",
      key: "orderDetail",
      render: (orderDetail: IOrderDetail[]) => (
        <Space>
          <Button type="link" onClick={() => showModal(orderDetail)}>
            Read More
          </Button>
        </Space>
      ),
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
            okText="YES"
            okType="danger"
            cancelText="CANCEL"
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
        title="CATEGORIES LIST"
        extra={
          <Button
            type="primary"
            onClick={() => {
              console.log("Thêm mới");
              setIsModalCreateOpen(true);
            }}
          >
            Add Category
          </Button>
        }
      >
        {contextHolder}
        <Table
          pagination={false}
          columns={columns}
          rowKey={"id"}
          dataSource={queryOrder.data?.data.data.orders}
        />
        <div>
          <Pagination
            defaultCurrent={int_page}
            total={queryOrder.data?.data.data.totalRecords}
            // showSizeChanger
            defaultPageSize={int_limit}
            onChange={onChangePagination}
            showTotal={(total) => `Total ${total} items`}
          />
        </div>

        {/* begin View Order Detail */}
        <Modal
          title="Order Detail"
          visible={isModalVisible}
          onCancel={handleCancel}
          footer={null}
        >
          <Table
            dataSource={selectedOrderDetail}
            columns={[
              {
                title: "Product Name",
                dataIndex: ["product", "product_name"],
                key: "product.product_name",
                
              },
              {
                title: "Price",
                dataIndex:  ["product", "price"],
                key: "product.price",
              },
              {
                title: "Discount",
                dataIndex: ["product", "discount"],
                key: "product.discount",
                render: (discount) => `${discount}%`,
              },
              {
                title: "Quantity",
                dataIndex: "quantity",
                key: "quantity",
              },
              {
                title: "Total Price",
                dataIndex: "totalPrice",
                key: "totalPrice",
              },
            ]}
            rowKey={(record, index) => (index ?? 0).toString()}
            pagination={false}
          />
        </Modal>
        {/* end View Order Detail */}

        {/* begin Edit Modal */}
        <Modal
          title="Edit Category"
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
              label="Full Name"
              name="fullName"
              rules={[
                { required: true, message: "Please input category Name!" },
                { min: 4, message: "Tối thiểu 4 kí tự" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item<DataType>
              label="orderNote"
              name="orderNote"
              rules={[{ max: 500, message: "Tối đa 500 kí tự" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item hidden label="Id" name="id">
              <Input />
            </Form.Item>
          </Form>
        </Modal>
        {/* End Edit Modal */}

        {/* begin Create Modal */}
        <Modal
          title="Create Category"
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
              label="FullName"
              name="fullName"
              rules={[
                { required: true, message: "Please input category Name!" },
                { min: 4, message: "Tối thiểu 4 kí tự" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item<DataType>
              label="orderNote"
              name="orderNote"
              rules={[{ max: 500, message: "Tối đa 500 kí tự" }]}
            >
              <Input />
            </Form.Item>
          </Form>
        </Modal>
        {/* End Create Modal */}
      </Card>
    </>
  );
};

export default OrderPage;
