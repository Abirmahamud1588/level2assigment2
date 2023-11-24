import { Request, Response } from "express";
import { userServices } from "./user.service";
import { User } from "./user.interface";
import uservalditaionSchema from "./user.validation";

const createuser = async (req: Request, res: Response) => {
  try {
    const { User: UserData } = req.body;
    const zodParsedData = uservalditaionSchema.parse(UserData);

    const result = await userServices.createUserIntoDB(zodParsedData);

    const responseData = {
      userId: result.userId,
      username: result.username,
      fullName: result.fullName,
      age: result.age,
      email: result.email,
      isActive: result.isActive,
      hobbies: result.hobbies,
      address: result.address,
    };

    // Send response
    res.status(200).json({
      success: true,
      message: "User created successfully!",
      data: responseData,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error creating user",
      data: null,
    });
  }
};

const getAllusers = async (req: Request, res: Response) => {
  try {
    const results: User[] = await userServices.getAllusersFromDB();

    const filteredResults = results.map((user) => ({
      username: user.username,
      fullName: user.fullName,
      age: user.age,
      email: user.email,
      address: user.address,
    }));

    res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      data: filteredResults,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error in user",
      data: null,
    });
  }
};

const getSingleuser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const result = await userServices.getSingleuserFromDB(userId);

    if (result) {
      const responseData = {
        userId: result.userId,
        username: result.username,
        fullName: result.fullName,
        age: result.age,
        email: result.email,
        isActive: result.isActive,
        hobbies: result.hobbies,
        address: result.address,
      };

      res.status(200).json({
        success: true,
        message: "User fetched successfully!",
        data: responseData,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "User not found",
        error: {
          code: 404,
          description: "User not found!",
        },
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error fetching user",
      error: {
        code: 500,
        description: "Internal Server Error",
      },
    });
  }
};

const updateUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const updatedUserData: User = req.body;

    const updatedUser = await userServices.updateuserFromDB(
      userId,
      updatedUserData
    );

    if (updatedUser) {
      res.status(200).json({
        success: true,
        message: "User updated successfully",
        data: updatedUser,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "User not found",
        error: {
          code: 404,
          description: "User not found",
        },
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error updating user",
      error: {
        code: 500,
        description: "Internal Server Error",
      },
    });
  }
};
const deleteUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;

    const isDeleted = await userServices.deleteuserFromDB(userId);

    if (isDeleted) {
      res.status(200).json({
        success: true,
        message: "User deleted successfully",
        data: null,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "User not found",
        error: {
          code: 404,
          description: "User not found",
        },
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error deleting user",
      error: {
        code: 500,
        description: "Internal Server Error",
      },
    });
  }
};

export const userController = {
  createuser,
  getAllusers,
  getSingleuser,
  updateUser,
  deleteUser,
};
