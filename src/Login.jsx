import React from "react";
import './login.css'; 

const Login = () => {
  return (
    <div className="Login">
      <div className="loginContainer">
        <h1>Sign Up</h1>
        <div className="loginSignup-fields">
          <input type="text" placeholder="Name" />
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
        </div>
      <div className="cb">  <button>Continue</button></div>
        <p className="loginSignup-login">
          Already have an account? <span>Login here</span>
        </p>
        <div className="agree">
          <input type="checkbox"  name = '' id='' />
          <p>By continuing, I agree to all terms and conditions</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
