"use client";
import { LoginApi } from "@/app/api/auth";
import FormError from "@/components/ui/FormError";
import { useAuth } from "@/context/AuthContext";
import { LoginFormValues } from "@/types/types";
import { AxiosError } from "axios";
import { useFormik } from "formik";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import * as Yup from "yup";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const t = useTranslations("authPages.login");
  const { setUser } = useAuth();
  const router = useRouter();

  // Initial values for the form
  const initialValues = {
    phone: "",
    password: "",
  };

  // Regular expressions for validation
  const phoneRegex = /^(\+201|01|00201)[0-2,5]{1}[0-9]{8}/g;
  // const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

  // Validation schema
  const validationSchema = Yup.object().shape({
    phone: Yup.string().matches(phoneRegex, t("validation.phoneInvalid")).required(t("validation.phoneRequired")),
    password: Yup.string()
      // .matches(passwordRegex, t("passwordInvalid"))
      .required(t("validation.passwordRequired")),
  });

  const logApi = async (values: LoginFormValues, resetForm: () => void) => {
    try {
      const res = await LoginApi(values);
      setUser(res.data.user);
      resetForm();
      router.replace("/");
      toast.success(t("toasts.loginSuccess"));
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message || t("toasts.loginError"));
      } else {
        toast.error(t("toasts.loginError"));
      }
    }
  };

  // Formik hook
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: (values, { resetForm }) => logApi(values, resetForm),
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="w-full md:w-[450px] p-6 rounded-2xl shadow-md shadow-black/5 border border-border bg-card z-1">
      {/* Title */}
      <div className="text-[22px] font-semibold text-foreground mb-1 text-center tracking-tight">{t("title")}</div>
      <div className="text-muted-foreground mb-6 text-center">{t("description")}</div>

      {/* Email */}
      <div className="mb-4">
        <div className="relative flex items-center">
          <svg
            fill="none"
            viewBox="0 0 24 24"
            className={`absolute ${t("icons.phone")} w-4 h-4 text-muted-foreground pointer-events-none`}>
            <path
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.05-.24c1.12.37 2.33.57 3.54.57a1 1 0 011 1v3.5a1 1 0 01-1 1C10.61 21 3 13.39 3 4.5a1 1 0 011-1H7.5a1 1 0 011 1c0 1.21.2 2.42.57 3.54a1 1 0 01-.24 1.05l-2.2 2.2z"
            />
          </svg>

          <input
            required
            placeholder={t("placeholders.phone")}
            className="w-full h-10 px-9 text-sm border rounded-lg bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:bg-background focus:ring-4 focus:ring-ring transition"
            type="text"
            name="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </div>
        {formik.touched.phone && formik.errors.phone && <FormError error={formik.errors.phone} />}
      </div>

      {/* Password */}
      <div className="mb-4">
        <div className="relative flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`absolute ${t("icons.password")} w-4 h-4 text-muted-foreground pointer-events-none`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="1.5">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.5 10.5V7.5a4.5 4.5 0 00-9 0v3m-.75 0h10.5A1.5 1.5 0 0118.75 12v7.5A1.5 1.5 0 0117.25 21H6.75A1.5 1.5 0 015.25 19.5V12a1.5 1.5 0 011.5-1.5z"
            />
          </svg>
          <input
            required
            placeholder={t("placeholders.password")}
            className="w-full h-10 px-9 pr-10 text-sm border rounded-lg bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:bg-background focus:ring-4 focus:ring-ring transition"
            type={showPassword ? "text" : "password"}
            name="password"
            onChange={formik.handleChange}
            value={formik.values.password}
            onBlur={formik.handleBlur}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className={`absolute ${t("icons.showPassword")} p-1 text-muted-foreground hover:text-primary transition`}>
            <svg fill="none" viewBox="0 0 24 24" className="w-4 h-4">
              <path
                strokeWidth="1.5"
                stroke="currentColor"
                d="M2 12C2 12 5 5 12 5C19 5 22 12 22 12C22 12 19 19 12 19C5 19 2 12 2 12Z"></path>
              <circle strokeWidth="1.5" stroke="currentColor" r="3" cy="12" cx="12"></circle>
            </svg>
          </button>
        </div>
        {formik.touched.password && formik.errors.password && <FormError error={formik.errors.password} />}
      </div>

      {/* Submit */}
      <button
        className="relative w-full h-10 mt-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition transform hover:-translate-y-[1px] shadow-md hover:shadow-lg overflow-hidden"
        type="submit">
        <span>{t("buttons.login")}</span>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500"></div>
      </button>

      {/* Footer */}
      <div className="mt-4 text-center text-xs text-muted-foreground">
        {t("buttons.noAccount")}{" "}
        <Link href={t("buttons.registerHref")} className="text-primary font-medium hover:text-primary/90">
          {t("buttons.registerLabel")}
        </Link>
      </div>
    </form>
  );
};

export default LoginForm;
