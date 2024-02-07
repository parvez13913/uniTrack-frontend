"use client";

import Loading from "@/app/loading";
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
import { Button, Col, Row, message } from "antd";
import dayjs from "dayjs";

const EditSemesterRegistrationPage = ({ params }: { params: any }) => {
  const { id } = params;
  const { data, isLoading } = useSemesterRegistrationQuery(id);
  const [updateSemesterRegistration] = useUpdateSemesterRegistrationMutation();

  if (isLoading) {
    return <Loading />;
  }

  const updateOnSubmit = async (values: any) => {
    const tempObject = { ...values };
    tempObject["startDate"] = dayjs(tempObject["startDate"]).toISOString();
    tempObject["endDate"] = dayjs(tempObject["endDate"]).toISOString();
    tempObject["minCredit"] = Number(tempObject["minCredit"]);
    tempObject["maxCredit"] = Number(tempObject["maxCredit"]);
    message.loading("Updating....");
    try {
      const response = await updateSemesterRegistration({
        id,
        body: tempObject,
      });
      if (!!response) {
        message.success("Updated Semester registration successfully");
      }
      if (!response) {
        message.success("Semester registration Update fail");
      }
    } catch (error: any) {
      message.error(error.message);
    }
  };

  const statusOptions = semesterRegistrationStatus
    ?.map((status) => {
      return {
        label: status,
        value: status,
        disabled: false,
      };
    })
    .map((element) => {
      if (data?.status === "UPCOMING") {
        if (element.value === "ENDED") {
          element.disabled = true;
        }
      } else if (data?.status === "ONGOING") {
        if (element.value === "UPCOMING") {
          element.disabled = true;
        }
      } else if (data?.status === "ENDED") {
        if (element.value === "UPCOMING" || element.value === "ONGOING") {
          element.disabled = true;
        }
      }
      return element;
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
        <Button type="primary" htmlType="submit">
          Update
        </Button>
      </Form>
    </>
  );
};

export default EditSemesterRegistrationPage;
