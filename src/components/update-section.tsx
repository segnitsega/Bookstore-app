import { Input } from "@/components/ui/input"
import { Button } from "./ui/button";


const UpdateSection = () => {
  return (
    <div className="bg-amber-600 text-white flex flex-col items-center py-2 md:py-10 gap-4 md:gap-6 mx-8 rounded-lg">
        <h1 className="font-bold text-lg md:text-3xl">Stay Updated</h1>
        <p className="text-center">Get notified about new arrivals, special offers, and reading recommendations.</p>
        <div className="flex flex-col md:flex-row gap-2 md:gap-6">
            <Input className="border border-amber-200 bg-white text-black" placeholder="Email"/>
            <Button className="bg-white text-amber-500 border-2 border-amber-600 hover:text-white hover:border-white hover:bg-amber-600 cursor-pointer">Subscribe</Button>
        </div>
    </div>
  )
}

export default UpdateSection