import { Button } from "@/components/ui/button";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const SignInSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const SignIn = () => {
  return (
    <div className="h-screen flex items-center -mt-14 justify-center ">
      <div className=" border border-gray-300 rounded-lg p-6 shadow w-[500px]">
        <div className="flex flex-col items-center mb-6">
          <h1 className="text-amber-900 text-3xl font-bold mb-2">Sign In</h1>
          <span className="text-gray-500">Welcome back to BookHub</span>
        </div>

        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={SignInSchema}
          onSubmit={(values) => {
            console.log("Form data:", values);
            // Handle sign-in logic here
          }}
        >
          <Form className="space-y-6">
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

            <Button type="submit" className="w-full bg-amber-600 hover:bg-amber-600 cursor-pointer">
              Sign In
            </Button>
          </Form>
        </Formik>

        <div className="flex flex-col gap-2 mt-2 items-center ">
          <span className="text-amber-600 text-sm cursor-pointer">
            Forgot your password?
          </span>
          <span className="text-gray-500 text-sm">
            Don't have an account? <span className="text-amber-600 cursor-pointer">Sign up</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
