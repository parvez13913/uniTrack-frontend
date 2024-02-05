"use client";

import Loading from "@/app/loading";
import AcademicDepartmentFields from "@/components/Forms/AcademicDepartmentFields";
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import FormSelectField, {
  SelectOptions,
} from "@/components/Forms/FormSelectField";
import SemesterRegistrationFields from "@/components/Forms/SemesterRegistrationFields";
import FormDynamicFields from "@/components/ui/FormDynamicFields";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import { useOfferedCoursesQuery } from "@/redux/api/offeredCourseApi";
import { useAddOfferedCourseSectionMutation } from "@/redux/api/offeredCourseSectionApi";
import { Button, Col, Row, message } from "antd";
import { useState } from "react";

const CreateOfferedCourseSectionPage = () => {
  const [addOfferedCourseSection] = useAddOfferedCourseSectionMutation();
  const [academicDepartmentId, setAcademicDepartmentId] = useState<string>();
  const [semesterRegistrationId, setSemesterRegistrationId] =
    useState<string>();

  const query: Record<string, any> = {};

  if (!!academicDepartmentId) {
    query["academicDepartmentId"] = academicDepartmentId;
  }

  if (!!academicDepartmentId) {
    query["semesterRegistrationId"] = semesterRegistrationId;
  }

  const { data, isLoading } = useOfferedCoursesQuery({
    limit: 10,
    page: 1,
    ...query,
  });

  const offeredCourses = data?.offeredCourses;
  const offeredCoursesOptions = offeredCourses?.map((offCourse) => {
    return {
      label: offCourse?.course?.title,
      value: offCourse?.id,
    };
  });

  const onSubmit = async (data: any) => {
    data.maxCapacity = parseInt(data?.maxCapacity);
    console.log(data);

    message.loading("Offered Course Section  Creating...");
    try {
      const response = await addOfferedCourseSection(data);
      if (!!response) {
        message.success("Offered Course section added successfully");
      }
      if (!response) {
        message.error("Failed to add offered course section!");
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
            label: "offered-course-section",
            link: `/${base}/offered-course-section`,
          },
        ]}
      />
      <h1>Create Offered Course Section</h1>
      <Form submitHandler={onSubmit}>
        <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
          <Col span={8} style={{ margin: "10px 0" }}>
            <div style={{ margin: "10px 0px" }}>
              <SemesterRegistrationFields
                name="semesterRegistration"
                label="Semester Registration"
                onChange={(el) => setSemesterRegistrationId(el)}
              />
            </div>
            <div style={{ margin: "10px 0px" }}>
              <AcademicDepartmentFields
                name="academicDepartment"
                label="Academic Department"
                onChange={(el) => setAcademicDepartmentId(el)}
              />
            </div>
            <div style={{ margin: "10px 0px" }}>
              <FormSelectField
                name="offeredCourseId"
                label="Offered Course"
                options={offeredCoursesOptions as SelectOptions[]}
                size="large"
                placeholder="Select"
              />
            </div>
            <div style={{ margin: "10px 0px" }}>
              <FormInput
                name="title"
                label="Section"
                size="large"
                placeholder="Section"
              />
            </div>
            <div style={{ margin: "10px 0px" }}>
              <FormInput
                name="maxCapacity"
                label="Max Capacity"
                size="large"
                placeholder="Max Capacity"
              />
            </div>
            <Button type="primary" htmlType="submit">
              Add
            </Button>
          </Col>
          <Col span={16} style={{ margin: "10px 0" }}>
            <FormDynamicFields />
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default CreateOfferedCourseSectionPage;
