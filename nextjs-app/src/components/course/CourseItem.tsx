import Image from "next/image";
import Link from "next/link";
import React from "react";
import { IconClock, IconEye, IconStar } from "../icons";

const courseInfo = [
  {
    title: "3003",
    icon: (className?: string) => <IconEye className={className}></IconEye>,
  },
  {
    title: "5.0",
    icon: (className?: string) => <IconStar className={className}></IconStar>,
  },
  {
    title: "30h03p",
    icon: (className?: string) => <IconClock className={className}></IconClock>,
  },
];

const CourseItem = () => {
  return (
    <div className="bg-white border border-gray-200 p-4 rounded-2xl dark:bg-grayDarker dark:border-gray-200/10">
      <Link href="#" className="block h-[180px] relative">
        <Image
          src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y2F0fGVufDB8fDB8fHww"
          alt=""
          width={300}
          height={200}
          className="w-full h-full object-cover rounded-lg"
          sizes="@media (min-width:640px) 300px, 100vw"
          priority
        />

        <span className="inline-block px-3 py-1 rounded-full absolute top-3 right-3 z-10 text-white font-medium bg-green-500 text-xs">
          New
        </span>
      </Link>

      <div className="pt-4">
        <h3 className="font-bold text-lg mb-3">
          Khóa học NextJS Pro- Xây dựng E-Learning system hoàn chỉnh
        </h3>

        <div className="flex items-center gap-3 mb-5 text-xs text-gray-500 dark:text-grayDark">
          {courseInfo.map((item, index) => (
            <div className="flex items-center gap-2" key={index}>
              {item.icon("size-4")}
              <span>{item.title}</span>
            </div>
          ))}

          <span className="font-bold text-base text-primary ml-auto">
            999.000
          </span>
        </div>

        <Link
          href="#"
          className="flex items-center justify-center w-full mt-10 rounded-lg text-white font-semibold bg-primary h-12"
        >
          Xem chi tiết
        </Link>
      </div>
    </div>
  );
};

export default CourseItem;
