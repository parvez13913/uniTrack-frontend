"use client";

import Loading from "@/app/loading";
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import FormSelectField, {
  SelectOptions,
} from "@/components/Forms/FormSelectField";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import { useBuildingsQuery } from "@/redux/api/buildingApi";
import { useAddRoomMutation } from "@/redux/api/roomApi";
import { Button, Col, Row, message } from "antd";

const CreateRoomPage = () => {
  const [addRoom] = useAddRoomMutation();

  const { data, isLoading } = useBuildingsQuery({
    limit: 100,
    page: 1,
  });

  if (isLoading) {
    <Loading />;
  }

  const buildings = data?.buildings;
  const buildingOptions = buildings?.map((building) => {
    return {
      label: building?.title,
      value: building?.id,
    };
  });

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
              <FormInput name="roomNumber" label="Room No." size="large" />
            </div>
            <div style={{ margin: "10px 0px" }}>
              <FormInput name="floor" label="Floor" size="large" />
            </div>
            <div style={{ margin: "10px 0px" }}>
              <FormSelectField
                size="large"
                name="buildingId"
                options={buildingOptions as SelectOptions[]}
                label="Building"
                placeholder="Select"
              />
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
