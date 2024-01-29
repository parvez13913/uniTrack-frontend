"use client";

import BuildingFields from "@/components/Forms/BuildingFields";
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import FormSelectField, {
  SelectOptions,
} from "@/components/Forms/FormSelectField";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import { useAddRoomMutation } from "@/redux/api/roomApi";
import { Button, Col, Row, message } from "antd";

const CreateRoomPage = () => {
  const [addRoom] = useAddRoomMutation();
  const onSubmit = async (data: any) => {
    message.loading("Room Creating...");
    try {
      const response = await addRoom(data);
      if (!!response) {
        message.success("Room added successfully");
      }
    } catch (error: any) {
      message.error(error.message);
    }
  };
  const base = "admin";
  return (
    <div>
      <UMBreadCrumb
        items={[
          { label: `${base}`, link: `/${base}` },
          { label: "room", link: `/${base}/room` },
        ]}
      />
      <h1>Create Room</h1>
      <Form submitHandler={onSubmit}>
        <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
          <Col span={8} style={{ margin: "10px 0" }}>
            <div style={{ margin: "10px 0px" }}>
              <FormInput name="roomNumber" label="Room No." />
            </div>
            <div style={{ margin: "10px 0px" }}>
              <FormInput name="floor" label="Floor" />
            </div>
            <div style={{ margin: "10px 0px" }}>
              <BuildingFields name="buildingId" label="Building" />
            </div>
          </Col>
        </Row>
        <Button type="primary" htmlType="submit">
          Add
        </Button>
      </Form>
    </div>
  );
};

export default CreateRoomPage;
