import { Row } from "antd";
import notFoundImage from "@/assets/notFound.svg";

const NotFoundPage = () => {
  return (
    <Row
      justify="center"
      align="middle"
      style={{
        backgroundImage: `url(${notFoundImage.src})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        width: "100vw",
        height: "100vh",
      }}
    >
      <h1>404!!! Page Not Found!</h1>
    </Row>
  );
};

export default NotFoundPage;
