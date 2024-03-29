import React, { useContext, useRef } from "react";
import "../../../styles/freelancerLogin.scss";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { USER_LOGIN } from "../../../graphQL/Mutations";
import { MyContext } from "../../../Context/Context";
import swal from "sweetalert2";

export default function FreeLancerLogin() {
  const navigate = useNavigate();
  const formRef = useRef();
  const { setIsFreelancerLogin, setFreelancerLoginData } =
    useContext(MyContext);
  const [loginUser, { loading, error, data }] = useMutation(USER_LOGIN);

  const userLogin = (e) => {
    e.preventDefault();
    loginUser({
      variables: {
        email: formRef.current.email.value,
        password: formRef.current.password.value,
      },
    }).then((res) => {
      if (res.data) {
        setFreelancerLoginData(res.data.loginUser.user);
        localStorage.setItem("token", res.data.loginUser.token);

        swal.fire({
          position: "top",
          icon: "success",
          title: "Login successfully",
          showConfirmButton: false,
          timer: 2000,
          customClass: "swal-width",
        });
        setIsFreelancerLogin(true);
        navigate(-1);
      }
    });
  };

  return (
    <div className="container freelancer-login">
      <h1 className="freelancer-login-header">Freelancer Login</h1>
      <form onSubmit={userLogin} ref={formRef}>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            name="email"
            type="email"
            className="form-control"
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input name="password"
            type="password"
            className="form-control" />
        </div>
        <button type="submit" className="btn btn-secondary">
          Submit
        </button>
      </form>
      {/* <Toaster position="top-center" reverseOrder={false} /> */}
    </div>
  );
}
