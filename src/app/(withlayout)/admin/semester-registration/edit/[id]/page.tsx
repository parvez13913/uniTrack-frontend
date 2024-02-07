"use client";

import AcademicSemestersFields from "@/components/Forms/AcademicSemestersFields";
import Form from "@/components/Forms/Form";
import FormDatePicker from "@/components/Forms/FormDatePicker";
import FormInput from "@/components/Forms/FormInput";
import FormSelectField from "@/components/Forms/FormSelectField";
import ActionBar from "@/components/ui/ActionBar";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import { semesterRegistrationStatus } from "@/constants/global";
import {
  useSemesterRegistrationQuery,
  useUpdateSemesterRegistrationMutation,
} from "@/redux/api/semesterRegistrationApi";
import { Button, Col, Row } from "antd";

const EditSemesterRegistrationPage = ({ params }: { params: any }) => {
  const { id } = params;
  const { data, isLoading } = useSemesterRegistrationQuery(id);

  const updateOnSubmit = async (values: any) => {
    console.log(values);
  };

  const statusOptions = semesterRegistrationStatus
    ?.map((status) => {
      return {
        label: status,
        value: status,
        disabled: false,
      };
    })
    .map((el) => {
      if (data?.status === "UPCOMING") {
        if (el.value === "ENDED") {
          el.disabled = true;
        }
      } else if (data?.status === "ONGOING") {
        if (el.value === "UPCOMING") {
          el.disabled = true;
        }
      } else if (data?.status === "ENDED") {
        if (el.value === "UPCOMING" || el.value === "ONGOING") {
          el.disabled = true;
        }
      }
      return el;
    });

  const defaultValues = {
    startDate: data?.startDate || "",
    endDate: data?.endDate || "",
    academicSemesterId: data?.academicSemester?.id || "",
    minCredit: data?.minCredit || "",
    maxCredit: data?.maxCredit || "",
    status: data?.status || "",
  };

  return (
    <>
      <UMBreadCrumb
        items={[
          { label: "admin", link: "/admin" },
          {
            label: "semester-registration",
            link: "/admin/semester-registration",
          },
        ]}
      />
      <ActionBar title="Edit semester registration"></ActionBar>
      <Form submitHandler={updateOnSubmit} defaultValues={defaultValues}>
        <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
          <Col span={8} style={{ margin: "10px 0" }}>
            <div style={{ margin: "10px 0px" }}>
              <FormDatePicker
                name="startDate"
                label="start date"
                size="large"
              />
            </div>
            <div style={{ margin: "10px 0px" }}>
              <FormDatePicker name="endDate" label="end date" size="large" />
            </div>
            <div style={{ margin: "10px 0px" }}>
              <AcademicSemestersFields
                name="academicSemesterId"
                label="Academic semester"
              />
            </div>
            <div style={{ margin: "10px 0px" }}>
              <FormInput
                type="number"
                name="minCredit"
                label="min credit"
                size="large"
              />
            </div>

            <div style={{ margin: "10px 0px" }}>
              <FormInput
                type="number"
                name="maxCredit"
                label="max credit"
                size="large"
              />
            </div>

            <div style={{ margin: "10px 0px" }}>
              <FormSelectField
                options={statusOptions}
                name="status"
                label="status"
                size="large"
              />
            </div>
          </Col>
        </Row>
        <Button htmlType="submit">Update</Button>
      </Form>
    </>
  );
};

export default EditSemesterRegistrationPage;
