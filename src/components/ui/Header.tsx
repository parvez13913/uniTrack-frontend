import { authKey } from "@/constants/storageKey";
import { getUserInfo, removeUserInfo } from "@/service/auth.service";
import { Avatar, Button, Dropdown, Layout, MenuProps, Row, Space } from "antd";
import { useRouter } from "next/navigation";
import { UserOutlined } from "@ant-design/icons";

const Header = () => {
  const { Header: AntHeader } = Layout;
  const router = useRouter();

  const logOut = () => {
    removeUserInfo(authKey);
    router.push("/login");
  };

  const items: MenuProps["items"] = [
    {
      key: "0",
      label: (
        <Button onClick={logOut} type="text" danger>
          Logout
        </Button>
      ),
    },
  ];

  const { role } = getUserInfo() as any;

  return (
    <AntHeader>
      <Row
        justify="end"
        align="middle"
        style={{
          height: "100%",
        }}
      >
        <p
          style={{
            margin: "0px 5px",
            color: "#fff",
          }}
        >
          {role}
        </p>

        <Dropdown menu={{ items }}>
          <a>
            <Space wrap size={16}>
              <Avatar size="large" icon={<UserOutlined />} />
            </Space>
          </a>
        </Dropdown>
      </Row>
    </AntHeader>
  );
};

export default Header;
