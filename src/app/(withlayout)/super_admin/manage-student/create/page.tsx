"use client";
import StepperForm from "@/components/StepperForm/StepperForm";
import BasicInformation from "@/components/StudentForms/BasicInformation";
import GuardianInformation from "@/components/StudentForms/GuardianInformation";
import LocalGuardianInformation from "@/components/StudentForms/LocalGuardianInformation";
import StudentInformation from "@/components/StudentForms/StudentInformation";

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

  return (
    <div>
      <h1>Create Student</h1>
      <StepperForm
        submitHandler={(value) => handelStudentInfoSubmit(value)}
        steps={steps}
      />
    </div>
  );
};

export default CreateStudentPage;
