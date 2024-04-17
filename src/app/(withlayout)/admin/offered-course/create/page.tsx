"use client";

import Loading from "@/app/loading";
import AcademicDepartmentFields from "@/components/Forms/AcademicDepartmentFields";
import Form from "@/components/Forms/Form";
import FormSelectField, {
  SelectOptions,
} from "@/components/Forms/FormSelectField";
import OfferedCoursesFields from "@/components/Forms/OfferedCoursesFields";
import SemesterRegistrationFields from "@/components/Forms/SemesterRegistrationFields";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import { useAddOfferedCourseMutation } from "@/redux/api/offeredCourseApi";
import { useSemesterRegistrationsQuery } from "@/redux/api/semesterRegistrationApi";
import { Button, Col, Row, message } from "antd";

const CreateOfferedCoursePage = () => {
  const [addOfferedCourse] = useAddOfferedCourseMutation();
  const { data, isLoading } = useSemesterRegistrationsQuery({
    limit: 10,
    page: 1,
  });

  if (isLoading) {
    <Loading />;
  }

  const semesterRegistrations = data?.semesterRegistrations;
  const semesterRegistrationsOptions = semesterRegistrations?.map(
    (semester) => {
      return {
        label:
          semester?.academicSemester?.title +
          "-" +
          semester?.academicSemester?.year,
        value: semester?.id,
      };
    }
  );
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
      <h1>Create Offered Course</h1>
      <Form submitHandler={onSubmit}>
        <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
          <Col span={8} style={{ margin: "10px 0" }}>
            <div style={{ margin: "10px 0px" }}>
              <FormSelectField
                options={semesterRegistrationsOptions as SelectOptions[]}
                name="semesterRegistrationId"
                label="Semester registration"
                size="large"
                placeholder="Select"
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
