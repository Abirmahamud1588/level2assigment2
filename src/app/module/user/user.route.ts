import express from "express";
import { userController } from "./user.controller";

const router = express.Router();

router.post("/create-user", userController.createuser);

router.get("/", userController.getAllusers);
router.get("/:userId", userController.getSingleuser);
router.put("/:userId", userController.updateUser);
router.delete("/:userId", userController.deleteUser);

export const userRoutes = router;
