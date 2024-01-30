"use client";

import AcademicSemestersFields from "@/components/Forms/AcademicSemestersFields";
import Form from "@/components/Forms/Form";
import FormDatePicker from "@/components/Forms/FormDatePicker";
import FormInput from "@/components/Forms/FormInput";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import { useAddSemesterRegistrationMutation } from "@/redux/api/semesterRegistrationApi";
import { Button, Col, Row, message } from "antd";

const CreateSemesterRegistrationPage = () => {
  const [addSemesterRegistration] = useAddSemesterRegistrationMutation();
  const onSubmit = async (data: any) => {
    data.minCredit = parseInt(data?.minCredit);
    data.maxCredit = parseInt(data?.maxCredit);

    message.loading("Semester Registration Creating...");
    try {
      const response = await addSemesterRegistration(data);
      if (!!response) {
        message.success("Semester Registration added successfully");
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
          {
            label: "semester-registration",
            link: `/${base}/semester-registration`,
          },
        ]}
      />
      <h1>Create Semester Registration</h1>
      <Form submitHandler={onSubmit}>
        <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
          <Col span={8} style={{ margin: "10px 0" }}>
            <div style={{ margin: "10px 0px" }}>
              <FormDatePicker
                name="startDate"
                label="Start Date"
                size="large"
              />
            </div>
            <div style={{ margin: "10px 0px" }}>
              <FormDatePicker name="endDate" label="End Date" size="large" />
            </div>
            <div style={{ margin: "10px 0px" }}>
              <AcademicSemestersFields
                name="academicSemesterId"
                label="Academic Semester"
              />
            </div>
            <div style={{ margin: "10px 0px" }}>
              <FormInput
                name="minCredit"
                label="Min Credit"
                type="number"
                size="large"
              />
            </div>
            <div style={{ margin: "10px 0px" }}>
              <FormInput
                name="maxCredit"
                label="Max Credit"
                type="number"
                size="large"
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

export default CreateSemesterRegistrationPage;
