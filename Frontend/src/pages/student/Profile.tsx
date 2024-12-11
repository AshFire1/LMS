import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import Course from "./Course";
import { useGetUserQuery, useUpdateUserMutation } from "@/features/api/authApi";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const Profile = () => {
  const [name, setName] = useState("");
  const [profilePhoto, setProfilePhoto] = useState("");

  //@ts-ignore
  const { data, isLoading,refetch } = useGetUserQuery();
  const [
    updateUser,
    { data: updateUserData, isLoading: updateUserIsLoading,isError, error,isSuccess },
  ] = useUpdateUserMutation();  

  const [enrolledCourses,setEnrolledCoursses]=useState([]);
  const onChangeHandler = (e: any) => {
    const file = e.target.files?.[0];
    if (file) setProfilePhoto(file);
  };
  const updateUserHandler = async () => {
    const formData=new FormData();
    formData.append("name",name);
    formData.append("profilePhoto",profilePhoto);
    await updateUser(formData);
  };
  useEffect(()=>{
    if(isSuccess){
      refetch();
      toast.success(data.message ||"Profile Updated.")
    }
    if(isError){
      toast.error(data.message ||"Profile update failed.")
    }
  },[error,updateUserData,isSuccess,isError])
  useEffect(()=>{
    if(!isLoading){
      console.log(data);
      setEnrolledCoursses(data.user.enrolledCourses)
      console.log(enrolledCourses);
    }
  },[isLoading,data])
  const  user  = data && data.user;
  if (isLoading) return <h1>Profile Loading </h1>;
  return (
    <div className="my-24 max-w-4xl mx-auto px-4 ">
      <h1 className="font-bold text-2xl text-center md:text-left">PROFILE</h1>
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8 my-5">
        <div className="flex flex-col items-center ">
          <Avatar className="h-24 w-24 md:h-32 md:w-32 mb-4">
            <AvatarImage
              src={user.photoUrl || "https://github.com/shadcn.png"}
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
        <div>
          <div className="mb-2">
            <h1 className="font-semibold text-gray-900 dark:text-gray-100 ">
              Name:
              <span className="font-normal text-gray-700 dark:text-gray-300 ml-2">
                {" "}
                {user.name}{" "}
              </span>
            </h1>
          </div>
          <div className="mb-2">
            <h1 className="font-semibold text-gray-900 dark:text-gray-100 ">
              Email:
              <span className="font-normal text-gray-700 dark:text-gray-300 ml-2">
                {" "}
                {user.email}{" "}
              </span>
            </h1>
          </div>
          <div className="mb-2">
            <h1 className="font-semibold text-gray-900 dark:text-gray-100 ">
              Role:
              <span className="font-normal text-gray-700 dark:text-gray-300 ml-2">
                {" "}
                {user.role.toUpperCase()}{" "}
              </span>
            </h1>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button size={"sm"} className="mt-2">
                Edit Profile
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Profile</DialogTitle>
                <DialogDescription>
                  Make Changes to your Profile here.Click Save when Done.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label> Name</Label>
                  <Input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label>Profile Photo</Label>
                  <Input
                    onChange={onChangeHandler}
                    type="file"
                    accept="image/*"
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button disabled={updateUserIsLoading} onClick={updateUserHandler}>
                  {updateUserIsLoading   ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please
                      wait
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div>
        <h1 className="font-medium text-lg">Courses you are enrolled in </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 my-5">
          {user.enrolledCourses.length === 0 ? (
            <h1>You Haven't enrolled in any course</h1>
          ) : (
            //@ts-ignore
            enrolledCourses?.map((course,index) => <Course course={course} key={index} />)
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;