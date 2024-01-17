"use client";
import { DatePicker, DatePickerProps, Input } from "antd";
import { useFormContext, Controller } from "react-hook-form";
import dayjs, { Dayjs } from "dayjs";

type UMDatePickerProps = {
  onChange?: (valueOne: Dayjs | null, valueTwo: string) => void;
  name: string;
  size?: "large" | "small";
  value?: Dayjs;
  label?: string;
};

const FormDatePicker = ({
  name,
  size,
  value,
  label,
  onChange,
}: UMDatePickerProps) => {
  const { control, setValue } = useFormContext();
  const handelOnChange: DatePickerProps["onChange"] = (date, dateString) => {
    onChange ? onChange(date, dateString) : null;
    setValue(name, dateString);
  };

  return (
    <div className={`flex flex-col  w-full`}>
      {label ? label : null}
      <br />
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <DatePicker
            name={name}
            value={dayjs(field.value) || ""}
            size={size}
            onChange={handelOnChange}
            style={{ width: "100%" }}
          />
        )}
      />
    </div>
  );
};

export default FormDatePicker;
