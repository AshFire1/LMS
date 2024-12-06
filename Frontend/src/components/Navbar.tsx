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

const Navbar = () => {
  const user: boolean = false;
  return (
    <div className="h-16 dark:bg-[#0A0A0A] bg-white border -b dark:border-b-gray-800 border-b-gray-200 fixed top-0 left-0 right-0 duration-300 z-10">
      <div className="max-w-7xl mx-auto hidden md:flex justify-between items-center gap-10 h-full">
        <div className="flex items-center gap-2">
          <School size={"30"} />
          <h1 className="hidden md:block font-extrabold text-2xl">
            E-learning
          </h1>
        </div>
        {/* User icons and dark mode icon */}
        <div className="flex items-center gap-6">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>My learning</DropdownMenuItem>
                <DropdownMenuItem>Edit Profile</DropdownMenuItem>
                <DropdownMenuItem>Logout</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Dashboard</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant={"outline"}>Login</Button>
              <Button variant={"outline"}>Signup</Button>
            </div>
          )}
          <Darkmode />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
