"use client";
import { LoginApi } from "@/api/auth";
import InputField from "@/components/ui/InputField";
import { useAuth } from "@/context/AuthContext";
import { LoginFormValues } from "@/types/types";
import { AxiosError } from "axios";
import { Formik, Form } from "formik";
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

  const initialValues: LoginFormValues = {
    phone: "",
    password: "",
  };

  const phoneRegex = /^(\+201|01|00201)[0-2,5]{1}[0-9]{8}$/;

  const validationSchema = Yup.object().shape({
    phone: Yup.string().matches(phoneRegex, t("validation.phoneInvalid")).required(t("validation.phoneRequired")),
    password: Yup.string().required(t("validation.passwordRequired")),
  });

  const handleSubmit = async (values: LoginFormValues) => {
    try {
      const res = await LoginApi(values);
      setUser(res.data.user);
      // resetForm();
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

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      validateOnBlur
      validateOnChange>
      {({ isSubmitting }) => (
        <Form className="w-full md:w-[450px] p-6 rounded-2xl shadow-md shadow-black/5 border border-border bg-card z-1">
          {/* Title */}
          <div className="text-[22px] font-semibold text-foreground mb-1 text-center tracking-tight">{t("title")}</div>
          <div className="text-muted-foreground mb-6 text-center">{t("description")}</div>

          {/* Phone */}
          <div className="mb-4">
            <InputField
              name="phone"
              label={t("labels.phone")}
              disabled={isSubmitting}
              placeholder={t("placeholders.phone")}
              type="text"
              required
            />
          </div>

          {/* Password */}
          <div className="mb-4 relative">
            <InputField
              name="password"
              label={t("labels.password")}
              disabled={isSubmitting}
              placeholder={t("placeholders.password")}
              type={showPassword ? "text" : "password"}
              required
            />

            {/* Show/Hide password button */}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className={`absolute ${t(
                "icons.showPassword"
              )} top-1/2 p-1 text-muted-foreground hover:text-primary transition`}>
              <svg fill="none" viewBox="0 0 24 24" className="w-4 h-4">
                <path
                  strokeWidth="1.5"
                  stroke="currentColor"
                  d="M2 12C2 12 5 5 12 5C19 5 22 12 22 12C22 12 19 19 12 19C5 19 2 12 2 12Z"></path>
                <circle strokeWidth="1.5" stroke="currentColor" r="3" cy="12" cx="12"></circle>
              </svg>
            </button>
          </div>

          {/* Submit */}
          <button
            className="relative w-full h-10 mt-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition transform hover:-translate-y-[1px] shadow-md hover:shadow-lg overflow-hidden"
            type="submit"
            disabled={isSubmitting}>
            <span>{isSubmitting ? t("buttons.loading") : t("buttons.login")}</span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500"></div>
          </button>

          {/* Footer */}
          <div className="mt-4 text-center text-xs text-muted-foreground">
            {t("buttons.noAccount")}{" "}
            <Link href={t("buttons.registerHref")} className="text-primary font-medium hover:text-primary/90">
              {t("buttons.registerLabel")}
            </Link>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
