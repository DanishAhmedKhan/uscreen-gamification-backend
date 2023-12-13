import express from "express";
import tryCatch from "../helpers/tryCatch";
import auth from "../middlewares/userAuth";
// Validator
import {
   loginUserValidator,
   addUserValidator,
   addDataValidator,
} from "../validators/user.validator";
// Controller
import {
   loginUserController,
   addUserController,
   addDataController,
   getDataController,
   getLeaderboardController,
} from "../controllers/user.controller";
// Types
import { IAuthenticatedRequest } from "../@types/user";

const router = express.Router();

router.post("/loginUser", loginUserValidator, tryCatch(loginUserController));
router.post("/addUser", addUserValidator, tryCatch(addUserController));
router.post("/addData", auth, addDataValidator, tryCatch(addDataController));
router.post("/getData", auth, tryCatch<IAuthenticatedRequest>(getDataController));
router.post("/getLeaderboard", auth, tryCatch<IAuthenticatedRequest>(getLeaderboardController));

export default router;
