"use client";
import { useFormik } from "formik";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import * as Yup from "yup";
import FormError from "@/components/ui/FormError";
import { RegisterApi } from "@/api/auth";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const t = useTranslations("authPages.register");
  const { setUser } = useAuth();
  const router = useRouter();

  // Initial values
  const initialValues = {
    name: "",
    phone: "",
    email: "",
    password: "",
  };

  // Regex
  const phoneRegex = /^(\+201|01|00201)[0-2,5]{1}[0-9]{8}$/;

  // Validation schema
  const validationSchema = Yup.object().shape({
    name: Yup.string().required(t("validation.usernameRequired")),
    phone: Yup.string().matches(phoneRegex, t("validation.phoneInvalid")).required(t("validation.phoneRequired")),
    email: Yup.string().email(t("validation.emailInvalid")).required(t("validation.emailRequired")),
    password: Yup.string().min(8, t("validation.passwordMin")).required(t("validation.passwordRequired")),
  });

  // Submit function
  const regApi = async (values: typeof initialValues, resetForm: () => void) => {
    try {
      const res = await RegisterApi(values);
      setUser(res.data.user);
      router.replace("/");
      resetForm();
      toast.success(t("toasts.registerSuccess"));
    } catch (error) {
      console.log(error);
    }
  };

  // Formik hook
  const formik = useFormik({
    initialValues,
    validationSchema,
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: (values, { resetForm }) => regApi(values, resetForm),
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="w-full md:w-[450px] p-6 rounded-2xl shadow-md shadow-black/5 border border-border bg-card z-1">
      {/* Title */}
      <div className="text-[22px] font-semibold text-foreground mb-1 text-center tracking-tight">{t("title")}</div>
      <div className="text-muted-foreground mb-6 text-center">{t("description")}</div>

      {/* Username */}
      <div className="mb-4">
        <div className="relative flex items-center">
          <svg
            fill="none"
            viewBox="0 0 24 24"
            className={`absolute ${t("icons.name")} w-4 h-4 text-muted-foreground pointer-events-none`}>
            <circle strokeWidth="1.5" stroke="currentColor" r="4" cy="8" cx="12"></circle>
            <path
              strokeLinecap="round"
              strokeWidth="1.5"
              stroke="currentColor"
              d="M5 20C5 17.2386 8.13401 15 12 15C15.866 15 19 17.2386 19 20"></path>
          </svg>
          <input
            required
            placeholder={t("placeholders.name")}
            className="w-full h-10 px-9 text-sm border rounded-lg bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:bg-background focus:ring-4 focus:ring-ring transition"
            type="text"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </div>
        {formik.touched.name && formik.errors.name && <FormError error={formik.errors.name} />}
      </div>

      {/* Phone */}
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

      {/* Email */}
      <div className="mb-4">
        <div className="relative flex items-center">
          <svg
            fill="none"
            viewBox="0 0 24 24"
            className={`absolute ${t("icons.email")} w-4 h-4 text-muted-foreground pointer-events-none`}>
            <path
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16c.55 0 1 .45 1 1v10c0 .55-.45 1-1 1H4c-.55 0-1-.45-1-1V7c0-.55.45-1 1-1zm0 0l8 6 8-6"
            />
          </svg>
          <input
            required
            placeholder={t("placeholders.email")}
            className="w-full h-10 px-9 text-sm border rounded-lg bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:bg-background focus:ring-4 focus:ring-ring transition"
            type="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </div>
        {formik.touched.email && formik.errors.email && <FormError error={formik.errors.email} />}
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
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className={`absolute ${t("icons.showPassword")} p-1 text-muted-foreground hover:text-primary transition`}>
            {showPassword ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M13.875 18.825A10.05 10.05 0 0112 19.5C5 19.5 2 12 2 12s.875-2.19 2.625-4.05m3.375-2.325A9.971 9.971 0 0112 4.5c7 0 10 7.5 10 7.5a18.65 18.65 0 01-2.223 3.61M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M2.25 12s3.75-7.5 9.75-7.5S21.75 12 21.75 12s-3.75 7.5-9.75 7.5S2.25 12 2.25 12z"
                />
                <circle cx="12" cy="12" r="3" strokeWidth="1.5" stroke="currentColor" />
              </svg>
            )}
          </button>
        </div>
        {formik.touched.password && formik.errors.password && <FormError error={formik.errors.password} />}
      </div>

      {/* Submit */}
      <button
        className="relative w-full h-10 mt-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition transform hover:-translate-y-[1px] shadow-md hover:shadow-lg overflow-hidden"
        type="submit">
        <span>{t("buttons.register")}</span>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500"></div>
      </button>

      {/* Footer */}
      <div className="mt-4 text-center text-xs text-muted-foreground">
        {t("buttons.haveAccount")}{" "}
        <Link href={t("buttons.loginHref")} className="text-primary font-medium hover:text-primary/90">
          {t("buttons.loginLabel")}
        </Link>
      </div>
    </form>
  );
};

export default RegisterForm;
