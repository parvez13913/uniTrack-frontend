"use client";

import AcademicDepartmentFields from "@/components/Forms/AcademicDepartmentFields";
import AcademicFacultiesFields from "@/components/Forms/AcademicFacultiesFields";
import Form from "@/components/Forms/Form";
import FormDatePicker from "@/components/Forms/FormDatePicker";
import FormInput from "@/components/Forms/FormInput";
import FormSelectField from "@/components/Forms/FormSelectField";
import FormTextArea from "@/components/Forms/FormTextArea";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import UploadImage from "@/components/ui/UploadImage";
import { bloodGroupOptions, genderOptions } from "@/constants/global";
import { useAddFacultyMutation } from "@/redux/api/facultyApi";
import { facultySchema } from "@/schemas/faculty";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Col, Row, message } from "antd";

const CreateFacultyPage = () => {
  const [addFaculty] = useAddFacultyMutation();
  const onSubmit = async (values: any) => {
    const obj = { ...values };
    const file = obj["file"];
    delete obj["file"];
    const data = JSON.stringify(obj);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("data", data);

    message.loading("Faculty Creating...");
    try {
      const response = await addFaculty(formData);
      if (!!response) {
        message.success("Faculty added successfully");
      }
    } catch (error: any) {
      message.error(error.message);
    }
  };
  return (
    <div>
      <UMBreadCrumb
        items={[
          {
            label: "admin",
            link: "/admin",
          },
          {
            label: "manage-faculty",
            link: "/admin/manage-faculty",
          },
        ]}
      />
      <h1>Create Faculty</h1>

      <div>
        <Form submitHandler={onSubmit} resolver={yupResolver(facultySchema)}>
          {/* faculty information */}
          <div
            style={{
              border: "1px solid #d9d9d9",
              borderRadius: "5px",
              padding: "15px",
              marginBottom: "10px",
            }}
          >
            <p
              style={{ fontSize: "18px", fontWeight: "500", margin: "5px 0px" }}
            >
              Faculty information
            </p>
            <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
              <Col span={6} style={{ margin: "10px 0" }}>
                <FormInput
                  name="faculty.name.firstName"
                  label="First name"
                  size="large"
                />
              </Col>

              <Col span={6} style={{ margin: "10px 0" }}>
                <FormInput
                  name="faculty.name.middleName"
                  label="Middle name"
                  size="large"
                />
              </Col>

              <Col span={6} style={{ margin: "10px 0" }}>
                <FormInput
                  name="faculty.name.lastName"
                  label="Last name"
                  size="large"
                />
              </Col>

              <Col span={6} style={{ margin: "10px 0" }}>
                <FormInput
                  type="password"
                  name="password"
                  label="Password"
                  size="large"
                />
              </Col>

              <Col span={8} style={{ margin: "10px 0" }}>
                <FormSelectField
                  name="faculty.gender"
                  label="Gender"
                  size="large"
                  options={genderOptions}
                />
              </Col>

              <Col span={8} style={{ margin: "10px 0" }}>
                <AcademicFacultiesFields
                  name="faculty.academicFaculty"
                  label="Academic Faculty"
                />
              </Col>
              <Col span={8} style={{ margin: "10px 0" }}>
                <AcademicDepartmentFields
                  name="faculty.academicDepartment"
                  label="Academic Department"
                />
              </Col>

              <Col span={8} style={{ margin: "10px 0" }}>
                <UploadImage name="file" />
              </Col>
            </Row>
          </div>
          {/* basic information  */}
          <div
            style={{
              border: "1px solid #d9d9d9",
              borderRadius: "5px",
              padding: "15px",
              marginBottom: "10px",
            }}
          >
            <p
              style={{ fontSize: "18px", fontWeight: "500", margin: "5px 0px" }}
            >
              Basic information
            </p>
            <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
              <Col span={8} style={{ margin: "10px 0" }}>
                <FormInput
                  type="email"
                  name="faculty.email"
                  label="Email address"
                  size="large"
                />
              </Col>

              <Col span={8} style={{ margin: "10px 0" }}>
                <FormInput
                  name="faculty.contactNo"
                  label="Contact no."
                  size="large"
                />
              </Col>

              <Col span={8} style={{ margin: "10px 0" }}>
                <FormInput
                  name="faculty.emergencyContactNo"
                  label="Emergency contact no."
                  size="large"
                />
              </Col>

              <Col span={8} style={{ margin: "10px 0" }}>
                <FormDatePicker
                  name="faculty.dateOfBirth"
                  label="Date of birth"
                  size="large"
                />
              </Col>

              <Col span={8} style={{ margin: "10px 0" }}>
                <FormSelectField
                  name="faculty.bloodGroup"
                  label="Blood group"
                  size="large"
                  options={bloodGroupOptions}
                />
              </Col>

              <Col span={8} style={{ margin: "10px 0" }}>
                <FormInput
                  name="faculty.designation"
                  label="Designation"
                  size="large"
                />
              </Col>

              <Col span={12} style={{ margin: "10px 0" }}>
                <FormTextArea
                  name="faculty.presentAddress"
                  label="Present address"
                  rows={4}
                />
              </Col>

              <Col span={12} style={{ margin: "10px 0" }}>
                <FormTextArea
                  name="faculty.permanentAddress"
                  label="Permanent address"
                  rows={4}
                />
              </Col>
            </Row>
          </div>
          <Button type="primary" htmlType="submit">
            Create
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default CreateFacultyPage;
