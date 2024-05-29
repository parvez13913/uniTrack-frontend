"use client";

import StepperForm from "@/components/StepperForm/StepperForm";
import BasicInformation from "@/components/StudentForms/BasicInformation";
import GuardianInformation from "@/components/StudentForms/GuardianInformation";
import LocalGuardianInformation from "@/components/StudentForms/LocalGuardianInformation";
import StudentInformation from "@/components/StudentForms/StudentInformation";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import { useAddStudentMutation } from "@/redux/api/studentApi";
import { message } from "antd";

const CreateStudentPage = () => {
  const [addStudent] = useAddStudentMutation();
  const steps = [
    {
      title: "Student Information",
      content: <StudentInformation />,
    },
    {
      title: "Basic Information",
      content: <BasicInformation />,
    },
    {
      title: "Guardian Information",
      content: <GuardianInformation />,
    },
    {
      title: "Local Guardian Information",
      content: <LocalGuardianInformation />,
    },
  ];

  const handelStudentInfoSubmit = async (values: any) => {
    const obj = { ...values };
    const file = obj["file"];
    delete obj["file"];
    const data = JSON.stringify(obj);
    const formData = new FormData();
    formData.append("file", file as Blob);
    formData.append("data", data);
    message.loading("Student Creating...");

    try {
      const response = await addStudent(formData);
      if (!!response) {
        message.success("Student added successfully");
      }
    } catch (error: any) {
      message.error(error.message);
    }
  };

  const base = "super_admin";

  return (
    <div>
      <UMBreadCrumb
        items={[
          { label: `${base}`, link: `/${base}` },
          { label: "manage-student", link: `/${base}/manage-student` },
        ]}
      />
      <h1 style={{ margin: "10px 0px" }}>Create Student</h1>
      <StepperForm
        persistKey="student-create-form"
        submitHandler={(value) => handelStudentInfoSubmit(value)}
        steps={steps}
      />
    </div>
  );
};

export default CreateStudentPage;
