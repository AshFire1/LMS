import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import CourseTab from "./CourseTab"

const EditCourse = () => {
  return (
    <div className="flex-1">
      <div className="flex items-center justify-between mb-5">
        <div>
        <h1 className="font-bold text-xl "> Add details regarding Course.</h1>
        </div>
        
        <Link to="lecture">
        <Button className="hover:text-blue-600" variant={"link"}>Go to lectures page</Button>
        </Link>
      </div>
      <CourseTab/>
    </div>
  )
}

export default EditCourse