import { useFacultiesQuery } from "@/redux/api/facultyApi";
import FormSelectField from "./FormSelectField";
import Loading from "@/app/loading";

type FacultyProps = {
  name: string;
  label?: string;
};

const CoreFacultyFields = ({ name }: FacultyProps) => {
  const { data, isLoading } = useFacultiesQuery({
    limit: 100,
    page: 1,
  });

  if (isLoading) {
    return <Loading />;
  }

  const faculties = data?.faculties;
  const facultiesOptions = faculties?.map((faculty: any) => {
    return {
      label: `${faculty?.firstName} ${faculty?.lastName} ${faculty?.middleName}`,
      value: faculty?.id,
    };
  });

  return (
    <FormSelectField
      name={name}
      label="Faculty"
      options={facultiesOptions as any}
    />
  );
};

export default CoreFacultyFields;
