"use client";

import { Select } from "antd";
import { useFormContext, Controller } from "react-hook-form";

export type SelectOptions = {
  value: string;
  label: string;
};
type SelectFieldProps = {
  options: SelectOptions[];
  name: string;
  size?: "large" | "small";
  value?: string | string[] | undefined;
  placeholder?: string;
  label?: string;
  defaultValue?: SelectOptions;
};

const FormMultiSelectField = ({
  name,
  size,
  value,
  placeholder,
  label,
  options,
  defaultValue,
}: SelectFieldProps) => {
  const { control } = useFormContext();

  return (
    <>
      {label ? label : null}
      <Controller
        control={control}
        name={name}
        render={({ field: { value, onChange } }) => (
          <Select
            style={{
              width: "100%",
            }}
            onChange={onChange}
            options={options}
            value={value}
            size={size}
            placeholder={placeholder}
            allowClear
            mode="multiple"
          />
        )}
      />
    </>
  );
};

export default FormMultiSelectField;
