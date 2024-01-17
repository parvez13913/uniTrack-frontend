"use client";
import { Input } from "antd";
import { useFormContext, Controller } from "react-hook-form";

type TextAreaProps = {
  name: string;
  size?: "large" | "small";
  rows?: number;
  value?: string | string[] | undefined;
  placeholder?: string;
  label?: string;
};

const FormTextArea = ({
  name,
  size,
  value,
  placeholder,
  label,
  rows,
}: TextAreaProps) => {
  const { control } = useFormContext();

  return (
    <div className={`flex flex-col  w-full`}>
      {label ? label : null}
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Input.TextArea
            rows={rows}
            placeholder={placeholder}
            {...field}
            defaultValue={value}
          />
        )}
      />
    </div>
  );
};

export default FormTextArea;
