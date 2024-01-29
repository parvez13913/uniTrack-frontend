"use client";

import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import { useAddBuildingMutation } from "@/redux/api/buildingApi";
import { Button, Col, Row, message } from "antd";

const CreateBuildingPage = () => {
  const [addBuilding] = useAddBuildingMutation();
  const onSubmit = async (data: any) => {
    message.loading("Building Creating...");
    try {
      const response = await addBuilding(data);
      if (!!response) {
        message.success("Building added successfully");
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
          { label: "building", link: `/${base}/building` },
        ]}
      />
      <h1>Create Building</h1>
      <Form submitHandler={onSubmit}>
        <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
          <Col span={8} style={{ margin: "10px 0" }}>
            <FormInput name="title" label="Title" />
          </Col>
        </Row>
        <Button type="primary" htmlType="submit">
          Add
        </Button>
      </Form>
    </div>
  );
};

export default CreateBuildingPage;
