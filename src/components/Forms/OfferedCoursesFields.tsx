import { useCoursesQuery } from "@/redux/api/courseApi";
import FormMultiSelectField, { SelectOptions } from "./FormMultiSelectField";
import Loading from "@/app/loading";

type MultiSelectFieldProps = {
  name: string;
  label: string;
};

const OfferedCoursesFields = ({ name, label }: MultiSelectFieldProps) => {
  const { data, isLoading } = useCoursesQuery({ limit: 10, page: 1 });

  if (isLoading) {
    return <Loading />;
  }
  const courses = data?.courses;
  const coursesOptions = courses?.map((course) => {
    return {
      label: course?.title,
      value: course?.id,
    };
  });
  return (
    <>
      <FormMultiSelectField
        name={name}
        label={label}
        options={coursesOptions as SelectOptions[]}
        size="large"
      />
    </>
  );
};

export default OfferedCoursesFields;
