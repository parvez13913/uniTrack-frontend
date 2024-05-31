"use client";

import Loading from "@/app/loading";
import Form from "@/components/Forms/Form";
import FormDatePicker from "@/components/Forms/FormDatePicker";
import FormInput from "@/components/Forms/FormInput";
import FormSelectField from "@/components/Forms/FormSelectField";
import FormTextArea from "@/components/Forms/FormTextArea";
import ActionBar from "@/components/ui/ActionBar";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import { bloodGroupOptions, genderOptions } from "@/constants/global";
import { useAdminQuery, useUpdateAdminMutation } from "@/redux/api/adminApi";
import { useDepartmentsQuery } from "@/redux/api/departmentApi";
import { Button, Col, Row, message } from "antd";

const AdminEditPage = ({ params }: any) => {
  const id = params?.id;
  const { data: adminData, isLoading: loading } = useAdminQuery(id);
  const [updateAdmin] = useUpdateAdminMutation();

  // Management department option
  const { data, isLoading } = useDepartmentsQuery({ limit: 100, page: 1 });

  if (isLoading || loading) {
    return <Loading />;
  }

  // @ts-ignore
  const departments: IDepartments[] = data?.departments;
  const managementDepartmentOptions =
    departments &&
    departments?.map((department) => {
      return {
        label: department?.title,
        value: department?.id,
      };
    });

  const onSubmit = async (values: any) => {
    message.loading("Admin Updating...");
    try {
      const response = await updateAdmin({
        id: params?.id,
        body: values,
      }).unwrap();
      if (response?.id) {
        message.success("Admin updated successfully");
      }
    } catch (error: any) {
      await message.error(error.message);
    }
  };

  const defaultValues = {
    name: {
      firstName: adminData?.name?.firstName || "",
      lastName: adminData?.name?.lastName || "",
      middleName: adminData?.name?.middleName || "",
    },
    dateOfBirth: adminData?.dateOfBirth || "",
    email: adminData?.email || "",
    designation: adminData?.designation || "",
    contactNo: adminData?.contactNo || "",
    emergencyContactNo: adminData?.emergencyContactNo || "",
    permanentAddress: adminData?.permanentAddress || "",
    presentAddress: adminData?.presentAddress || "",
    bloodGroup: adminData?.bloodGroup || "",
    gender: adminData?.gender || "",
    managementDepartment: adminData?.managementDepartment?.id || "",
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
            label: "admin",
            link: "/super_admin/admin",
          },
        ]}
      />
      <ActionBar title="Update Admin" />

      <Form submitHandler={onSubmit} defaultValues={defaultValues}>
        <div
          style={{
            border: "1px solid #d9d9d9",
            borderRadius: "5px",
            padding: "15px",
            marginBottom: "10px",
          }}
        >
          <p
            style={{
              fontSize: "18px",
              marginBottom: "10px",
            }}
          >
            Admin Information
          </p>
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col
              className="gutter-row"
              span={8}
              style={{
                marginBottom: "10px",
              }}
            >
              <FormInput
                type="text"
                name="name.firstName"
                size="large"
                label="First Name"
              />
            </Col>
            <Col
              className="gutter-row"
              span={8}
              style={{
                marginBottom: "10px",
              }}
            >
              <FormInput
                type="text"
                name="name.middleName"
                size="large"
                label="Middle Name"
              />
            </Col>
            <Col
              className="gutter-row"
              span={8}
              style={{
                marginBottom: "10px",
              }}
            >
              <FormInput
                type="text"
                name="name.lastName"
                size="large"
                label="Last Name"
              />
            </Col>
            <Col
              className="gutter-row"
              span={8}
              style={{
                marginBottom: "10px",
              }}
            >
              <FormSelectField
                name="gender"
                size="large"
                label="Gender"
                options={genderOptions}
                placeholder="Select"
              />
            </Col>
            <Col
              className="gutter-row"
              span={8}
              style={{
                marginBottom: "10px",
              }}
            >
              <FormSelectField
                name="managementDepartment"
                size="large"
                label="Department"
                options={managementDepartmentOptions}
                placeholder="Select"
              />
            </Col>
          </Row>
        </div>

        {/* Basic Information */}
        <div
          style={{
            border: "1px solid #d9d9d9",
            borderRadius: "5px",
            padding: "15px",
            marginBottom: "10px",
          }}
        >
          <p
            style={{
              fontSize: "18px",
              marginBottom: "10px",
            }}
          >
            Basic Information
          </p>
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col
              className="gutter-row"
              span={8}
              style={{
                marginBottom: "10px",
              }}
            >
              <FormInput type="email" name="email" size="large" label="Email" />
            </Col>
            <Col
              className="gutter-row"
              span={8}
              style={{
                marginBottom: "10px",
              }}
            >
              <FormInput
                type="text"
                name="contactNo"
                size="large"
                label="Contact Number"
              />
            </Col>
            <Col
              className="gutter-row"
              span={8}
              style={{
                marginBottom: "10px",
              }}
            >
              <FormInput
                type="text"
                name="emergencyContactNo"
                size="large"
                label="Emergency Contact Number"
              />
            </Col>
            <Col
              className="gutter-row"
              span={8}
              style={{
                marginBottom: "10px",
              }}
            >
              <FormDatePicker
                name="dateOfBirth"
                size="large"
                label="Date Of Birth"
              />
            </Col>
            <Col
              className="gutter-row"
              span={8}
              style={{
                marginBottom: "10px",
              }}
            >
              <FormSelectField
                name="bloodGroup"
                size="large"
                label="Blood Group"
                options={bloodGroupOptions}
                placeholder="Select"
              />
            </Col>
            <Col
              className="gutter-row"
              span={8}
              style={{
                marginBottom: "10px",
              }}
            >
              <FormInput
                type="text"
                name="designation"
                size="large"
                label="Designation"
              />
            </Col>
            <Col span={12} style={{ margin: "10px 0" }}>
              <FormTextArea
                name="presentAddress"
                label="Present Address"
                rows={4}
              />
            </Col>
            <Col span={12} style={{ margin: "10px 0" }}>
              <FormTextArea
                name="permanentAddress"
                label="Permanent Address"
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
  );
};

export default AdminEditPage;
