import { React, useState } from "react";
import Layout from "../../components/Layout/Layout";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import "../../styles/AuthStyles.css";
import { useAuth } from "../../context/auth";
import { Location } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate("");
  const location = useLocation();

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/auth/login", {
        email,
        password,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        setTimeout(() => {
          navigate(location.state || "/");
        }, 1000);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("email or password is not correct");
    }
  };
  return (
    <Layout title={"Login"}>
      <div className="form-container" style={{ minHeight: "90vh" }}>
        <form onSubmit={handlesubmit}>
          <h4 className="title">Login page</h4>

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
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.currentTarget.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Log In
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Login;
