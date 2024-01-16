"use client";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import { getUserInfo } from "@/service/auth.service";
import { Button } from "antd";
import Link from "next/link";

const ManageStudentPage = () => {
  const { role } = getUserInfo() as any;
  return (
    <div>
      <UMBreadCrumb
        items={[
          {
            label: `${role}`,
            link: `/${role}`,
          },
        ]}
      />
      <h1>Student List</h1>
      <Link href="/super_admin/manage-student/create">
        <Button type="primary">Create</Button>
      </Link>
    </div>
  );
};

export default ManageStudentPage;
