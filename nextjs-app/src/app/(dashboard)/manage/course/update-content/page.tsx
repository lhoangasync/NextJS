import { getCourseBySlug } from "@/lib/actions/course.actions";
import React from "react";

const page = async (props: {
  searchParams: Promise<{
    slug: string;
  }>;
}) => {
  //   const searchParams = await props.searchParams;
  //   const findCourse = await getCourseBySlug({
  //     slug: searchParams.slug,
  //   });
  //   if (!findCourse) return null;
  return <div></div>;
};

export default page;
