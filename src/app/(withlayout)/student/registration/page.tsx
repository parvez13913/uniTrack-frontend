"use client";

import Loading from "@/app/loading";
import {
  useMyRegistrationQuery,
  useStartRegistrationMutation,
} from "@/redux/api/semesterRegistrationApi";
import { Button } from "antd";
import { useRouter } from "next/navigation";

const StudentRegistrationPage = () => {
  const { data, isLoading } = useMyRegistrationQuery({});
  const [startRegistration] = useStartRegistrationMutation();
  const router = useRouter();

  if (isLoading) {
    return <Loading />;
  }

  const goToRegistrationHandler = async () => {
    if (!data?.studentSemesterRegistration) {
      try {
        await startRegistration({});
      } catch (error) {}
    }
    router.push("/student/pre-registration");
  };

  return (
    <>
      <div style={{ margin: "10px 0px" }}>
        {data?.semesterRegistration &&
        data?.semesterRegistration?.status === "ONGOING" &&
        !data?.semesterRegistration?.isConfirmed ? (
          <Button type="primary" danger onClick={goToRegistrationHandler}>
            Go to registration
          </Button>
        ) : (
          <>
            <div>You are not allowed to do your registration. Stay tuned.</div>
          </>
        )}
      </div>
    </>
  );
};

export default StudentRegistrationPage;
