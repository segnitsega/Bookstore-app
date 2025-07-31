import SignUp from "./SignUp";
import { LuBookOpen } from "react-icons/lu";

const StartPage = () => {
  return (
    <div className="flex flex-col items-center bg-pink-10">
      <div className="flex flex-col items-center gap-4 mt-2 ">
        <LuBookOpen
          className="bg-amber-100 p-2  text-amber-600 rounded-3xl"
          size={70}
        />
        <h1 className="text-4xl font-bold">Welcome to BookHub</h1>
        <span className="text-gray-500">Join our community of book lovers and discover your next great read</span>
      </div>

        <div className="my-8">
           <SignUp /> 
        </div>

        <p className="mb-2 text-gray-700 text-center">
            ✨ Join thousands of readers who have found their next favorite book with us ✨
        </p>
      
    </div>
  );
};

export default StartPage;
