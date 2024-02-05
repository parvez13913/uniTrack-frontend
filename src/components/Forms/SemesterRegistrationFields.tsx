import Loading from "@/app/loading";
import FormSelectField, { SelectOptions } from "./FormSelectField";
import { useSemesterRegistrationsQuery } from "@/redux/api/semesterRegistrationApi";

type SemesterRegistrationFieldsProps = {
  name: string;
  label?: string;
  onChange: (el: any) => void;
};

const SemesterRegistrationFields = ({
  name,
  label,
  onChange,
}: SemesterRegistrationFieldsProps) => {
  const { data, isLoading } = useSemesterRegistrationsQuery({
    limit: 100,
    page: 1,
  });

  if (isLoading) {
    return <Loading />;
  }

  const semesterRegistrations = data?.semesterRegistrations;
  const semesterRegistrationsOptions = semesterRegistrations?.map(
    (semester) => {
      return {
        label:
          semester?.academicSemester?.title +
          "-" +
          semester?.academicSemester?.year,
        value: semester?.id,
      };
    }
  );
  return (
    <FormSelectField
      name={name}
      label={label}
      options={semesterRegistrationsOptions as SelectOptions[]}
      handleChange={(el) => onChange(el)}
      size="large"
      placeholder="Select"
    />
  );
};

export default SemesterRegistrationFields;
