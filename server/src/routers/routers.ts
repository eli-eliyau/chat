import { Router } from "express";
import { insertUser, userExist } from "../controller/cUsers";
import { getAllUsers } from "../controller/cAllUsers";
import { setMessage } from "../controller/cMessages";
import { updateNumRoom } from "../controller/cRoom";

const router = Router();

router.post("/signIn", userExist);
router.post("/signUp", insertUser);

router.post("/getAllUsers", getAllUsers);

router.post("/setMessage", setMessage);

router.post("/numRoom", updateNumRoom);

export default router;
