import { IconCheck, IconPlay, IconStudy, IconUsers } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { courseLevelTitle } from "@/constants";
import { getCourseBySlug } from "@/lib/actions/course.actions";
import { PageProps } from "@/types";
import Image from "next/image";
import React from "react";

const page = async ({ params }: PageProps) => {
  const { slug } = await params;
  const data = await getCourseBySlug({
    slug: slug,
  });

  if (!data) return null;

  const videoId = data.intro_url?.split(`v=`)[1];

  return (
    <div className="grid grid-cols-[2fr_1fr] gap-10 min-h-screen">
      <div>
        <div className="relative aspect-video mb-5">
          {!data.intro_url ? (
            <>
              <iframe
                width="914"
                height="514"
                src={`https://www.youtube.com/embed/${videoId}`}
                title="SUPER HONEST #1 | Mr. Ba reviews Duong Bau’s country rice"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                className="w-full h-full object-fill"
              ></iframe>
            </>
          ) : (
            <Image
              src={data.image}
              alt=""
              fill
              className="w-full h-full object-cover rounded-lg"
            />
          )}
        </div>
        <h1 className="font-bold text-3xl mb-5">{data.title}</h1>
        <BoxSection title="Mô tả">
          <div className="leading-normal">{data.description}</div>
        </BoxSection>
        <BoxSection title="Thông tin">
          <div className="grid grid-cols-4 gap-5 mb-10">
            <BoxInfo title="Bài học">100</BoxInfo>
            <BoxInfo title="Lượt xem">{data.views}</BoxInfo>
            <BoxInfo title="Trình độ">{courseLevelTitle[data.level]}</BoxInfo>
            <BoxInfo title="Thời lượng">100h45p</BoxInfo>
          </div>
        </BoxSection>

        <BoxSection title="Yêu cầu">
          {data.info.requirements.map((r, index) => (
            <div key={index} className="mb-3 flex items-center gap-2">
              <span className="shrink-0 size-5 bg-primary text-white p-1 rounded flex items-center justify-center">
                <IconCheck />
              </span>
              <span>{r}</span>
            </div>
          ))}
        </BoxSection>
        <BoxSection title="Lợi ích">
          <div className="leading-normal mb-10">
            {data.info.benefits.map((b, index) => (
              <div key={index} className="mb-3 flex items-center gap-2">
                <span className="shrink-0 size-5 bg-primary text-white p-1 rounded flex items-center justify-center">
                  <IconCheck />
                </span>
                <span>{b}</span>
              </div>
            ))}
          </div>
        </BoxSection>
        <BoxSection title="Q/A">
          {data.info.qa.map((qa, index) => (
            <div key={index}>
              <div>{qa.question}</div>
              <div>{qa.answer}</div>
            </div>
          ))}
        </BoxSection>
      </div>
      <div>
        <div className="bg-white rounded-lg p-5">
          <div className="flex items-center gap-2 mb-3">
            <strong className="text-primary text-xl font-bold">
              {new Intl.NumberFormat("vi-VN").format(data.price)}
            </strong>
            <span className="text-slate-400 line-through text-sm">
              {new Intl.NumberFormat("vi-VN").format(data.sale_price)}
            </span>
            <span className="ml-auto inline-block px-3 py-1 rounded-lg text-primary bg-primary/10 font-semibold text-sm">
              {100 - Math.floor((data.price / data.sale_price) * 100)}%
            </span>
          </div>
          <h3 className="font-bold mb-3 text-sm">Khóa học gồm có:</h3>
          <ul className="mb-5 flex flex-col gap-2 text-sm text-slate-500">
            <li className="flex items-center gap-2">
              <IconPlay className="size-4" />
              <span>30h học</span>
            </li>
            <li className="flex items-center gap-2">
              <IconPlay className="size-4" />
              <span>Video Full HD</span>
            </li>
            <li className="flex items-center gap-2">
              <IconUsers className="size-4" />
              <span>Có nhóm hỗ trợ</span>
            </li>
            <li className="flex items-center gap-2">
              <IconStudy className="size-4" />
              <span>Tài liệu kèm theo</span>
            </li>
          </ul>
          <Button variant={"primary"} className="w-full">
            Mua khóa học
          </Button>
        </div>
      </div>
      <div></div>
    </div>
  );
};

const BoxSection = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <>
      <h2 className="font-bold text-xl mb-5">{title}</h2>
      <div className="leading-normal mb-10">{children}</div>
    </>
  );
};

const BoxInfo = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="bg-white rounded-lg p-5">
      <h4 className="text-sm text-slate-400 font-normal">{title}</h4>
      <h3 className="font-bold">{children}</h3>
    </div>
  );
};
export default page;
