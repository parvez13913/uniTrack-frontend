import { useAcademicDepartmentsQuery } from "@/redux/api/academic/departmentApi";
import FormSelectField, { SelectOptions } from "./FormSelectField";
import Loading from "@/app/loading";

type AcademicDepartmentFieldsProps = {
  name: string;
  label: string;
  onChange: (el: any) => void;
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
      label={label}
      options={academicDepartmentOptions as SelectOptions[]}
      handleChange={(el: any) => onChange(el)}
      placeholder="Select"
      size="large"
    />
  );
};

export default AcademicDepartmentFields;
