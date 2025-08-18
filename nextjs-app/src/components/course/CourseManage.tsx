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
import {
  IconArrowLeft,
  IconArrowRight,
  IconDelete,
  IconEdit,
  IconEye,
  IconStudy,
} from "../icons";
import Link from "next/link";
import { ICourse } from "@/database/course.model";
import Swal from "sweetalert2";
import { updateCourse } from "@/lib/actions/course.actions";
import { ECourseStatus } from "@/types/enums";
import { toast } from "react-toastify";
import { Input } from "../ui/input";

const CourseManage = ({ courses }: { courses: ICourse[] }) => {
  const handleDeleteCourse = (slug: string) => {
    Swal.fire({
      title: "Delete it ? :((",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#78C841",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await updateCourse({
          slug,
          updateData: {
            status: ECourseStatus.PENDING,
            _destroy: true,
          },
          path: "/manage/course",
        });
        toast.success("Xóa khóa học thành công!");
      }
    });
  };

  const handleChangeStatus = async (slug: string, status: ECourseStatus) => {
    try {
      Swal.fire({
        title: "You wanna update this post ?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#78C841",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, change it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await updateCourse({
            slug,
            updateData: {
              status: ECourseStatus.PENDING
                ? ECourseStatus.APPROVED
                : ECourseStatus.PENDING,
              _destroy: false,
            },
            path: "/manage/course",
          });
          toast.success("Cập nhật trạng thái thành công!");
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div className="flex items-center justify-between mb-10">
        <Heading className="">Quản lý khóa học</Heading>
        <div className="w-[300px]">
          <Input placeholder="Tìm kiếm khóa học" />
        </div>
      </div>
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
          {courses.length > 0 &&
            courses.map((course) => {
              const courseStatusItem = courseStatus.find(
                (item) => item.value === course.status
              );
              return (
                <TableRow key={course.slug}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Image
                        alt=""
                        src={course.image}
                        width={80}
                        height={80}
                        className="shrink-0 size-16 rounded-lg object-cover"
                      />
                      <div className="flex flex-col gap-1">
                        <h3 className="font-bold text-base">{course.title}</h3>
                        <h4 className="text-sm text-slate-500">
                          {new Date(course.created_at).toLocaleDateString(
                            "vi-VI"
                          )}
                        </h4>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="font-bold text-base">
                      {new Intl.NumberFormat("vi-VN").format(course.price)} đ
                    </span>
                  </TableCell>
                  <TableCell>
                    <button
                      type="button"
                      className={cn(
                        "cursor-pointer",
                        commonClassName.status,
                        courseStatusItem?.className
                      )}
                      disabled={
                        course.status === ECourseStatus.APPROVED ? true : false
                      }
                      onClick={() =>
                        handleChangeStatus(course.slug, course.status)
                      }
                    >
                      {courseStatusItem?.title}
                    </button>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-3">
                      <Link
                        href={`/manage/course/update-content?slug=${course.slug}`}
                        className={commonClassName.action}
                      >
                        <IconStudy />
                      </Link>
                      <Link
                        href={`/course/${course.slug}`}
                        target="_blank"
                        className={commonClassName.action}
                      >
                        <IconEye />
                      </Link>
                      <Link
                        href={`/manage/course/update?slug=${course.slug}`}
                        className={commonClassName.action}
                      >
                        <IconEdit />
                      </Link>
                      <button
                        onClick={() => handleDeleteCourse(course.slug)}
                        className={commonClassName.action}
                      >
                        <IconDelete />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
      <div className="flex justify-end gap-3 mt-5">
        <button className={commonClassName.paginationButton}>
          <IconArrowLeft className="size-5" />
        </button>
        <button className={commonClassName.paginationButton}>
          <IconArrowRight className="size-5" />
        </button>
      </div>
    </div>
  );
};

export default CourseManage;
