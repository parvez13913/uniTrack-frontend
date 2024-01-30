import Loading from "@/app/loading";
import FormSelectField, { SelectOptions } from "./FormSelectField";
import { useSemesterRegistrationsQuery } from "@/redux/api/semesterRegistrationApi";

type SemesterRegistrationFieldsProps = {
  name: string;
  label: string;
};

const SemesterRegistrationFields = ({
  name,
  label,
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
    (semesterRegistration) => {
      return {
        label: semesterRegistration?.academicSemester?.title,
        value: semesterRegistration?.id,
      };
    }
  );
  return (
    <FormSelectField
      name={name}
      size="large"
      label={label}
      options={semesterRegistrationsOptions as SelectOptions[]}
      placeholder="Select"
    />
  );
};

export default SemesterRegistrationFields;
