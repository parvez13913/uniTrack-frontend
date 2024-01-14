"use client";

import { useState } from "react";
import { Layout, Menu } from "antd";
import { getUserInfo } from "@/services/auth.service";
import { Sidebaritems } from "@/constants/sidebaritems";

const { Sider } = Layout;

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { role } = getUserInfo() as any;

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
      width={280}
      style={{
        overflow: "aut",
        height: "100vh",
        position: "static",
        left: 0,
        top: 0,
        bottom: 0,
      }}
    >
      <div
        style={{
          color: "white",
          fontSize: "2rem",
          textAlign: "center",
          fontWeight: "bold",
          marginBottom: ".5rem",
          padding: "10px 0px",
        }}
      >
        UniTrack
      </div>
      <Menu
        theme="dark"
        defaultSelectedKeys={["1"]}
        mode="inline"
        items={Sidebaritems(role)}
      />
    </Sider>
  );
};

export default Sidebar;
