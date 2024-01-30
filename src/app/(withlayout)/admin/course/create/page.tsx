"use client";

import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import FormMultiSelectField, {
  SelectOptions,
} from "@/components/Forms/FormMultiSelectField";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import { useAddCourseMutation, useCoursesQuery } from "@/redux/api/courseApi";
import { Button, Col, Row, message } from "antd";

const CreateCoursePage = () => {
  const [addCourse] = useAddCourseMutation();
  const { data, isLoading } = useCoursesQuery({ limit: 10, page: 1 });
  const courses = data?.courses;
  const coursesOptions = courses?.map((course) => {
    return {
      label: course?.title,
      value: course?.id,
    };
  });
  const onSubmit = async (data: any) => {
    data.credits = parseInt(data?.credits);
    const coursePreRequisitesOptions = data?.prerequisiteCourses?.map(
      (id: string) => {
        return {
          courseId: id,
        };
      }
    );
    data.prerequisiteCourses = coursePreRequisitesOptions;

    message.loading("Course Creating...");
    try {
      const response = await addCourse(data);
      if (!!response) {
        message.success("Course added successfully");
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
          { label: "course", link: `/${base}/course` },
        ]}
      />
      <h1>Create Course</h1>
      <Form submitHandler={onSubmit}>
        <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
          <Col span={8} style={{ margin: "10px 0" }}>
            <div style={{ margin: "10px 0px" }}>
              <FormInput name="title" label="Title" size="large" />
            </div>
            <div style={{ margin: "10px 0px" }}>
              <FormInput name="code" label="Course Code" size="large" />
            </div>
            <div style={{ margin: "10px 0px" }}>
              <FormInput name="credits" label="Course Credits" size="large" />
            </div>
            <div style={{ margin: "10px 0px" }}>
              <FormMultiSelectField
                options={coursesOptions as SelectOptions[]}
                name="prerequisiteCourses"
                label="Pre Requisite Courses"
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

export default CreateCoursePage;
