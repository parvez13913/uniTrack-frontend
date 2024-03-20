"use client";

import Loading from "@/app/loading";
import ActionBar from "@/components/ui/ActionBar";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import UMCollapse, { ItemsProps } from "@/components/ui/UMCollapse";
import {
  useEnrollIntoCourseMutation,
  useMySemesterRegistrationCoursesQuery,
  useWithdrawFromCourseMutation,
} from "@/redux/api/semesterRegistrationApi";
import { Button, message } from "antd";

const ViewPreregistrationPage = () => {
  const { data, isLoading } = useMySemesterRegistrationCoursesQuery({});

  const [enrollIntoCourse] = useEnrollIntoCourseMutation();
  const [withdrawFromCourse] = useWithdrawFromCourseMutation();

  const handleEnroll = async ({
    offeredCourseId,
    offeredCourseSectionId,
  }: any) => {
    try {
      const response = await enrollIntoCourse({
        offeredCourseId,
        offeredCourseSectionId,
      });

      if (!response) {
        message.success("Enroll failed");
      }
      if (!!response) {
        message.success("Successfully Enrolled");
      }
    } catch (error: any) {
      message.error(error);
    }
  };

  const handelWithdraw = async ({
    offeredCourseId,
    offeredCourseSectionId,
  }: any) => {
    try {
      const response = await withdrawFromCourse({
        offeredCourseId,
        offeredCourseSectionId,
      });

      if (!response) {
        message.success("Withdraw failed");
      }
      if (!!response) {
        message.success("Successfully Withdraw");
      }
    } catch (error: any) {
      message.error(error);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  const availableCourses: ItemsProps[] = data?.map(
    (availableCourse: any, index: number) => {
      const obj = {
        key: index,
        label: availableCourse?.course?.title,
        isTaken: availableCourse.isTaken,
        children: (
          <table style={{ padding: "0px 10px", borderSpacing: "10px 15px" }}>
            {availableCourse?.offeredCourseSections?.map(
              (section: any, index: number) => {
                return (
                  <tr key={index}>
                    <td style={{ width: "30%" }}>
                      <span style={{ fontWeight: "bold" }}>
                        Section - {section?.title}{" "}
                      </span>
                    </td>
                    <td style={{ width: "30%" }}>
                      <span>
                        Enrolled - ({section?.currentlyEnrolledStudent}/
                        {section?.maxCapacity})
                      </span>
                    </td>

                    <td style={{ width: "30%" }}>
                      <table
                        style={{
                          border: "1px solid #d9d9d9",
                          padding: "5px 10px",
                          borderRadius: "5px",
                        }}
                      >
                        <th
                          style={{
                            textAlign: "center",
                            borderBottom: "1px solid black",
                            textTransform: "capitalize",
                          }}
                          colSpan={3}
                        >
                          class schedule
                        </th>

                        {section?.offeredCourseClassSchedules?.map(
                          (element: any, index: number) => {
                            return (
                              <tr
                                key={index}
                                style={{
                                  width: "30%",
                                }}
                              >
                                <td
                                  style={{
                                    fontWeight: 700,
                                    marginRight: "10px",
                                    textTransform: "capitalize",
                                    textAlign: "right",
                                  }}
                                >
                                  {element?.dayOfWeek}
                                </td>
                                <td
                                  style={{
                                    textAlign: "left",
                                    padding: "0px 15px",
                                  }}
                                >
                                  {element?.startTime} - {element?.endTime}
                                </td>
                              </tr>
                            );
                          }
                        )}
                      </table>
                    </td>
                    <td
                      style={{
                        width: "30%",
                      }}
                    >
                      {availableCourse?.isTaken && section?.isTaken ? (
                        <Button
                          type="primary"
                          danger
                          onClick={() =>
                            handelWithdraw({
                              offeredCourseId: availableCourse?.id,
                              offeredCourseSectionId: section?.id,
                            })
                          }
                        >
                          Withdraw
                        </Button>
                      ) : (
                        <Button
                          type="primary"
                          onClick={() =>
                            handleEnroll({
                              offeredCourseId: availableCourse?.id,
                              offeredCourseSectionId: section?.id,
                            })
                          }
                        >
                          Enroll
                        </Button>
                      )}
                    </td>
                  </tr>
                );
              }
            )}
          </table>
        ),
      };

      return obj;
    }
  );

  const onChange = (element: any) => {
    console.log(element);
  };

  const base = "student";

  return (
    <>
      <UMBreadCrumb items={[{ label: `${base}`, link: `/${base}` }]} />
      <ActionBar title="Course Pre-registration" />
      <UMCollapse
        items={availableCourses}
        onChange={onChange}
        defaultActiveKey={["1"]}
      />
    </>
  );
};

export default ViewPreregistrationPage;
