"use client";

import Loading from "@/app/loading";
import {
  useDeleteFacultyMutation,
  useFacultiesQuery,
} from "@/redux/api/facultyApi";
import { useDebounced } from "@/redux/hooks";
import { IDepartments } from "@/types";
import { useState } from "react";
import Link from "next/link";
import dayjs from "dayjs";
import { Button, Input, message } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  ReloadOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import ActionBar from "@/components/ui/ActionBar";
import UMTable from "@/components/ui/UMTable";
import UMModal from "@/components/ui/UMModal";

const ManageFaculty = () => {
  const query: Record<string, any> = {};
  const [deleteFaculty] = useDeleteFacultyMutation();
  const [size, setSize] = useState<number>(10);
  const [page, setPage] = useState<number>(1);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [facultyId, setFacultyId] = useState<string>("");

  query["size"] = size;
  query["page"] = page;
  query["sortBy"] = sortBy;
  query["sortOrder"] = sortOrder;

  const debouncedTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 600,
  });

  if (!!debouncedTerm) {
    query["searchTerm"] = searchTerm;
  }

  const { data, isLoading } = useFacultiesQuery({ ...query });

  if (isLoading) {
    return <Loading />;
  }

  const faculties = data?.faculties;
  const meta = data?.meta;

  const columns = [
    {
      title: "Id",
      dataIndex: "facultyId",
      sorter: true,
    },
    {
      title: "Name",
      render: function (data: Record<string, string>) {
        const fullName = `${data?.firstName} ${data?.middleName} ${data?.lastName}`;
        return <>{fullName}</>;
      },
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Department",
      dataIndex: "academicDepartment",
      render: function (data: IDepartments) {
        return <>{data?.title}</>;
      },
    },
    {
      title: "Designation",
      dataIndex: "designation",
    },
    {
      title: "Created at",
      dataIndex: "createdAt",
      render: function (data: any) {
        return data && dayjs(data).format("MMM D, YYYY hh:mm A");
      },
      sorter: true,
    },
    {
      title: "Contact no.",
      dataIndex: "contactNo",
    },
    {
      title: "Action",
      dataIndex: "facultyId",
      render: function (data: any) {
        return (
          <>
            <Link href={`/super_admin/manage-faculty/details/${data}`}>
              <Button type="primary">
                <EyeOutlined />
              </Button>
            </Link>
            <Link href={`/super_admin/manage-faculty/edit/${data}`}>
              <Button
                style={{
                  margin: "0px 5px",
                }}
                type="primary"
              >
                <EditOutlined />
              </Button>
            </Link>
            <Button
              type="primary"
              onClick={() => {
                setOpen(true);
                setFacultyId(data);
              }}
              danger
              style={{ marginLeft: "3px" }}
            >
              <DeleteOutlined />
            </Button>
          </>
        );
      },
    },
  ];

  const onPaginationChange = (page: number, pageSize: number) => {
    setPage(page);
    setSize(pageSize);
  };
  const onTableChange = (pagination: any, filter: any, sorter: any) => {
    const { order, field } = sorter;
    setSortBy(field as string);
    setSortOrder(order === "ascend" ? "asc" : "desc");
  };

  const resetFiltersButton = () => {
    setSortBy("");
    setSortOrder("");
    setSearchTerm("");
  };

  const deleteFacultyHandler = async (id: string) => {
    try {
      const res = await deleteFaculty(id).unwrap();
      if (res?.id) {
        message.success("Faculty Successfully Deleted!");
        setOpen(false);
      }
    } catch (error: any) {
      message.error(error.message);
    }
  };

  return (
    <div>
      <UMBreadCrumb
        items={[
          {
            label: "super_admin",
            link: "/super_admin",
          },
        ]}
      />

      <ActionBar title="Faculty List">
        <Input
          type="text"
          size="large"
          placeholder="Search.."
          style={{
            width: "20%",
          }}
          onChange={(event) => {
            setSearchTerm(event.target.value);
          }}
        />
        <div>
          <Link href="/super_admin/manage-faculty/create">
            <Button type="primary">Create Faculty</Button>
          </Link>
          {(!!sortBy || !!sortOrder || !!searchTerm) && (
            <Button
              style={{ margin: "0px 5px" }}
              type="primary"
              onClick={resetFiltersButton}
            >
              <ReloadOutlined />
            </Button>
          )}
        </div>
      </ActionBar>
      <UMTable
        loading={isLoading}
        columns={columns}
        dataSource={faculties}
        pageSize={size}
        totalPages={meta?.total}
        showSizeChanger={true}
        onPaginationChange={onPaginationChange}
        onTableChange={onTableChange}
        showPagination={true}
      />

      <UMModal
        title="Remove Faculty"
        isOpen={open}
        closeModal={() => setOpen(false)}
        handleOk={() => deleteFacultyHandler(facultyId)}
      >
        <p className="my-5" style={{ color: "red" }}>
          Do you want to remove this faculty?
        </p>
      </UMModal>
    </div>
  );
};

export default ManageFaculty;
