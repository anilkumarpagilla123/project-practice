import React from "react";
import { useForm } from "react-hook-form";
import { Form, Button } from "react-bootstrap";
import loginImg from "./images/login1.svg";
import {useSelector,useDispatch} from 'react-redux';
import {useNavigate} from "react-router-dom";
import {userLogin} from '../slices/userSlice';
import { useEffect } from "react";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();


  let {userObj,isError,isLoading,isSuccess,errMsg}=useSelector(state=>state.user)
  let dispath=useDispatch();
  let Navigate=useNavigate();

  //when login form is submitted
  const onFormSubmit = (userCredentialsObject) => {
    //console.log(userCredentialsObject)
   if (userCredentialsObject.userType === "user") {
     dispath(userLogin(userCredentialsObject));
   }

   if (userCredentialsObject.userType === "admin") {
     alert("Admin devoloplment in progress...");
     // dispatch(userLogin(userCredentialsObject));
   }
 };

 //this to be executed when either isSuccess or isError changed
 useEffect(() => {
   if (isSuccess) {
     Navigate("/userdashboard");
   }
 }, [isSuccess, isError]);


  return (
    <div className="container mt-5 mb-5">
      <p className="loginst display-2 text-center text-dark">Login</p>
      <img
        src={loginImg}
        width="300px"
        className="d-sm-block d-none mx-auto"
        alt=""
      />
      <div className="row  ">
        <div className="col-12 col-sm-8 col-md-6  mx-auto">
          <Form  onSubmit={handleSubmit(onFormSubmit)}>
          <Form.Group className="mb-3">
              <Form.Label>Select type of User</Form.Label> <br />
              {/* user type */}
              <Form.Check inline type="radio" id="user">
                <Form.Check.Input
                  type="radio"
                  value="user"
                  {...register("userType", { required: true })}
                />
                <Form.Check.Label>User</Form.Check.Label> 
              </Form.Check>
              <Form.Check inline type="radio" id="admin">
                <Form.Check.Input
                  type="radio"
                  value="admin"
                  {...register("userType", { required: true })}
                />
                <Form.Check.Label>Admin</Form.Check.Label>
              </Form.Check>
            </Form.Group>

            {/* username */}
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Username"
                {...register("username", { required: true })}
              />
              {/* validation error message for username */}
              {errors.username && (
                <p className="text-danger">* Username is required</p>
              )}
            </Form.Group>

            {/* password */}
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter Password"
                {...register("password", { required: true })}
              />
              {/* validation error message for password */}
              {errors.password && (
                <p className="text-danger">* Password is required</p>
              )}
            </Form.Group>

            <Button className="t-style mb-5" variant="secondary" type="submit">
              Login
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Login;