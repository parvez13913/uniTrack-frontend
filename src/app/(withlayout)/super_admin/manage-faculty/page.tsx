"use client";

import { Button } from "antd";
import Link from "next/link";

const ManageFacultyPage = () => {
  return (
    <div>
      <h1>Faculty List</h1>
      <Link href="/super_admin/manage-faculty/create">
        <Button type="primary">Create Faculty</Button>
      </Link>
    </div>
  );
};

export default ManageFacultyPage;
