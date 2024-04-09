import express from "express";
import {
    updatedUser,
    deleteUser,
    getUser,
    getUsers
} from "../controllers/userController.js";


const router = express.Router();




//UPDATE
router.put("/:userId", updatedUser);

//DELETE
router.delete("/:_id", deleteUser);
//GET
router.get("/:userId", getUser);

//GET ALL
router.get("/", getUsers);

export default router;