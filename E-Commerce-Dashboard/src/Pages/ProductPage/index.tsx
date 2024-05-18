import React, { useState } from "react";
import {
  Space,
  Table,
  Button,
  Modal,
  Form,
  Image,
  FormProps,
  Input,
  message,
  Pagination,
  Select,
  Popconfirm,
  InputNumber,
  Card
} from "antd";
import {
  DeleteOutlined,
  QuestionCircleOutlined,
  EditOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosClient } from "../../Library/axiosClient";
import { useNavigate, useSearchParams } from "react-router-dom";
import config from "../../Constants/config";
import type { PaginationProps } from "antd";
import UploadImages from "../../Components/ImageUpload";
import TextArea from "antd/es/input/TextArea";

type imagesType = {
  _id?: string;
  url: string;
};

type responseType = {
  destination: string;
  fieldname: string;
  filename: string;
  path: string;
  size: number;
};

type itemType = {
  url: string | undefined;
  response: responseType;
};
type categoryType = {
  id: string;
  category_name: string;
};
type brandType = {
  id: string;
  brand_name: string;
};

interface DataType {
  id: string;
  product_name: string;
  price: number;
  discount: number;
  categoryId: categoryType;
  brandId: brandType;
  description: string;
  stock: number;
  images: imagesType[];
}

const Product = () => {
  const [messageApi, contextHolder] = message.useMessage();
  //Toggle Modal Edit
  const [isModalEditOpen, setIsModalEditOpen] = React.useState(false);
  //Toggle Modal Create
  const [isModalCreateOpen, setIsModalCreateOpen] = React.useState(false);

  const [createForm] = Form.useForm();
  //upload
  const [fileList, setFileList] = useState<itemType[]>([]);

  const navigate = useNavigate();
  //=========================== PHÂN TRANG =================================//
  const [params] = useSearchParams();
  const page = params.get("page");
  const limit = params.get("limit");
  const int_page = page ? parseInt(page) : 1;
  const int_limit = limit ? parseInt(limit) : 5;
  const onChangePagination: PaginationProps["onChange"] = (pageNumber) => {
    console.log("Page: ", pageNumber);
    navigate(`/Products?page=${pageNumber}`);
  };

  //Lay danh sach danhmuc
  const GetProducts = async (page = 1, limit = 10) => {
    return axiosClient.get(
      config.urlAPI + `/products?page=${page}&limit=${limit}`
    );
  };

  const queryCategories = useQuery({
    queryKey: ["categories"],
    queryFn: async () => await axiosClient.get(config.urlAPI + `/categories`),
  });
  console.log("queryCategorie",queryCategories.data?.data.data.categories)

  const queryBrands = useQuery({
    queryKey: ["brands"],
    queryFn: async () => await axiosClient.get(config.urlAPI + `/brands`),
  });
  // Access the client
  const queryClient = useQueryClient();

  //Lấy danh sách về
  const queryProduct = useQuery({
    queryKey: ["products", int_page, int_limit],
    queryFn: () => GetProducts(int_page, int_limit),
  });

  console.log(
    "<<=== 🚀 queryProduct.data?.data.data===>>",
    queryProduct.data?.data.data
  );

  //======= Sự kiện XÓA =====//
  const fetchDelete = async (id: string) => {
    return await axiosClient.delete(config.urlAPI + "/products/" + id);
  };
  const mutationDelete = useMutation({
    mutationFn: fetchDelete,
    onSuccess: () => {
      console.log("Delete success !");
      messageApi.open({
        type: "success",
        content: "Delete success !",
      });
      // Làm tươi lại danh sách danh mục dựa trên key đã định nghĩa
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: () => {
      //khi gọi API bị lỗi
      console.log("mutationDelete error Api");
      messageApi.open({
        type: "error",
        content: "Delete failed: Forbidden",
      });
    },
  });

  //======= Sự kiện EDit =====//
  const fetchUpdate = async (formData: DataType) => {
    const { id, ...payload } = formData;
    return axiosClient.patch(config.urlAPI + "/products/" + id, payload);
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
      queryClient.invalidateQueries({ queryKey: ["products"] });
      //Ẩn modal
      setIsModalEditOpen(false);
    },
    onError: () => {
      //khi gọi API bị lỗi
    },
  });

  const [updateForm] = Form.useForm();
  // Khi nhấn nut OK trên Modal
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

  // const onFinishEdit: FormProps<DataType>["onFinish"] = async (values) => {
  //   console.log(values.brandId);
  //   console.log(values.categoryId);
  //   // Sao chép tất cả giá trị của values vào updatedValues
  //   const updatedValues = { ...values };
  //   // Cập nhật giá trị mới cho trường images nếu có ảnh được tải lên
  //   if (filePathFormat.length > 0) {
  //     const imageUploadUrls = filePathFormat
  //       .filter((url): url is string => url !== undefined)
  //       .map((url) => ({ url }));
  //     updatedValues.images = [...imageUploadUrls];
  //   }
  //   updatedValues.images = values.images.map((image) => ({ url: image.url }));
  //   console.log("Image:", updatedValues.images); //=> chính là thông tin ở form edit
  //   // Gửi dữ liệu cập nhật lên server
  //   mutationUpdate.mutate(updatedValues);
  // };

  //hàm lấy thông tin từ form Edit
  const onFinishEdit = async (values: DataType) => {
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
    return axiosClient.post(config.urlAPI + "/products", formData);
  };

  const mutationCreate = useMutation({
    mutationFn: fetchCreate,
    onSuccess: () => {
      console.log("Create success !");
      messageApi.open({
        type: "success",
        content: "Create success !",
      });
      // Làm tươi lại danh sách danh mục dựa trên key đã định nghĩa
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
      //
      createForm.resetFields();
    },
    onError: () => {
      //khi gọi API bị lỗi
      messageApi.open({
        type: "error",
        content: "Create error !",
      });
    },
  });
  // const [createForm] = Form.useForm();
  //Khi nhấn nut OK trên Modal
  const handleCreateOk = () => {
    // setIsModalCreateOpen(false);
    console.log("Create submit");
    //Cho submit form trong Modal
    createForm.submit();
    setIsModalCreateOpen(false);
  };
  //Khi nhấn nut Cancel trên modal
  const handleCreateCancel = () => {
    setIsModalCreateOpen(false);
    console.log("Create cancel");
  };

  let filePathFormat: (string | undefined)[] = [];
  if (fileList.length > 0) {
    filePathFormat = fileList.map((item) => {
      if (item.response) {
        // Check if response exists
        return `http://localhost:8080/images/${item.response?.filename}`;
      }
    });
  }

  // const onFinishCreate: FormProps<DataType>["onFinish"] = async (values) => {
  //    // 1. Extract URLs from filePathFormat
  //    const imageUpload = filePathFormat.filter(Boolean) as string[]; // Remove any undefined values
  //    const imageUploadUrls = imageUpload.map((url) => ({ url }));
  //    values.images = [ ...imageUploadUrls];
  //    // console.log(values);
  //    mutationCreate.mutate(values);
  // };
  const onFinishCreate: FormProps<DataType>["onFinish"] = async (values) => {
    const imageUpload = filePathFormat.filter(Boolean) as string[];
    const imageUploadUrls = imageUpload.map((url) => ({ url }));
    values.images = [...imageUploadUrls];
    mutationCreate.mutate(values);
  };

  const onFinishCreateFailed: FormProps<DataType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  const columns: ColumnsType<DataType> = [
    {
      title: "Name",
      dataIndex: "product_name",
      key: "product_name",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Discount",
      dataIndex: "discount",
      key: "discount",
    },
    {
      title: "Category",
      dataIndex: "categoryId",
      key: "categoryId",
      render: (_text, record) => {
        return record.categoryId.category_name;
      },
    },
    {
      title: "Brand",
      dataIndex: "brandId",
      key: "brandId",
      render: (_text, record) => {
        return record.brandId.brand_name;
      },
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },

    {
      title: "Stock",
      dataIndex: "stock",
      key: "stock",
    },
    {
      title: "Images",
      dataIndex: "images",
      key: "images",
      render: (_, record) => (
        <Image.PreviewGroup
          preview={{
            onChange: (current, prev) =>
              console.log(`current index: ${current}, prev index: ${prev}`),
          }}
        >
          {record.images.map((item, index) => (
            <Image key={index} src={item.url} width={50}></Image>
          ))}
        </Image.PreviewGroup>
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
              updateForm.setFieldsValue({
                ...record,
                // categoryId: record.categoryId.id,
                // brandId: record.brandId.id,
                // images: record.images.map((item) => ({ url: item.url })),
              });
            }}
          />

          <Popconfirm
            title="Are you sure to delete?"
            onConfirm={() => {
              // DELETE
              console.log("DELETE", record);
              mutationDelete.mutate(record.id);
            }}
            icon={<QuestionCircleOutlined style={{ color: "red" }} />}
            onCancel={() => { }}
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
        title="PRODUCTS LIST"
        extra={
          <Button
            type="primary"
            onClick={() => {
              console.log('Thêm mới');
              setIsModalCreateOpen(true);

            }}
          >
            Add Product
          </Button>
        }
      >
        {contextHolder}

        <Table
          pagination={false}
          columns={columns}
          rowKey={"id"}
          dataSource={queryProduct.data?.data.data.products}
        />
        <div>
          <Pagination
            defaultCurrent={int_page}
            total={queryProduct.data?.data.data.totalRecords}
            showSizeChanger
            defaultPageSize={int_limit}
            onChange={onChangePagination}
            showTotal={(total) => `Total ${total} items`}
          />
        </div>
        {/* begin Edit Modal */}
        <Modal
          title="Edit Product"
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
              label="Name"
              name="product_name"
              rules={[{ min: 4, message: "Tối thiểu 4 kí tự" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item<DataType> label="Price" name="price">
              <Input />
            </Form.Item>

            <Form.Item<DataType> label="Discount" name="discount">
              <Input />
            </Form.Item>

            {/* <Form.Item label="Category" name="categoryId">
            <Select> 
              {queryCategories.data?.data.data.categories.map(
                (category: categoryType) => (
                  <Select.Option key={category.id} value={category.id}>
                    <label>{category.category_name}</label>
                  </Select.Option>
                )
              )}
            </Select>
          </Form.Item> */}
            <Form.Item<DataType>
              label="Category"
              name="categoryId"
              rules={[{ required: true, message: 'Please input book Category!' }]}
              hasFeedback
            >
              <Select
                options={
                  queryCategories &&
                  queryCategories.data &&
                  queryCategories.data.data &&
                  queryCategories.data.data.data &&
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  queryCategories.data.data.data.categories.map((item: any) => ({
                    label: item.category_name,
                    value: item.id,
                  }))
                }
              />
            </Form.Item>

            <Form.Item label="Brand" name="brandId">
              <Select>
                {queryBrands.data?.data.data.brands.map((brand: brandType) => (
                  <Select.Option key={brand.id} value={brand.id}>
                    {brand.brand_name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item<DataType>
              label="Description"
              name="description"
              rules={[{ max: 500, message: "Tối đa 500 kí tự" }]}
            >
              <TextArea rows={4} />
            </Form.Item>

            <Form.Item<DataType>
              hasFeedback
              label="Stock"
              name="stock"
              rules={[
                { required: false, message: "Please Stock" },
                {
                  type: "number",
                  min: 0,
                  message: "Tối thiểu phải là 0",
                },
              ]}
            >
              <InputNumber min={0} defaultValue={0} />
            </Form.Item>

            <Form.Item label="Images" name="images">
              <Image.PreviewGroup>
                {updateForm
                  .getFieldValue("images")
                  ?.map((item: { url: string }, index: number) => (
                    <div
                      key={index}
                      style={{ display: "inline-block", marginRight: "10px" }}
                    >
                      <Image src={item.url} width={50} />
                    </div>
                  ))}
              </Image.PreviewGroup>
            </Form.Item>

            <Form.Item hidden label="Id" name="id">
              <Input />
            </Form.Item>
          </Form>
        </Modal>
        {/* End Edit Modal */}

        {/* begin Create Modal */}
        <Modal
          title="Create Product"
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
              label="Name"
              name="product_name"
              rules={[
                { required: true, message: "Please input your Product Name!" },
                { min: 4, message: "Tối thiểu 4 kí tự" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item<DataType>
              label="Price"
              name="price"
              rules={[{ required: true, message: "Please input Product Price!" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item<DataType> label="Discount" name="discount">
              <Input />
            </Form.Item>

            <Form.Item<DataType>
              label="Category"
              name="categoryId"
              rules={[
                { required: true, message: "Please input product Category!" },
              ]}
            >
              <Select
                style={{ width: 150 }}
                onChange={() => { }}
                options={
                  queryCategories.data &&
                  queryCategories.data.data.data.categories.map(
                    (c: { id: string; category_name: string }) => {
                      return {
                        value: c.id,
                        label: c.category_name,
                      };
                    }
                  )
                }
              />
            </Form.Item>

            <Form.Item<DataType>
              label="Brand"
              name="brandId"
              rules={[{ required: true, message: "Please input product Brand!" }]}
            >
              <Select
                style={{ width: 150 }}
                onChange={() => { }}
                options={
                  queryBrands.data &&
                  queryBrands.data.data.data.brands.map(
                    (c: { id: string; brand_name: string }) => {
                      return {
                        value: c.id,
                        label: c.brand_name,
                      };
                    }
                  )
                }
              />
            </Form.Item>

            <Form.Item<DataType>
              label="Description"
              name="description"
              rules={[{ max: 500, message: "Tối đa 500 kí tự" }]}
            >
              <Input.TextArea rows={4} />
            </Form.Item>

            <Form.Item<DataType>
              hasFeedback
              label="Stock"
              name="stock"
              rules={[
                { required: false, message: "Please Stock" },
                {
                  type: "number",
                  min: 0,
                  message: "Tối thiểu phải là 0",
                },
              ]}
            >
              <InputNumber min={0} defaultValue={0} />
            </Form.Item>

            <Form.Item
              label="Images"
              name="images"
              rules={[{ required: false, message: "Chọn ảnh" }]}
            >
              <UploadImages
                fileList={fileList}
                setFileList={setFileList}
              ></UploadImages>
            </Form.Item>
          </Form>
        </Modal>
        {/* End Create Modal */}
      </Card>
    </>
  );
};

export default Product;
