"use client";

import { useFormikContext } from "formik";
import FormError from "@/components/ui/FormError";
import type { InputFormValues as FormValues, InputFieldProps } from "@/types/types";

export default function InputField({
  name,
  label,
  type = "text",
  placeholder,
  disabled = false,
  required = false,
}: InputFieldProps) {
  const { values, errors, touched, handleChange, handleBlur } = useFormikContext<FormValues>();

  return (
    <div>
      <label htmlFor={name} className="block mb-1 text-sm text-muted-foreground">
        {label}
      </label>
      <input
        id={name}
        type={type}
        name={name}
        disabled={disabled}
        required={required}
        className="w-full h-10 px-3 rounded-lg border bg-input text-foreground 
          placeholder:text-muted-foreground focus:outline-none focus:border-primary 
          focus:bg-background focus:ring-4 focus:ring-ring transition"
        value={values[name] || ""}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder={placeholder}
      />
      {touched[name] && errors[name] && <FormError error={errors[name] as string} />}
    </div>
  );
}
