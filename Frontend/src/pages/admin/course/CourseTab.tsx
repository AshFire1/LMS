import RichTextEditor from "@/components/RichTextEditor";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from "@/components/ui/select";
import { useDeleteCourseByIdMutation, useEditCourseMutation, useGetCourseByIdQuery, usePublishCourseMutation } from "@/features/api/courseApi";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

const CourseTab = () => {
  const [input, setInput] = useState({
    courseTitle: "",
    subTitle: "",
    description: "",
    category: "",
    courseLevel: "",
    coursePrice: "",
    courseThumbnail: "",
  });
  const [editCourse, { data, isLoading, isSuccess, error }] =
    useEditCourseMutation();
  const [previewThumbnail, setPreviewThumbnail] = useState("");
  const navigate = useNavigate();
 
  const changeEventHandler = (e: any) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
    console.log(input);
  };
  const params=useParams();
  const courseId=params.courseId;
  const {data:courseByIdData,isLoading:courseByIdLoading,refetch}= useGetCourseByIdQuery(courseId,{refetchOnMountOrArgChange:true});

  useEffect(()=>{
    if(courseByIdData?.course){
      const course=courseByIdData?.course;
      setInput({
        courseTitle: course.courseTitle,
        subTitle:course.subTitle,
        description: course.description,
        category:course.category,
        courseLevel: course.courseLevel,
        coursePrice:course.coursePrice,
        courseThumbnail:course.courseThumbnail,
      });
      setIsPublished(courseByIdData.course.isPublished)

    }
  },[courseByIdData]) 
  const selectThumbnail = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      setInput({ ...input, courseThumbnail: file });
      const fileReader = new FileReader();
      //@ts-ignore
      fileReader.onloadend = () => setPreviewThumbnail(fileReader.result);
      fileReader.readAsDataURL(file);
    }
  };
  const updateCourseHandler = async () => {
    const formdata = new FormData();
    formdata.append("courseTitle", input.courseTitle);
    formdata.append("subTitle", input.subTitle);
    formdata.append("description", input.description);
    formdata.append("category", input.category);
    formdata.append("courseLevel", input.courseLevel);
    formdata.append("coursePrice", input.coursePrice);
    formdata.append("courseThumbnail", input.courseThumbnail);
   await editCourse({data:formdata,courseId:courseId});
  };
  const [publishCourse,{}]=usePublishCourseMutation();
  const publishStatusHandler=async (query:string)=>{
    try{
      const response=await publishCourse({courseId:courseId,query:query});
      if(response.data){
        toast.success(response.data.message);
        refetch();
      }
    }catch(e){
      toast.error("Failed to Publish or Unpublish Course")

    }
  }
  const [deleteCourse,{isLoading:isDeleting,isSuccess:deletedSuccess,isError:deleteError}]=useDeleteCourseByIdMutation()
  useEffect(()=>{
    if(deletedSuccess){
      navigate("/admin/course")
      toast.success("Course Removed!")
    }
    if(deleteError){
      toast.error("Course Could not be removed")
    }
  },[isDeleting,deletedSuccess,deleteError])
  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message || "Course Updated");
    }
    if (error) {
      //@ts-ignore
      toast.error(error.data.message || "Failed to upated course");
    }
  }, [isSuccess, error]);
  const [isPublished,setIsPublished] = useState<Boolean>(false);
  if(courseByIdLoading)return <Loader2 className="h-4 w-4 animate-spin"/>
  return (
    <Card>
      <CardHeader className="flex flex-row justify-between">
        <div>
          <CardTitle>Basic Course Information</CardTitle>
          <CardDescription>
            Make changes,Click Save when you are done.
          </CardDescription>
        </div>
        <div className="space-x-2">
          <Button disabled={courseByIdData.course.lectures.length===0} variant={"outline"} onClick={()=>publishStatusHandler(courseByIdData.course.isPublished ? "false":"true")}>
            {isPublished ? "Unpublish" : "Publish"}
          </Button>
          <Button onClick={()=>deleteCourse(courseId)}>Remove Course</Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 mt-5">
          <div>
            <Label>Course Title</Label>
            <Input
              type="text"
              name="courseTitle"
              value={input.courseTitle}
              onChange={changeEventHandler}
              placeholder="Ex. Fullstack development"
            />
          </div>
          <div>
            <Label>Sub Title</Label>
            <Input
              type="text"
              name="subTitle"
              value={input.subTitle}
              onChange={changeEventHandler}
              placeholder="Ex. Become a fullstack developer Zero to hero"
            />
          </div>
          <div>
            <Label>Description</Label>
            <RichTextEditor input={input} setInput={setInput} />
          </div>
          <div className="flex items-center gap-5">
            <div>
              <Label>Category</Label>
              <Select
                onValueChange={(val) => setInput({ ...input, category: val })}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Category</SelectLabel>
                    <SelectItem value="Next JS">Next JS</SelectItem>
                    <SelectItem value="Data Science">Data Science</SelectItem>
                    <SelectItem value="Frontend Development">
                      Frontend Development
                    </SelectItem>
                    <SelectItem value="Fullstack Development">
                      Fullstack Development
                    </SelectItem>
                    <SelectItem value="MERN Stack Development">
                      MERN Stack Development
                    </SelectItem>
                    <SelectItem value="Javascript">Javascript</SelectItem>
                    <SelectItem value="Python">Python</SelectItem>
                    <SelectItem value="Docker">Docker</SelectItem>
                    <SelectItem value="MongoDB">MongoDB</SelectItem>
                    <SelectItem value="HTML">HTML</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Course Level</Label>
              <Select
                onValueChange={(val) =>
                  setInput({ ...input, courseLevel: val })
                }
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a course level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Course Level</SelectLabel>
                    <SelectItem value="Beginner">Beginner</SelectItem>
                    <SelectItem value="Intermediate">Intermediate</SelectItem>
                    <SelectItem value="Advanced">Advanced</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label> Price in (INR)</Label>
              <Input
                type="number"
                name="coursePrice"
                value={input.coursePrice}
                onChange={changeEventHandler}
                placeholder="199"
                className="w-fit"
              />
            </div>
          </div>
        </div>
        <div>
          <Label>Course Thumbail</Label>
          <Input
            onChange={selectThumbnail}
            type="file"
            accept="image/*"
            className="w-fit"
          />
          {previewThumbnail ? (
            <img
              src={previewThumbnail}
              className="e-64 my-2"
              alt="Course Thumbnail"
            />
          ) : (
            ""
          )}
        </div>
        <div>
          <Button onClick={() => navigate("/admin/course")} variant="outline">
            Cancel
          </Button>
          <Button disabled={isLoading || isDeleting} onClick={updateCourseHandler}>
            {isLoading ||isDeleting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </>
            ) : (
              "Save"
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseTab;
