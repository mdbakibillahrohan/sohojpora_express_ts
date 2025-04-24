import { Router } from "express";

const authRouter = Router();
authRouter.get("/", (req, res) => {
  res.status(200).json({ message: "Auth route" });
});
authRouter.post("/", (req, res) => {

  // Handle login logic here
  res.status(200).json({ message: "Login successful" });
});

export default authRouter;