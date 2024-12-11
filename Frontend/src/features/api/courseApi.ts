import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const COURSE_API = "http://localhost:8080/api/v1/course/";

export const courseApi = createApi({
  reducerPath: "courseApi",
  tagTypes: ["Refetch_Creator_Course", "Refetch_Lecture_Course"],
  baseQuery: fetchBaseQuery({
    baseUrl: COURSE_API,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    createCourse: builder.mutation({
      query: ({ courseTitle, category }) => ({
        url: "/",
        method: "POST",
        body: { courseTitle, category },
      }),
      invalidatesTags: ["Refetch_Creator_Course"],
    }),
    getSearchCourse:builder.query({
      query:({searchQuery,categories,sortByPrice})=>{
        //build query string
        let queryString=`/search?query=${encodeURIComponent(searchQuery)}`
        //append category 
        if(categories && categories.length>0){
          const categoriesString=categories.map(encodeURIComponent).join(',');
          queryString+=`&categories=${categoriesString}`
        }
        if(sortByPrice){
          queryString+=`&sortByPrice=${encodeURIComponent(sortByPrice)}`
        }
        return {
          url:queryString,
          method:"GET"
        }
        
      }
    }),
    getPublishedCourses: builder.query({
      query: () => ({
        url: "/course/published-courses",
        method: "GET",
      }),
    }),

    getCreatorCourse: builder.query({
      query: () => ({
        url: "/",
        method: "GET",
      }),
      providesTags: ["Refetch_Creator_Course"],
    }),
    editCourse: builder.mutation({
      query: ({ data, courseId }) => ({
        url: `/${courseId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Refetch_Creator_Course"],
    }),
    getCourseById: builder.query({
      query: (courseId) => ({
        url: `/${courseId}`,
        method: "GET",
      }),
    }),
    deleteCourseById: builder.mutation({
      query: (courseId) => ({
        url: `/${courseId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Refetch_Creator_Course"],
    }),
    createLecture: builder.mutation({
      query: ({ courseId, lectureTitle }) => ({
        url: `/${courseId}/lecture`,
        method: "POST",
        body: { lectureTitle },
      }),
      invalidatesTags: ["Refetch_Lecture_Course"],
    }),
    getCourseLecture: builder.query({
      query: (courseId) => ({
        url: `/${courseId}/lecture`,
        method: "GET",
      }),
      providesTags: ["Refetch_Lecture_Course"],
    }),
    editLecture: builder.mutation({
      query: ({ courseId, lectureId, data }) => ({
        url: `/${courseId}/lecture/${lectureId}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Refetch_Lecture_Course"],
    }),
    deleteLecture: builder.mutation({
      query: (lectureId) => ({
        url: `/lecture/${lectureId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Refetch_Lecture_Course"],
    }),
    getLectureById: builder.query({
      query: (lectureId) => ({
        url: `/lecture/${lectureId}`,
        method: "GET",
      }),
    }),
    publishCourse: builder.mutation({
      query: ({ courseId, query }) => ({
        url: `/${courseId}?publish=${query}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Refetch_Creator_Course"],
    }),
  }),
});

export const {
  useGetCreatorCourseQuery,
  useCreateCourseMutation,
  usePublishCourseMutation,
  useGetPublishedCoursesQuery,
  useDeleteCourseByIdMutation,
  useEditCourseMutation,
  useGetCourseByIdQuery,
  useCreateLectureMutation,
  useGetCourseLectureQuery,
  useDeleteLectureMutation,
  useGetLectureByIdQuery,
  useEditLectureMutation,
  useGetSearchCourseQuery
} = courseApi;
