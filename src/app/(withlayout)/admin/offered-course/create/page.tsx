"use client";

import AcademicDepartmentFields from "@/components/Forms/AcademicDepartmentFields";
import Form from "@/components/Forms/Form";
import OfferedCoursesFields from "@/components/Forms/OfferedCoursesFields";
import SemesterRegistrationFields from "@/components/Forms/SemesterRegistrationFields";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import { useAddOfferedCourseMutation } from "@/redux/api/offeredCourseApi";
import { Button, Col, Row, message } from "antd";

const CreateOfferedCoursePage = () => {
  const [addOfferedCourse] = useAddOfferedCourseMutation();
  const onSubmit = async (data: any) => {
    message.loading("Offered Course Creating...");
    try {
      const response = await addOfferedCourse(data);
      if (!!response) {
        message.success("Offered Course added successfully");
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
          { label: "offered-course", link: `/${base}/offered-course` },
        ]}
      />
      <h1>Create Offered Course Section</h1>
      <Form submitHandler={onSubmit}>
        <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
          <Col span={8} style={{ margin: "10px 0" }}>
            <div style={{ margin: "10px 0px" }}>
              <SemesterRegistrationFields
                name="semesterRegistrationId"
                label="Semester registration"
              />
            </div>

            <div style={{ margin: "10px 0px" }}>
              <OfferedCoursesFields name="courseIds" label="Courses" />
            </div>

            <div style={{ margin: "10px 0px" }}>
              <AcademicDepartmentFields
                name="academicDepartmentId"
                label="Academic department"
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

export default CreateOfferedCoursePage;
