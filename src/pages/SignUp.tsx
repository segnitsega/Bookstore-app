import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { ErrorMessage, Field, Formik, Form } from "formik";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useAuth } from "@/contexts/authContext";

const SignUpSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(3, "First name must be at least 3 characters")
    .required("First name is required"),
  lastName: Yup.string()
    .min(3, "Last name must be at least 3 characters")
    .required("Last name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
});

const SignUp = () => {
  const url = import.meta.env.VITE_BACKEND_API;
  const navigate = useNavigate();
  const { login } = useAuth();
  const [submitError, setSubmitError] = useState("");

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-amber-50 via-white to-white px-4 py-10">
      <div className="w-full max-w-xl rounded-2xl border border-amber-100 bg-white p-6 shadow-xl shadow-amber-100/50 md:p-8">
        <div className="mb-8 space-y-2 text-center">
          <h1 className="text-3xl font-semibold tracking-tight text-gray-900 md:text-4xl">
            Create your account
          </h1>
          <p className="text-sm text-gray-600 md:text-base">
            Start your literary journey with Bookstore today.
          </p>
        </div>

        <Formik
          initialValues={{
            email: "",
            password: "",
            firstName: "",
            lastName: "",
            confirmPassword: "",
          }}
          validationSchema={SignUpSchema}
          onSubmit={async (values, { setSubmitting }) => {
            setSubmitError("");
            try {
              const response = await axios.post(`${url}/user/signup`, values);
              login(response.data.accessToken);
              navigate("/dashboard");
            } catch (error) {
              if (axios.isAxiosError(error)) {
                setSubmitError(
                  error.response?.data?.message ??
                    "Unable to create your account right now. Please try again."
                );
              } else {
                setSubmitError(
                  "Unable to create your account right now. Please try again."
                );
              }
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-5">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="firstName"
                    className="mb-1.5 block text-sm font-medium text-gray-700"
                  >
                    First Name
                  </label>
                  <Field
                    as={Input}
                    name="firstName"
                    type="text"
                    placeholder="Segni"
                    className="h-10 border-gray-300 focus-visible:border-amber-500 focus-visible:ring-amber-200"
                  />
                  <ErrorMessage
                    name="firstName"
                    component="div"
                    className="mt-1 text-sm text-red-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="lastName"
                    className="mb-1.5 block text-sm font-medium text-gray-700"
                  >
                    Last Name
                  </label>
                  <Field
                    as={Input}
                    name="lastName"
                    type="text"
                    placeholder="Tsega"
                    className="h-10 border-gray-300 focus-visible:border-amber-500 focus-visible:ring-amber-200"
                  />
                  <ErrorMessage
                    name="lastName"
                    component="div"
                    className="mt-1 text-sm text-red-500"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-1.5 block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <Field
                  as={Input}
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  className="h-10 border-gray-300 focus-visible:border-amber-500 focus-visible:ring-amber-200"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="mt-1 text-sm text-red-500"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="mb-1.5 block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <Field
                  as={Input}
                  name="password"
                  type="password"
                  placeholder="Create a strong password"
                  className="h-10 border-gray-300 focus-visible:border-amber-500 focus-visible:ring-amber-200"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="mt-1 text-sm text-red-500"
                />
              </div>
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="mb-1.5 block text-sm font-medium text-gray-700"
                >
                  Confirm Password
                </label>
                <Field
                  as={Input}
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  className="h-10 border-gray-300 focus-visible:border-amber-500 focus-visible:ring-amber-200"
                />
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className="mt-1 text-sm text-red-500"
                />
              </div>

              {submitError && (
                <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">
                  {submitError}
                </p>
              )}

              <Button
                type="submit"
                className="h-10 w-full cursor-pointer bg-amber-600 font-medium text-white hover:bg-amber-700"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Creating account..." : "Create account"}
              </Button>
            </Form>
          )}
        </Formik>

        <div className="mt-8 flex flex-col items-center gap-3 border-t border-gray-100 pt-5">
          <span className="text-sm text-gray-600">
            Already have an account?
            <Link
              to="/signin"
              className="ml-1 font-medium text-amber-600 transition-colors hover:text-amber-700"
            >
              Sign In Here
            </Link>
          </span>

          <p className="my-2 text-center text-xs text-gray-500">
            By creating an account, you agree to our{" "}
            <span className="font-medium text-amber-600">Terms of Service</span>{" "}
            and <span className="font-medium text-amber-600">Privacy Policy</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
