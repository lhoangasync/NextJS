"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Heading from "../common/Heading";
import Image from "next/image";
import { commonClassName, courseStatus } from "@/constants";
import { cn } from "@/lib/utils";
import { IconDelete, IconEdit, IconEye, IconStudy } from "../icons";
import Link from "next/link";

const CourseManage = () => {
  return (
    <div>
      <Heading className="mb-10">Quản lý khóa học</Heading>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Thông tin</TableHead>
            <TableHead>Giá</TableHead>
            <TableHead>Trạng thái</TableHead>
            <TableHead>Hành động</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>
              <div className="flex items-center gap-3">
                <Image
                  alt=""
                  src="https://images.unsplash.com/photo-1455970022149-a8f26b6902dd?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjN8fGNhdHxlbnwwfHwwfHx8MA%3D%3D"
                  width={80}
                  height={80}
                  className="shrink-0 size-16 rounded-lg object-cover"
                />
                <div className="flex flex-col gap-1">
                  <h3 className="font-bold text-base">
                    Khóa học lập trình Fullstack
                  </h3>
                  <h4 className="text-sm text-slate-500">30/03/2004</h4>
                </div>
              </div>
            </TableCell>
            <TableCell>
              <span className="font-bold text-base">499.000</span>
            </TableCell>
            <TableCell>
              <span
                className={cn(
                  commonClassName.status,
                  courseStatus[0].className
                )}
              >
                {courseStatus[0].title}
              </span>
            </TableCell>
            <TableCell>
              <div className="flex gap-3">
                <Link
                  href="/manage/course/update-content?slug=khoa-hoc-lap-trinh-fullstack"
                  className={commonClassName.action}
                >
                  <IconStudy />
                </Link>
                <Link
                  href="/course/khoa-hoc-lap-trinh-fullstack"
                  target="_blank"
                  className={commonClassName.action}
                >
                  <IconEye />
                </Link>
                <Link
                  href="/manage/course/update?slug=khoa-hoc-lap-trinh-fullstack"
                  className={commonClassName.action}
                >
                  <IconEdit />
                </Link>
                <button className={commonClassName.action}>
                  <IconDelete />
                </button>
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default CourseManage;
