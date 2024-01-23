"use client";

import Form from "@/components/Forms/Form";
import FormSelectField from "@/components/Forms/FormSelectField";
import FormYearPicker from "@/components/Forms/FormYearPicker";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import { monthOptions } from "@/constants/global";
import { useAddAcademicSemesterMutation } from "@/redux/api/academic/semesterApi";
import { Button, Col, Row, message } from "antd";

const CreateSemesterPage = () => {
  const [addAcademicSemester] = useAddAcademicSemesterMutation();
  const semesterOptions = [
    {
      label: "Autumn",
      value: "Autumn",
    },
    {
      label: "Summer",
      value: "Summer",
    },
    {
      label: "Fall",
      value: "Fall",
    },
  ];

  const onSubmit = async (data: any) => {
    if (data?.title === "Autumn") data["code"] = "01";
    else if (data?.title === "Summer") data["code"] = "02";
    else if (data?.title === "Fall") data["code"] = "03";
    data.year = parseInt(data.year);
    message.loading("Academic Semester Creating...");
    try {
      const response = await addAcademicSemester(data);
      if (!!response) {
        message.success("Academic Semester added successfully");
      }
    } catch (error: any) {
      await message.error(error.message);
    }
  };

  const base = "admin";

  return (
    <div>
      <UMBreadCrumb
        items={[
          { label: `${base}`, link: `/${base}` },
          { label: "academicSemester", link: `/${base}/academic/semester` },
        ]}
      />
      <h1>Create Academic Semester</h1>
      <Form submitHandler={onSubmit}>
        <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
          <Col span={8} style={{ margin: "10px 0" }}>
            <div style={{ margin: "10px 0" }}>
              <FormSelectField
                size="large"
                name="title"
                options={semesterOptions}
                label="Title"
                placeholder="Select"
              />
            </div>
            <div style={{ margin: "10px 0" }}>
              <FormSelectField
                size="large"
                name="startMonth"
                options={monthOptions}
                label="Start Month"
                placeholder="Select"
              />
            </div>
            <div style={{ margin: "10px 0" }}>
              <FormSelectField
                size="large"
                name="endMonth"
                options={monthOptions}
                label="End Month"
                placeholder="Select"
              />
            </div>
            <div style={{ margin: "10px 0" }}>
              <FormYearPicker name="year" label="Year" picker="year" />
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

export default CreateSemesterPage;
