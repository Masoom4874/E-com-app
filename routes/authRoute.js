import express from "express";
import {
  loginController,
  testController,
  registerController,
  forgetPasswordController,
} from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

//router obj
const router = express.Router();

//routing
//Register || Method POST
router.post("/register", registerController);

//LOGIN || Method POST
router.post("/login", loginController);

//Forget-password
router.post("/forget-password", forgetPasswordController);

//test route
router.get("/test", requireSignIn, isAdmin, testController);

//protected route auth
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

export default router;
