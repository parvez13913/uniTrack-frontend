import { useAcademicFacultiesQuery } from "@/redux/api/academic/facultyApi";
import FormSelectField, { SelectOptions } from "./FormSelectField";
import Loading from "@/app/loading";

type AcademicFacultyFieldsProps = {
  name: string;
  label: string;
};

const AcademicFacultiesFields = ({
  name,
  label,
}: AcademicFacultyFieldsProps) => {
  const { data, isLoading } = useAcademicFacultiesQuery({
    limit: 100,
    page: 1,
  });

  if (isLoading) {
    return <Loading />;
  }

  const academicFaculties = data?.academicFaculties;

  const academicFacultyOptions = academicFaculties?.map((academicFaculty) => {
    return {
      label: academicFaculty?.title,
      value: academicFaculty?.id,
    };
  });

  return (
    <FormSelectField
      name={name}
      size="large"
      label={label}
      options={academicFacultyOptions as SelectOptions[]}
      placeholder="Select"
    />
  );
};

export default AcademicFacultiesFields;
