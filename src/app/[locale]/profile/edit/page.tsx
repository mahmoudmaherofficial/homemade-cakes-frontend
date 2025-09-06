// // src/app/[locale]/profile/edit/page.tsx
// "use client";

// import { Formik, Form } from "formik";
// import * as Yup from "yup";
// import { AxiosError } from "axios";
// import toast from "react-hot-toast";
// import { Button } from "@/components/ui/button";
// import { useAuth } from "@/context/AuthContext";
// import { updateMeApi } from "@/api/user";
// import type { User } from "@/types/types";
// import PatternBG from "@/components/ui/pattern-bg/PatternBG";
// import { useRouter } from "next/navigation";
// import FormError from "@/components/ui/FormError";

// const phoneRegex = /^(\+201|01|00201)[0-2,5]{1}[0-9]{8}$/;

// interface FormValues {
//   name: string;
//   email: string;
//   phone: string;
//   address: string;
// }

// export default function ProfilePage() {
//   const { user, loading, setUser } = useAuth();
//   const router = useRouter();

//   const validationSchema = Yup.object({
//     name: Yup.string().trim().min(2, "Name is too short").required("Name is required"),
//     email: Yup.string().email("Invalid email").required("Email is required"),
//     phone: Yup.string().matches(phoneRegex, "Invalid phone number").required("Phone is required"),
//     address: Yup.string().max(200, "Address is too long").nullable(),
//   });

//   const initialValues = {
//     name: user?.name ?? "",
//     email: user?.email ?? "",
//     phone: user?.phone ?? "",
//     address: user?.address ?? "",
//   };

//   const handleSubmit = async (values: FormValues) => {
//     try {
//       const res = await updateMeApi(user?._id as string, values);
//       const updatedUser: User = res.user;
//       setUser(updatedUser);
//       toast.success("Profile updated successfully");
//       router.back();
//     } catch (err) {
//       const error = err as AxiosError<{ message?: string }>;
//       toast.error(error.response?.data?.message || "Failed to update profile");
//     }
//   };

//   if (loading) {
//     return (
//       <main className="min-h-svh flex items-center justify-center">
//         <div className="text-muted-foreground">Loading...</div>
//       </main>
//     );
//   }

//   if (!user) {
//     return (
//       <main className="min-h-svh flex items-center justify-center">
//         <div className="text-muted-foreground">Please log in to view this page.</div>
//       </main>
//     );
//   }

//   return (
//     <main className="min-h-svh bg-background">
//       <PatternBG />
//       <section className="container mt-18 flex justify-center items-center min-h-svh">
//         <Formik
//           enableReinitialize
//           initialValues={initialValues}
//           validationSchema={validationSchema}
//           onSubmit={handleSubmit}>
//           {({ values, errors, touched, handleChange, handleBlur, isSubmitting }) => (
//             <Form className="w-xl space-y-5 bg-card border border-border rounded-2xl p-6 shadow-sm z-10">
//               {/* Name Field */}
//               <div>
//                 <label className="block mb-1 text-sm text-muted-foreground">Name</label>
//                 <input
//                   type="text"
//                   name="name"
//                   className="w-full h-10 px-3 rounded-lg border bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:bg-background focus:ring-4 focus:ring-ring transition"
//                   value={values.name}
//                   onChange={handleChange}
//                   onBlur={handleBlur}
//                   placeholder="Your name"
//                 />
//                 {touched.name && errors.name && <FormError error={errors.name} />}
//               </div>

//               {/* Email Field */}
//               <div>
//                 <label className="block mb-1 text-sm text-muted-foreground">Email</label>
//                 <input
//                   type="email"
//                   name="email"
//                   className="w-full h-10 px-3 rounded-lg border bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:bg-background focus:ring-4 focus:ring-ring transition"
//                   value={values.email}
//                   onChange={handleChange}
//                   onBlur={handleBlur}
//                   placeholder="you@example.com"
//                 />
//                 {touched.email && errors.email && <FormError error={errors.email} />}
//               </div>

//               {/* Phone Field */}
//               <div>
//                 <label className="block mb-1 text-sm text-muted-foreground">Phone</label>
//                 <input
//                   type="text"
//                   name="phone"
//                   className="w-full h-10 px-3 rounded-lg border bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:bg-background focus:ring-4 focus:ring-ring transition"
//                   value={values.phone}
//                   onChange={handleChange}
//                   onBlur={handleBlur}
//                   placeholder="+2010XXXXXXXX"
//                 />
//                 {touched.phone && errors.phone && <FormError error={errors.phone} />}
//               </div>

//               {/* Address Field */}
//               <div>
//                 <label className="block mb-1 text-sm text-muted-foreground">Address</label>
//                 <textarea
//                   name="address"
//                   className="w-full min-h-24 p-3 rounded-lg border bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:bg-background focus:ring-4 focus:ring-ring transition"
//                   value={values.address}
//                   onChange={handleChange}
//                   onBlur={handleBlur}
//                   placeholder="Street, City"
//                 />
//                 {touched.address && errors.address && <FormError error={errors.address} />}
//               </div>

//               {/* Readonly isAdmin */}
//               <div className="flex items-center justify-between bg-muted/50 rounded-lg p-3">
//                 <span className="text-sm text-muted-foreground">Role</span>
//                 <span
//                   className={`px-3 py-1 rounded-full text-sm ${
//                     user.isAdmin ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"
//                   }`}>
//                   {user.isAdmin ? "Admin" : "User"}
//                 </span>
//               </div>

//               <div className="pt-2 flex gap-3">
//                 <Button type="submit" className="px-6" disabled={isSubmitting}>
//                   {isSubmitting ? "Saving..." : "Save Changes"}
//                 </Button>
//               </div>
//             </Form>
//           )}
//         </Formik>
//       </section>
//     </main>
//   );
// }
// src/app/[locale]/profile/edit/page.tsx
"use client";

import { Formik, Form } from "formik";
import * as Yup from "yup";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { updateMeApi } from "@/api/user";
import type { User } from "@/types/types";
import PatternBG from "@/components/ui/pattern-bg/PatternBG";
import { useRouter } from "next/navigation";
import InputField from "@/components/ui/InputField";
import TextAreaField from "@/components/ui/TextareaField";

const phoneRegex = /^(\+201|01|00201)[0-2,5]{1}[0-9]{8}$/;

interface FormValues {
  name: string;
  email: string;
  phone: string;
  address: string;
}

const validationSchema = Yup.object({
  name: Yup.string().trim().min(2, "Name is too short").required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone: Yup.string().matches(phoneRegex, "Invalid phone number").required("Phone is required"),
  address: Yup.string().max(200, "Address is too long").nullable(),
});

export default function ProfilePage() {
  const { user, loading, setUser } = useAuth();
  const router = useRouter();

  const initialValues: FormValues = {
    name: user?.name ?? "",
    email: user?.email ?? "",
    phone: user?.phone ?? "",
    address: user?.address ?? "",
  };

  const handleSubmit = async (values: FormValues) => {
    try {
      // ✅ ربط مع الباك إند
      const res = await updateMeApi(user?._id as string, values);
      const updatedUser: User = res.user;

      // ✅ تحديث الكونتكست
      setUser(updatedUser);

      toast.success("Profile updated successfully");
      router.back();
    } catch (err) {
      const error = err as AxiosError<{ message?: string }>;
      toast.error(error.response?.data?.message || "Failed to update profile");
    }
  };

  if (loading) {
    return (
      <main className="min-h-svh flex items-center justify-center">
        <div className="text-muted-foreground">Loading...</div>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="min-h-svh flex items-center justify-center">
        <div className="text-muted-foreground">Please log in to view this page.</div>
      </main>
    );
  }

  return (
    <main className="min-h-svh bg-background">
      <PatternBG />
      <section className="container mt-18 flex justify-center items-center min-h-svh">
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}>
          {({ isSubmitting }) => (
            <Form className="w-xl space-y-5 bg-card border border-border rounded-2xl p-6 shadow-sm z-10">
              {/* Reusable Input Fields */}
              <InputField name="name" label="Name" placeholder="Your name" />
              <InputField name="email" label="Email" type="email" placeholder="you@example.com" />
              <InputField name="phone" label="Phone" placeholder="+2010XXXXXXXX" />

              {/* Address as textarea */}
              <TextAreaField name="address" label="Address" placeholder="Street, City" />

              {/* Role */}
              <div className="flex items-center justify-between bg-muted/50 rounded-lg p-3">
                <span className="text-sm text-muted-foreground">Role</span>
                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    user.isAdmin ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"
                  }`}>
                  {user.isAdmin ? "Admin" : "User"}
                </span>
              </div>

              {/* Actions */}
              <div className="pt-2 flex gap-3">
                <Button type="submit" className="px-6" disabled={isSubmitting}>
                  {isSubmitting ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </section>
    </main>
  );
}
