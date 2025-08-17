"use client";
import React from "react";
import { menuItems } from "@/constants";
import { TMenuItem } from "../../types";
import { ActiveLink } from "../common";
import { useAuth, UserButton } from "@clerk/nextjs";
import { ModeToggle } from "../common/ModeToggle";
import Link from "next/link";
import { IconUsers } from "../icons";

const Sidebar = () => {
  const { userId } = useAuth();
  return (
    <div className="hidden p-5 border-r borderDarkMode bgDarkMode lg:flex flex-col dark:border-r-gray-200/10 fixed top-0 left-0 bottom-0 w-[300px]">
      <a href="#" className="font-bold inline-block text-3xl mb-5 self-start">
        <span className="text-primary">U</span>
        cademy
      </a>
      <ul className="flex flex-col gap-2">
        {menuItems.map((item, index) => (
          <MenuItem
            key={index}
            url={item.url}
            title={item.title}
            icon={item.icon}
          ></MenuItem>
        ))}
      </ul>
      <div className="mt-auto flex items-center justify-end gap-5">
        <ModeToggle></ModeToggle>
        {!userId ? (
          <Link href="/sign-in">
            <IconUsers className="size-10 rounded-lg bg-primary text-white justify-center flex items-center p-1" />
          </Link>
        ) : (
          <UserButton />
        )}
      </div>
    </div>
  );
};

function MenuItem({ url = "/", title = "", icon }: TMenuItem) {
  return (
    <li>
      <ActiveLink url={url}>
        {icon}
        {title}
      </ActiveLink>
    </li>
  );
}
export default Sidebar;
