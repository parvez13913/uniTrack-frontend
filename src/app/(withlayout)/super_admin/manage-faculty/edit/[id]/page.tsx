"use client";

import Loading from "@/app/loading";
import AcademicDepartmentFields from "@/components/Forms/AcademicDepartmentFields";
import AcademicFacultiesFields from "@/components/Forms/AcademicFacultiesFields";
import Form from "@/components/Forms/Form";
import FormDatePicker from "@/components/Forms/FormDatePicker";
import FormInput from "@/components/Forms/FormInput";
import FormSelectField from "@/components/Forms/FormSelectField";
import FormTextArea from "@/components/Forms/FormTextArea";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import { bloodGroupOptions, genderOptions } from "@/constants/global";
import {
  useFacultyQuery,
  useUpdateFacultyMutation,
} from "@/redux/api/facultyApi";
import { Button, Col, Row, message } from "antd";

const FacultyEditPage = ({ params }: any) => {
  const id = params?.id;

  const { data, isLoading } = useFacultyQuery(id);

  const [updateFaculty] = useUpdateFacultyMutation();

  if (isLoading) {
    return <Loading />;
  }

  const onSubmit = async (values: any) => {
    message.loading("Faculty Updating...");
    try {
      const response = await updateFaculty({
        id: params?.id,
        body: values,
      }).unwrap();
      if (response?.id) {
        message.success("Faculty update successfully");
      }
    } catch (error: any) {
      message.error(error.message);
    }
  };

  const defaultValues = {
    name: {
      firstName: data?.firstName || "",
      lastName: data?.lastName || "",
      middleName: data?.middleName || "",
    },
    dateOfBirth: data?.dateOfBirth || "",
    email: data?.email || "",
    designation: data?.designation || "",
    contactNo: data?.contactNo || "",
    emergencyContactNo: data?.emergencyContactNo || "",
    permanentAddress: data?.permanentAddress || "",
    presentAddress: data?.presentAddress || "",
    bloodGroup: data?.bloodGroup || "",
    gender: data?.gender || "",
  };

  return (
    <div>
      <UMBreadCrumb
        items={[
          {
            label: "super_admin",
            link: "/super_admin",
          },
          {
            label: "manage-faculty",
            link: "/super_admin/manage-faculty",
          },
        ]}
      />
      <h1>Create Faculty</h1>

      <div>
        <Form submitHandler={onSubmit} defaultValues={defaultValues}>
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
                  name="name.firstName"
                  label="First name"
                  size="large"
                />
              </Col>

              <Col span={6} style={{ margin: "10px 0" }}>
                <FormInput
                  name="name.middleName"
                  label="Middle name"
                  size="large"
                />
              </Col>

              <Col span={6} style={{ margin: "10px 0" }}>
                <FormInput
                  name="name.lastName"
                  label="Last name"
                  size="large"
                />
              </Col>

              <Col span={8} style={{ margin: "10px 0" }}>
                <FormSelectField
                  name="gender"
                  label="Gender"
                  size="large"
                  options={genderOptions}
                />
              </Col>

              <Col span={8} style={{ margin: "10px 0" }}>
                <AcademicFacultiesFields
                  name="academicFaculty"
                  label="Academic Faculty"
                />
              </Col>
              <Col span={8} style={{ margin: "10px 0" }}>
                <AcademicDepartmentFields
                  name="academicDepartment"
                  label="Academic Department"
                />
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
                  name="email"
                  label="Email address"
                  size="large"
                />
              </Col>

              <Col span={8} style={{ margin: "10px 0" }}>
                <FormInput name="contactNo" label="Contact no." size="large" />
              </Col>

              <Col span={8} style={{ margin: "10px 0" }}>
                <FormInput
                  name="emergencyContactNo"
                  label="Emergency contact no."
                  size="large"
                />
              </Col>

              <Col span={8} style={{ margin: "10px 0" }}>
                <FormDatePicker
                  name="dateOfBirth"
                  label="Date of birth"
                  size="large"
                />
              </Col>

              <Col span={8} style={{ margin: "10px 0" }}>
                <FormSelectField
                  name="bloodGroup"
                  label="Blood group"
                  size="large"
                  options={bloodGroupOptions}
                />
              </Col>

              <Col span={8} style={{ margin: "10px 0" }}>
                <FormInput
                  name="designation"
                  label="Designation"
                  size="large"
                />
              </Col>

              <Col span={12} style={{ margin: "10px 0" }}>
                <FormTextArea
                  name="presentAddress"
                  label="Present address"
                  rows={4}
                />
              </Col>

              <Col span={12} style={{ margin: "10px 0" }}>
                <FormTextArea
                  name="permanentAddress"
                  label="Permanent address"
                  rows={4}
                />
              </Col>
            </Row>
          </div>
          <Button type="primary" htmlType="submit">
            Update
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default FacultyEditPage;
