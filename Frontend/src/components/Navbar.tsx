import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { School } from "lucide-react";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Darkmode from "@/Darkmode";
import { Link, useNavigate } from "react-router-dom";
import { useLogoutUserMutation } from "@/features/api/authApi";
import { useEffect } from "react";
import { toast } from "sonner";
import { useSelector } from "react-redux";

const Navbar = () => {
  //@ts-ignore
  const {user}=useSelector(store=>store.auth);
  const [logoutUser,{data,isSuccess}]=useLogoutUserMutation();
  const logoutHandler=async()=>{
    await logoutUser({});
  }
  const navigate=useNavigate();

  useEffect(()=>{
    if(isSuccess){
      toast.success(data.message|| "Log Out Done !");
      navigate("/login")
    }
  },[isSuccess])
  return (
    <div className="h-16 dark:bg-[#0A0A0A] bg-white border -b dark:border-b-gray-800 border-b-gray-200 fixed top-0 left-0 right-0 duration-300 z-10">
      <div className="max-w-7xl mx-auto hidden md:flex justify-between items-center gap-10 h-full">
        <Link to={"/"}>
          <div className="flex items-center gap-2">
            <School size={"30"} />
            <h1 className="hidden md:block font-extrabold text-2xl">
              E-learning
            </h1>
          </div>
        </Link>
        
        {/* User icons and dark mode icon */}
        <div className="flex items-center gap-6">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar>
                  <AvatarImage src={user?.photoUrl || "https://github.com/shadcn.png"} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem><Link to={"my-learning"}>My learning</Link></DropdownMenuItem>
                <DropdownMenuItem><Link to={"profile"}>Edit Profile</Link></DropdownMenuItem>
                <DropdownMenuItem onClick={logoutHandler}>Logout</DropdownMenuItem>
                {
                  user.role==="instructor" &&(
                    <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={()=>navigate("/admin/dashboard")}>Dashboard</DropdownMenuItem>
                    </>
                  )
                }
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant={"outline"} onClick={()=>navigate("/login")}>Login</Button>
              <Button onClick={()=>navigate("/login")} >Signup</Button>
            </div>
          )}
          <Darkmode />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
