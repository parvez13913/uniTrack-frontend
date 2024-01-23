"use client";

import Form from "@/components/Forms/Form";
import FormDatePicker from "@/components/Forms/FormDatePicker";
import FormInput from "@/components/Forms/FormInput";
import FormSelectField from "@/components/Forms/FormSelectField";
import FormTextArea from "@/components/Forms/FormTextArea";
import ActionBar from "@/components/ui/ActionBar";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import UploadImage from "@/components/ui/UploadImage";
import { bloodGroupOptions, genderOptions } from "@/constants/global";
import { useAdminQuery, useUpdateAdminMutation } from "@/redux/api/adminApi";
import { useDepartmentsQuery } from "@/redux/api/departmentApi";
import { updateAdminSchema } from "@/schemas/admin";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Col, Row, message } from "antd";

type IdProps = {
  params: any;
};

const AdminEditPage = ({ params }: IdProps) => {
  const { id } = params;
  // Management department option
  const { data, isLoading } = useDepartmentsQuery({ limit: 100, page: 1 });
  const [updateAdmin] = useUpdateAdminMutation();
  const onSubmit = async (values: any) => {
    message.loading("Admin Updating...");
    try {
      await updateAdmin({ id, body: values });
      message.success("Admin updated successfully");
    } catch (error: any) {
      await message.error(error.message);
    }
  };

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

  const defaultValues = {};

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
      <Form submitHandler={onSubmit} resolver={yupResolver(updateAdminSchema)}>
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
                name="admin.name.firstName"
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
                name="admin.name.middleName"
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
                name="admin.name.lastName"
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
              <FormInput
                type="password"
                name="password"
                size="large"
                label="Password"
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
                name="admin.gender"
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
                name="admin.managementDepartment"
                size="large"
                label="Department"
                options={managementDepartmentOptions}
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
              <UploadImage name="file" />
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
              <FormInput
                type="email"
                name="admin.email"
                size="large"
                label="Email"
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
                name="admin.contactNo"
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
                name="admin.emergencyContactNo"
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
                name="admin.dateOfBirth"
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
                name="admin.bloodGroup"
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
                name="admin.designation"
                size="large"
                label="Designation"
              />
            </Col>
            <Col span={12} style={{ margin: "10px 0" }}>
              <FormTextArea
                name="admin.presentAddress"
                label="Present Address"
                rows={4}
              />
            </Col>
            <Col span={12} style={{ margin: "10px 0" }}>
              <FormTextArea
                name="admin.permanentAddress"
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
