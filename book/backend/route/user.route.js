import express from "express";
import { signup, login, addr, bookmark, bookmarkremove} from "../controller/user.controller.js";
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.put("/addr", addr);
router.put("/bookmark", bookmark);
router.put("/bookmarkremove", bookmarkremove);
export default router;