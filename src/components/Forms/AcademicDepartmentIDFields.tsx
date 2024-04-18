import Loading from "@/app/loading";
import { useAcademicDepartmentsQuery } from "@/redux/api/academic/departmentApi";
import FormSelectField, { SelectOptions } from "./FormSelectField";

type AcademicDepartmentIDFieldsProps = {
  name: string;
  label: string;
  onChange: (el: any) => void;
};

const AcademicDepartmentIDFields = ({
  name,
  label,
  onChange,
}: AcademicDepartmentIDFieldsProps) => {
  const { data, isLoading } = useAcademicDepartmentsQuery({
    limit: 100,
    page: 1,
  });

  const academicDepartments = data?.academicDepartments;
  const academicDepartmentOptions = academicDepartments?.map(
    (academicDepartment: any) => {
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
      placeholder="Select"
      size="large"
      options={academicDepartmentOptions as SelectOptions[]}
      handleChange={(el: any) => onChange(el)}
    />
  );
};

export default AcademicDepartmentIDFields;
