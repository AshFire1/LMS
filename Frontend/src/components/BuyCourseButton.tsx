import { useCreateCheckoutSessionMutation } from "@/features/api/purchaseApi"
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { toast } from "sonner";

const BuyCourseButton = ({courseId}:any) => {
  const [createCheckoutSession,{data,isLoading,isSuccess,isError,error}]=useCreateCheckoutSessionMutation();

  const purchaseCourseHandler=async()=>{
    await createCheckoutSession(courseId)
  }
  useEffect(()=>{
    if(isSuccess){
      if(data?.url){
        window.location.href= data.url;

      }else{ 
        toast.error("Invalid response from server")
      }
    }
    if(isError){
      //@ts-ignore
      toast.error(error?.data?.message ||"Failed to create Checkout")
    }
  },[data,isSuccess,isError,error])
  return (
    <Button disabled={isLoading} onClick={purchaseCourseHandler} className="w-full"> 
      {isLoading?(
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
          Please Wait 
        </>
        
      ):"Purchase Course"
      }
    </Button>
  )
}

export default BuyCourseButton