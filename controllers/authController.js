import { hashpassword } from "../helpers/authHelper.js";

export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;

    //validation
    if (!name) {
      return res.send({ error: "Name is required" });
    }
    if (!email) {
      return res.send({ error: "E-mail is required" });
    }
    if (!password) {
      return res.send({ error: "password is required" });
    }
    if (!phone) {
      return res.send({ error: "Phone is required" });
    }
    if (!address) {
      return res.send({ error: "address is required" });
    }

    //check user
    const existinguser = await userModel.findone({ email });

    //existing user
    if (existinguser) {
      return res.status(200).send({
        success: true,
        message: "Already regi please login!",
      });
    }
    //register user
    const hashedPassword = await hashpassword(password);

    //save
    const user = new userModel({
      name,
      email,
      phone,
      address,
      password: hashedPassword,
    }).save();

    res.status(201).send({
      success: true,
      message: "User Registerd Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Registration",
      error,
    });
  }
};
