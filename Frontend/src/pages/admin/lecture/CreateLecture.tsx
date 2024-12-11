import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  useCreateLectureMutation,
  useGetCourseLectureQuery,
} from "@/features/api/courseApi";
import { Label } from "@radix-ui/react-label";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import Lecture from "./Lecture";

const CreateLecture = () => {
  const params = useParams();
  const courseId = params.courseId;

  const [lectureTitle, setLectureTitle] = useState("");
  const navigate = useNavigate();
  const [createLecture, { data, isLoading, error, isSuccess }] =
    useCreateLectureMutation();
  const createLectureHandler = async () => {
    await createLecture({ lectureTitle, courseId });
  };
  useEffect(() => {
    if (isSuccess) {
      refetch();
      toast.success(data.message);
    }
    if (error) {
      //@ts-ignore
      toast.error(error.data.message);
    }
  }, [isSuccess, error]);
  const {
    data: lectureData,
    isLoading: lectureLoading,
    isError: lectureError,
    refetch
  } = useGetCourseLectureQuery(courseId);
  console.log(lectureData);

  return (
    <div className="flex-1 mx-10">
      <div className="mb-4">
        <h1 className="font-bold text-xl">Lets add Lectures.</h1>
        <p className="text-sm">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deleniti,
          veniam.
        </p>
      </div>
      <div className="space-y-4">
        <div>
          <Label>Title</Label>
          <Input
            type="text"
            name="lectureTitle"
            value={lectureTitle}
            onChange={(e) => setLectureTitle(e.target.value)}
            placeholder="Your Lecture  title"
          />
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant={"outline"}
            onClick={() => navigate(`/admin/course/${courseId}`)}
          >
            Back to Course
          </Button>
          <Button disabled={isLoading} onClick={createLectureHandler}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-r animate-spin" />
              </>
            ) : (
              "Create lecture"
            )}
          </Button>
        </div>
        <div className="mt-10">
          {lectureLoading ? (
            <p>Loading Lecture..</p>
          ) : lectureError ? (
            <p>Failed to load Lectures.</p>
          ) : lectureData.lectures.length === 0 ? (
            <p>No Lecture Available</p>
          ) : (
            lectureData.lectures.map((lecture:any,index:number)=>(
              <Lecture key={lecture._id} lecture={lecture} courseId={courseId} index={index}/>
            ))
            
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateLecture;
