import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLoginUserMutation, useRegisterUserMutation } from "@/features/api/authApi";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";


export function Login() {
  const [loginInput, setLoginInput] = useState({ email: "", password: "" });
  const [signupInput, setSignupInput] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [registerUser,{data:registerData,error:registerError,isLoading:registerIsLoading,isSuccess:registerIsSuccess}]=useRegisterUserMutation();
  const [loginUser,{isSuccess:loginIsSuccess,data:loginData,error:loginError,isLoading:loginIsLoading}]=useLoginUserMutation();
  const changeInputHandler=(e:React.ChangeEvent<HTMLInputElement>,type:string)=>{
    const {name,value}=e.target;
    if(type==="signup"){
      setSignupInput({...signupInput,[name]:value});
    }else if(type==="login"){
      setLoginInput({...loginInput,[name]:value});
    }
  }
  const handleSubmit=async (type:string)=>{
    const inputData=type==="signup"?signupInput:loginInput;
    const action=type==="signup"?registerUser:loginUser;
    await action(inputData);
  }
  useEffect(()=>{
    if(registerIsSuccess && registerData){
      toast.success(registerData.message || "Signup Successfull.");
    }
    if(registerError){
      //@ts-ignore
      toast.error(registerError.data.message || "Signup Failed");
    }
    if(loginIsSuccess && loginData){
      toast.success(loginData.message || "Login Successfull.");
    }
    if(loginError){
      //@ts-ignore
      toast.error(loginError.data.message || "login Failed");
    }
  },[loginIsLoading,registerIsLoading,loginData,registerData,loginError,registerError])
  return (
    <div className="flex items-center w-full justify-center mt-20">
      <Tabs defaultValue="account" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="signup">Signup</TabsTrigger>
          <TabsTrigger value="login">Login</TabsTrigger>
        </TabsList>
        <TabsContent value="signup">
          <Card>
            <CardHeader>
              <CardTitle>Signup</CardTitle>
              <CardDescription>
                Signup Here to get Your Journey Started.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="name">Name</Label>
                
                <Input name="name" value={signupInput.name} onChange={(e)=>{
                  changeInputHandler(e,"signup")
                }} type="text" placeholder="Enter Your Name" required />
              </div>
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input name="email" value={signupInput.email} onChange={(e)=>{
                  changeInputHandler(e,"signup")
                }} 
                  type="email" placeholder="Enter Your Email" required />
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <Input
                name="password" value={signupInput.password} onChange={(e)=>{
                  changeInputHandler(e,"signup")
                }} 
                  type="password"
                  placeholder="Enter Your Password"
                  required
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={()=> handleSubmit("signup")}>
                {registerIsLoading?(
                  <>
                  <Loader2 className=" mr-2 h-4 w-4 animate-spin"/>Please Wait
                  </>
                ): "Signup"
                }
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="login">
          <Card>
            <CardHeader>
              <CardTitle>Login</CardTitle>
              <CardDescription>Login Into Your Account.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input name="email" value={loginInput.email} onChange={(e)=>{
                  changeInputHandler(e,"login")
                }}  type="email" placeholder="Enter Your Email" required />
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <Input name="password" value={loginInput.password} onChange={(e)=>{
                  changeInputHandler(e,"login")
                }}  placeholder="Enter Your Password" type="password" />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={()=> handleSubmit("login")}>
              {loginIsLoading?(
                  <>
                  <Loader2 className=" mr-2 h-4 w-4 animate-spin"/>Please Wait
                  </>
                ): "Login"
                }
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
export default Login;
