import { FiSettings } from "react-icons/fi";
import { Button } from "./ui/button";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { LuBook } from "react-icons/lu";

const SignInSchema = Yup.object().shape({
  firstName: Yup.string().min(3, "First name must be at least 3 characters"),
  lastName: Yup.string().min(3, "Last name must be at least 3 characters"),
  email: Yup.string().email("Invalid email"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const Profile = () => {
  return (
    <div className="border shadow p-4 rounded-lg flex flex-col gap-4">
      <div className="flex gap-2 items-center text-slate-1000 text-lg">
        <FiSettings />
        <h1>Profile Information</h1>
      </div>

      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={SignInSchema}
        onSubmit={async (values, { setSubmitting }) => {
          console.log("Form data:", values);
          // try {
          //   const response = await axios.post(`${url}/api/user/login`, values);
          //   localStorage.setItem("token", response.data.token);
          //   navigate("/dashboard");
          //   console.log("Sign in successful:", response.data);
          // } catch (error) {
          //   console.log(error);
          // } finally {
          //   setSubmitting(false);
          // }
        }}
      >
        <Form className="space-y-6">
          <div className="flex gap-4">
            <div className="w-full">
              <label htmlFor="firstName" className="block text-sm font-medium">
                First Name
              </label>
              <Field
                name="firstName"
                type="text"
                placeholder="Enter your first name"
                className="mt-1 w-full border border-gray-300 px-3 py-2 rounded-md "
              />
              <ErrorMessage
                name="firstName"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div className="w-full">
              <label htmlFor="lastName" className="block text-sm font-medium">
                Last Name
              </label>
              <Field
                name="lastName"
                type="text"
                placeholder="Enter your last name"
                className="mt-1 w-full border border-gray-300 px-3 py-2 rounded-md "
              />
              <ErrorMessage
                name="lastName"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-full">
              <label htmlFor="firstName" className="block text-sm font-medium">
                State/Region
              </label>
              <Field
                name="firstName"
                type="text"
                placeholder="Country, State, Region.."
                className="mt-1 w-full border border-gray-300 px-3 py-2 rounded-md "
              />
              <ErrorMessage
                name="firstName"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div className="w-full">
              <label htmlFor="lastName" className="block text-sm font-medium">
                City
              </label>
              <Field
                name="lastName"
                type="text"
                placeholder="City"
                className="mt-1 w-full border border-gray-300 px-3 py-2 rounded-md "
              />
              <ErrorMessage
                name="lastName"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
          </div>
        </Form>
      </Formik>

      <div className="flex gap-2 items-center text-slate-1000 text-lg">
        <LuBook />
        <h1>Preferences </h1>
      </div>

      <div className="flex gap-4">
        <div>
          <label htmlFor="genre" className="block text-sm font-medium">
            Preferred Genre
          </label>
          <select
            id="genre"
            name="genre"
            className="mt-1 p-2 border block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="">Select a genre</option>
            <option value="fiction">Fiction</option>
            <option value="non-fiction">Non-Fiction</option>
            <option value="romance">Romance</option>
            <option value="sci-fi">Science Fiction</option>
            <option value="fantasy">Fantasy</option>
            <option value="mystery">Mystery</option>
            <option value="history">History</option>
            <option value="biography">Biography</option>
            <option value="self-help">Self-Help</option>
            <option value="children">Children</option>
          </select>
        </div>

        <div>
          <label htmlFor="genre" className="block text-sm font-medium">
            Preferred Price
          </label>
          <select
            id="genre"
            name="genre"
            className="mt-1 p-2 border block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="">Select price range</option>
            <option value="below-500">{"<500"}</option>
            <option value="below-300">{"<300"}</option>
            <option value="below-100">{"<100"}</option>
            <option value="abpve-500">{">500"}</option>
          </select>
        </div>
      </div>

      <Button className="w-full bg-amber-600 hover:bg-amber-600 cursor-pointer">
        Submit
      </Button>
    </div>
  );
};

export default Profile;
