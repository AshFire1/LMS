import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TableCaption, TableHeader, TableRow, TableHead, TableBody, TableCell, Table, TableFooter } from "@/components/ui/table"
import { useGetCreatorCourseQuery } from "@/features/api/courseApi"
import {  Edit } from "lucide-react"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

const CourseTable = () => {
  const {data,isLoading}=useGetCreatorCourseQuery({});
  console.log(data,isLoading);

  const navigate=useNavigate();
  if(isLoading)<h1>Loading.. </h1>;
  const [courses,setCourses]=useState([]);
  useEffect(()=>{
    if(!isLoading){
      setCourses(data.courses);
    }
  },[isLoading])
  return (
    <div>
      <Button onClick={()=> navigate('create')}>Create a new course!</Button>
      <Table>
      <TableCaption>A list of your Courses.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Price</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Title</TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {courses.map((course:any) => (
          <TableRow key={course._id}>
            <TableCell className="font-medium">{course?.coursePrice||"NA"}</TableCell>
            <TableCell><Badge>{course.isPublished ? "Published" :"Draft"}</Badge></TableCell>
            <TableCell>{course.courseTitle}</TableCell>
            <TableCell className="text-right">
              <Button size={"sm"} className="ghost" onClick={()=> navigate(`/admin/course/${course._id}`)}>
                <Edit/>
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      
    </Table>

    </div>
  )
}

export default CourseTable