import { Button } from "antd";
import Link from "next/link";

const ManageAdminPage = () => {
  return (
    <div>
      <h1>Admin List</h1>
      <Link href="/super_admin/manage-student/create">
        <Button type="primary">Create</Button>
      </Link>
    </div>
  );
};

export default ManageAdminPage;
