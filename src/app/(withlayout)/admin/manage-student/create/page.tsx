"use client";

import StepperForm from "@/components/StepperForm/StepperForm";
import BasicInformation from "@/components/StudentForms/BasicInformation";
import GuardianInformation from "@/components/StudentForms/GuardianInformation";
import LocalGuardianInformation from "@/components/StudentForms/LocalGuardianInformation";
import StudentInformation from "@/components/StudentForms/StudentInformation";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";

const CreateStudentPage = () => {
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

  const handelStudentInfoSubmit = (data: any) => {
    try {
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  const base = "admin";

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
        submitHandler={(value) => handelStudentInfoSubmit(value)}
        steps={steps}
      />
    </div>
  );
};

export default CreateStudentPage;
