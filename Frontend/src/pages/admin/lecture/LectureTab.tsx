import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { useDeleteLectureMutation, useEditLectureMutation, useGetLectureByIdQuery } from "@/features/api/courseApi";
import { Label } from "@radix-ui/react-label";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

const MEDIA_API = "http://localhost:8080/api/v1/media";
const LectureTab = () => {
  const [lectureTitle, setLectureTitle] = useState("");
  const [uploadVideoInfo, setUploadVideoInfo] = useState({
    videoUrl: "",
    publicId: ""
  });
  const ref=useRef<HTMLButtonElement | null>(null);
  const [isPreviewFree, setisPreviewFree] = useState(false);
  const [mediaProgress, setMediaProgress] = useState(false);
  const [uploadProgess, setUploadProgress] = useState(0);
  const [btnDisable, setBtnDisable] = useState(true);
  const {courseId,lectureId}=useParams();
  const [editLecture,{data,error,isLoading,isSuccess}]=useEditLectureMutation();
  const editLectureHandler= async ()=>{
    console.log(isPreviewFree,uploadVideoInfo)
    console.log({data: {isPreviewFree:isPreviewFree,videoInfo:uploadVideoInfo,lectureTitle:lectureTitle},courseId:courseId,lectureId:lectureId});
    await editLecture({data: {isPreviewFree:isPreviewFree,videoInfo:uploadVideoInfo,lectureTitle:lectureTitle},courseId:courseId,lectureId:lectureId});
  }
  useEffect(()=>{
    if(isSuccess){
      toast.success(data.message||"Lecture Updated Success!!");
    }
    if(error){
      toast.error("Lecture Could not be updated");
    }
  },[isSuccess,error,data])

  
  const fileChangeHandler = async (e:any) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      setMediaProgress(true);
      try {
        const res = await axios.post(`${MEDIA_API}/upload-video`, formData, {
          onUploadProgress: ({ loaded, total }: any) => {
            setUploadProgress(Math.round((loaded * 100) / total));
          },
        });
        if (res.data.success) {
          setUploadVideoInfo({
            videoUrl: res.data.data.url,
            publicId: res.data.data.public_id,
          });
          setBtnDisable(false);
          toast.success(res.data.message);
        }
      } catch (e) {
        console.log(e);
        toast.error("video upload failed");
      } finally {
        setMediaProgress(false);
      }
    }
  };
  const navigate=useNavigate();
  const [deleteLecture,{data:removedData,isLoading:deleteIsLoading,isSuccess:deleteIsSuccess}]=useDeleteLectureMutation()
  useEffect(()=>{
    if(deleteIsSuccess){
      toast.success(removedData.message);
      navigate(`/admin/course/${courseId}/lecture`)
    }
    
  },[deleteIsLoading,deleteIsSuccess])
  
  const removeLectureHandler=async()=>{
    await deleteLecture(lectureId);
  }
  const {data:lectureData}=useGetLectureByIdQuery(lectureId);
  const lecture=lectureData?.lecture;
  useEffect(()=>{
    if(lecture){
      if(typeof lecture.lectureTitle!='undefined')setLectureTitle(lecture.lectureTitle);
      if(typeof lecture.isPreviewFree!='undefined'){
        ref?.current?.click();
        setisPreviewFree(lecture.isPreviewFree);
      }
      if(typeof lecture.videoInfo!='undefined')setUploadVideoInfo(lecture.videoInfo);
    }
  },[lecture])
  return (
    <Card>
      <CardHeader className="flex justify-between">
        <div>
          <CardTitle>Edit Lecture</CardTitle>
          <CardDescription>Make changes and Save when done.</CardDescription>
        </div>
        <div>
          <Button disabled={deleteIsLoading} onClick={removeLectureHandler} className="flex items-center gap-2" variant={"destructive"}>
            {
              deleteIsLoading?<>
              <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
              Please wait
              </>:"Remove Lecture"
            }
  
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div>
          <Label>Title</Label>
          <Input onChange={(e)=>setLectureTitle(e.target.value)} value={lectureTitle} type="text" placeholder="eg.Advanced Mongo Db Part-1" />
        </div>
        <div className="my-5">
          <Label>
            Video<span className="text-red-600">*</span>
          </Label>
          <Input onChange={fileChangeHandler} type="file" className="w-fit" accept="video/*" />
        </div>
        <div className="flex items-center space-x-2 my-5">
          <Switch ref={ref} onClick={()=>setisPreviewFree(!isPreviewFree)} id="airplane-mode" />
          <Label>Is this Video Free ?</Label>
        </div>
        {mediaProgress && (
          <div className="my-4">
            <Progress value={uploadProgess} />
            <p>{uploadProgess}% uploaded</p>
          </div>
        )}
        <div className="mt-4">
          <Button disabled={isLoading || mediaProgress} onClick={editLectureHandler}>
            {
              (isLoading || mediaProgress )?<>
              <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
              Please wait
              </>:"Update Lecture"
            }
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default LectureTab;
