import { useAcademicDepartmentsQuery } from "@/redux/api/academic/departmentApi";
import FormSelectField, { SelectOptions } from "./FormSelectField";
import Loading from "@/app/loading";

type AcademicDepartmentFieldsProps = {
  name: string;
  label: string;
  onChange: (element: any) => void;
};

const AcademicDepartmentFields = ({
  name,
  label,
  onChange,
}: AcademicDepartmentFieldsProps) => {
  const { data, isLoading } = useAcademicDepartmentsQuery({
    limit: 100,
    page: 1,
  });

  if (isLoading) {
    return <Loading />;
  }

  const academicDepartments = data?.academicDepartments;
  const academicDepartmentOptions = academicDepartments?.map(
    (academicDepartment) => {
      return {
        label: academicDepartment?.title,
        value: academicDepartment?.id,
      };
    }
  );
  return (
    <FormSelectField
      name={name}
      size="large"
      label={label}
      options={academicDepartmentOptions as SelectOptions[]}
      placeholder="Select"
      handleChange={(element: any) => onChange(element)}
    />
  );
};

export default AcademicDepartmentFields;
