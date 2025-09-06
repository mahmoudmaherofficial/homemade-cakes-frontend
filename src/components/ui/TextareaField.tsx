"use client";

import { useFormikContext } from "formik";
import FormError from "@/components/ui/FormError";
import { TextareaFormValues as FormValues, TextAreaFieldProps } from "@/types/types";

export default function TextAreaField({ name, label, placeholder }: TextAreaFieldProps) {
  const { values, errors, touched, handleChange, handleBlur } = useFormikContext<FormValues>();

  return (
    <div>
      <label htmlFor={name} className="block mb-1 text-sm text-muted-foreground">
        {label}
      </label>
      <textarea
        id={name}
        name={name}
        className="w-full min-h-24 p-3 rounded-lg border bg-input text-foreground 
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
