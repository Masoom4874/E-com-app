import Layout from "../../components/Layout/Layout";
import { React, useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../styles/AuthStyles.css";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [answer, setAnswer] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const navigate = useNavigate("");

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/auth/forget-password", {
        email,
        newPassword,
        answer,
      });
      if (res && res.data.success) {
        toast.success(res && res.data.success);

        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };
  return (
    <Layout title={"Forget Password- Ecom website"}>
      <div className="form-container" style={{ minHeight: "90vh" }}>
        <form onSubmit={handlesubmit}>
          <h4 className="title">Forget password</h4>

          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter Your E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              placeholder="What is your nickname"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.currentTarget.value)}
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Enter new password"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Reset password
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default ForgetPassword;
