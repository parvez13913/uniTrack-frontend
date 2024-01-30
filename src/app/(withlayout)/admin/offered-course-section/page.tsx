"use client";

import ActionBar from "@/components/ui/ActionBar";
import UMTable from "@/components/ui/UMTable";
import {
  useDeleteOfferedCourseSectionMutation,
  useOfferedCoursesSectionsQuery,
} from "@/redux/api/offeredCourseSectionApi";
import { useDebounced } from "@/redux/hooks";
import {
  DeleteOutlined,
  EditOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import { Button, Input, message } from "antd";
import dayjs from "dayjs";
import Link from "next/link";
import { useState } from "react";

const OfferedCourseSectionPage = () => {
  const query: Record<string, any> = {};

  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");

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

  const { data, isLoading } = useOfferedCoursesSectionsQuery({ ...query });
  const offeredCoursesSections = data?.offeredCoursesSections;
  const meta = data?.meta;
  const [deleteOfferedCourse] = useDeleteOfferedCourseSectionMutation();

  const deleteHandler = async (id: string) => {
    message.loading("Offered Course Section Deleting...");
    try {
      const response = await deleteOfferedCourse(id);
      if (!!response) {
        message.success("Offered Course Section deleted successfully");
      }
    } catch (error: any) {
      message.error(error.message);
    }
  };

  const columns = [
    {
      title: "Offered courses",
      dataIndex: "offeredCourse",
      sorter: true,
      render: function (data: any) {
        return <>{data?.course?.title}</>;
      },
    },
    {
      title: "Section",
      dataIndex: "title",
      sorter: true,
    },
    {
      title: "max capacity",
      dataIndex: "maxCapacity",
      sorter: true,
    },
    {
      title: "Currently enrolled Student",
      dataIndex: "currentlyEnrolledStudent",
      sorter: true,
    },
    {
      title: "CreatedAt",
      dataIndex: "createdAt",
      render: function (data: any) {
        return data && dayjs(data).format("MMM D, YYYY hh:mm A");
      },
      sorter: true,
    },
    {
      title: "Action",
      render: function (data: any) {
        return (
          <>
            <Link href={`/admin/offered-course/edit/${data?.id}`}>
              <Button
                style={{
                  margin: "0px 5px",
                }}
                onClick={() => console.log(data)}
                type="primary"
              >
                <EditOutlined />
              </Button>
            </Link>
            <Button
              onClick={() => deleteHandler(data?.id)}
              type="primary"
              danger
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

  return (
    <div>
      <ActionBar title="Offered Course Section List">
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
          <Link href="/admin/offered-course-section/create">
            <Button type="primary">Create Offered Course Section</Button>
          </Link>
          {(!!sortBy || !!sortOrder || !!searchTerm) && (
            <Button
              type="primary"
              style={{
                margin: "0 5px",
              }}
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
        dataSource={offeredCoursesSections}
        pageSize={size}
        totalPages={meta?.total}
        showSizeChanger={true}
        onPaginationChange={onPaginationChange}
        onTableChange={onTableChange}
        showPagination={true}
      />
    </div>
  );
};

export default OfferedCourseSectionPage;
