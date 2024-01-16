import { Button } from "antd";
import Link from "next/link";

const ManageUserPage = () => {
  return (
    <div>
      <h1>User List</h1>
      <Link href="/super_admin/manage-student/create">
        <Button type="primary">Create User</Button>
      </Link>
    </div>
  );
};

export default ManageUserPage;
