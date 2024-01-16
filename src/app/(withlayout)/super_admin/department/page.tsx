import { Button } from "antd";
import Link from "next/link";

const ManageDepartmentPage = () => {
  return (
    <div>
      <h1>Management Department List</h1>
      <Link href="/super_admin/manage-student/create">
        <Button type="primary">Create Department</Button>
      </Link>
    </div>
  );
};

export default ManageDepartmentPage;
