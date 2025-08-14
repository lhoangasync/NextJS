"use server";

import User from "@/database/user.model";
import { connectToDatabsae } from "../mongoose";
import { TCreateUserParams } from "@/types";

export default async function createUser(params: TCreateUserParams) {
  try {
    connectToDatabsae();
    const newUser = await User.create(params);
    return newUser;
  } catch (error) {
    console.log("create user error", error);
  }
}
