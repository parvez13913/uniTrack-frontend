"use client";
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import ActionBar from "@/components/ui/ActionBar";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import { Button, Col, Row, message } from "antd";

type IdProps = {
  params: string;
};

const EditDepartmentPage = ({ params }: IdProps) => {
  const { id } = params;
  const base = "/super_admin";

  const onSubmit = async (data: any) => {
    message.loading("Department Updating...");
    try {
      message.success("Department updated successfully");
    } catch (error: any) {
      await message.error(error.message);
    }
  };

  return (
    <div>
      <UMBreadCrumb
        items={[
          { label: `${base}`, link: `/${base}` },
          { label: "department", link: `/${base}/department` },
        ]}
      />
      <ActionBar title="Update management department" />

      <Form submitHandler={onSubmit}>
        <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
          <Col span={8} style={{ margin: "10px 0" }}>
            <FormInput name="title" label="Title" />
          </Col>
        </Row>
        <Button type="primary" htmlType="submit">
          update
        </Button>
      </Form>
    </div>
  );
};

export default EditDepartmentPage;
