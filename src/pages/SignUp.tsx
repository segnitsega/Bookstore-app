import { Button } from "@/components/ui/button";
import { ErrorMessage, Field, Formik, Form } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";

const SignUpSchema = Yup.object().shape({
  fullName: Yup.string()
    .min(3, "Name must be at least 3 characters")
    .required("Full name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
});

const SignUp = () => {
  return (
    <div className="h-screen flex items-center mb-10  justify-center ">
      <div className=" border border-gray-300 rounded-lg p-6 shadow w-[500px]">
        <div className="flex flex-col items-center mb-6">
          <h1 className="text-amber-900 text-3xl font-bold mb-2">
            Create Account
          </h1>
          <span className="text-gray-500">
            Join BookHub to start your reading journey
          </span>
        </div>

        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={SignUpSchema}
          onSubmit={(values) => {
            console.log("Form data:", values);
            // Handle sign-in logic here
          }}
        >
          <Form className="space-y-6">
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium">
                Full Name
              </label>
              <Field
                name="fullName"
                type="text"
                className="mt-1 w-full border border-amber-300 px-3 py-1 rounded-md "
              />
              <ErrorMessage
                name="fullName"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium">
                Email
              </label>
              <Field
                name="email"
                type="email"
                className="mt-1 w-full border border-amber-300 px-3 py-1 rounded-md "
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium">
                Password
              </label>
              <Field
                name="password"
                type="password"
                className="mt-1 w-full border border-amber-300 px-3 py-1 rounded-md"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium">
                Confirm Password
              </label>
              <Field
                name="confirmPassword"
                type="password"
                className="mt-1 w-full border border-amber-300 px-3 py-1 rounded-md"
              />
              <ErrorMessage
                name="confirmPassword"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-amber-600 hover:bg-amber-600 cursor-pointer"
            >
              Sign In
            </Button>
          </Form>
        </Formik>

        <div className="flex flex-col gap-2 mt-2 items-center ">
          <span className="text-amber-600 text-sm cursor-pointer">
            Forgot your password?
          </span>
          <span className="text-gray-500 text-sm">
            Already have an account?
            <Link to="/signin" className="text-amber-600 cursor-pointer"> Sign In</Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
