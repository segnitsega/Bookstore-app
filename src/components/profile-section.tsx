import { FiSettings} from "react-icons/fi";
import { Input } from "@/components/ui/input"
import { Button } from "./ui/button";

const Profile = () => {
  return (
    <div className="border shadow p-4 rounded-lg flex flex-col gap-4">
        <div className="flex gap-2 items-center text-slate-1000 text-lg">
            <FiSettings />
            <h1>Profile Information</h1>
        </div>

        <div className="text-slate-1000 text-sm">
            <h1>Full Name</h1>
            <Input placeholder="John Doe"/>
        </div>
        <div className="text-slate-1000 text-sm">
            <h1>Email</h1>
            <Input placeholder="john.doe@example.com"/>
        </div>

        <Button className="bg-amber-500 border hover:border-blue-500 hover:bg-amber-500 cursor-pointer w-40">Save Changes</Button>
        
    </div>
  )
}

export default Profile