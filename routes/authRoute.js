import express from "express";
import {
  loginController,
  testController,
  registerController,
} from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

//router obj
const router = express.Router();

//routing
//Register || Method POST
router.post("/register", registerController);

//LOGIN || Method POST
router.post("/login", loginController);

//test route
router.get("/test", requireSignIn, isAdmin, testController);

//protected route auth
router.get("/user-auth", requireSignIn, (res, res) => {
  res.status(200).send({ ok: true });
});

export default router;
