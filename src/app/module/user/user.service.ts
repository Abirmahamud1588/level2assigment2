import { userModel } from "../user.model";
import { User } from "./user.interface";

const createUserIntoDB = async (User: User) => {
  const result = await userModel.create(User);

  return result;
};
const getAllusersFromDB = async () => {
  const result = await userModel.find();

  return result;
};

const getSingleuserFromDB = async (userId: string) => {
  const result = await userModel.findOne({ userId });

  return result;
};

const updateuserFromDB = async (
  userId: string,
  updatedUserData: User
): Promise<User | null> => {
  try {
    const result = await userModel.findOneAndUpdate(
      { userId },
      updatedUserData,
      { new: true }
    );

    console.log("Updated User:", result);

    return result;
  } catch (error) {
    console.error("Error updating user:", error);
    throw new Error("Error updating user");
  }
};

const deleteuserFromDB = async (userId: string): Promise<boolean> => {
  try {
    const result = await userModel.findOneAndDelete({ userId });
    return result !== null;
  } catch (error) {
    console.log(error);
    throw new Error("Error deleting user");
  }
};

export const userServices = {
  createUserIntoDB,
  getAllusersFromDB,
  getSingleuserFromDB,
  updateuserFromDB,
  deleteuserFromDB,
};
