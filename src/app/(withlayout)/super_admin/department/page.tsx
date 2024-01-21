"use client";
import UMTable from "@/components/ui/UMTable";
import { useDepartmentsQuery } from "@/redux/api/departmentApi";
import { Button } from "antd";
import Link from "next/link";

const ManageDepartmentPage = () => {
  const { data, isLoading } = useDepartmentsQuery(undefined);

  console.log(data);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
      sorter: (a: any, b: any) => a.age - b.age,
    },
    {
      title: "Action",
      render: function (data: any) {
        return (
          <Button type="primary" danger onClick={() => console.log(data)}>
            X
          </Button>
        );
      },
    },
  ];

  const tableData = [
    {
      key: "1",
      name: "John Brown",
      age: 32,
    },
    {
      key: "2",
      name: "Jim Green",
      age: 42,
    },
  ];

  const onPaginationChange = (page: number, pageSize: number) => {
    console.log("page", page);
    console.log("pageSize", pageSize);
  };

  const onTableChange = (pagination: any, filter: any, sorter: any) => {
    const { order, field } = sorter;
    console.log("order:", order, "field:", field);
  };

  return (
    <div>
      <h1>Management Department List</h1>
      <Link href="/super_admin/department/create">
        <Button type="primary">Create Department</Button>
      </Link>
      <UMTable
        loading={false}
        columns={columns}
        dataSource={tableData}
        pageSize={5}
        totalPages={100}
        showSizeChanger={true}
        onPaginationChange={onPaginationChange}
        onTableChange={onTableChange}
        showPagination={true}
      />
    </div>
  );
};

export default ManageDepartmentPage;
