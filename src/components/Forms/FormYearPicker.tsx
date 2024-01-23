import { DatePicker } from "antd";
import { Controller, useFormContext } from "react-hook-form";
import dayjs from "dayjs";

const FormYearPicker = ({
  name,
  label,
  picker,
}: {
  name: string;
  label?: string;
  picker: "year" | "time";
}) => {
  const { control } = useFormContext();
  return (
    <>
      {label ? label : null}
      <br />
      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          return (
            <DatePicker
              style={{ width: "100%" }}
              defaultValue={field.value}
              value={field.value ? dayjs().year(field.value) : null}
              picker={picker}
              size="large"
              onChange={(_, dateString) => {
                field.onChange(dateString);
              }}
            />
          );
        }}
      />
    </>
  );
};

export default FormYearPicker;
