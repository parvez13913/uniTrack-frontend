import Loading from "@/app/loading";
import { useAcademicSemestersQuery } from "@/redux/api/academic/semesterApi";
import FormSelectField, { SelectOptions } from "./FormSelectField";

type AcademicSemesterFieldsProps = {
  name: string;
  label: string;
};

const AcademicSemestersFields = ({
  name,
  label,
}: AcademicSemesterFieldsProps) => {
  const { data, isLoading } = useAcademicSemestersQuery({
    limit: 100,
    page: 1,
  });

  if (isLoading) {
    return <Loading />;
  }

  const academicSemesters = data?.academicSemesters;

  const academicSemesterOptions = academicSemesters?.map((academicSemester) => {
    return {
      label: academicSemester?.title + "-" + academicSemester?.year,
      value: academicSemester?.id,
    };
  });

  return (
    <FormSelectField
      name={name}
      size="large"
      label={label}
      options={academicSemesterOptions as SelectOptions[]}
      placeholder="Select"
    />
  );
};

export default AcademicSemestersFields;
