import React, { useState ,useReducer } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";

const passwordReducer = (state,action)=>{
  if(action.type === "USER_INPUT"){
    return {value:action.val , isValid:action.val.trim().length > 6}
  }
  if(action.type === "INPUT_BLUR"){
    return {value:state.value , isValid:state.value.trim().length > 6}
  }
  return {value:"" , isValid:false}
}

const Login = (props) => {
  const [passwordState,dispachPassword] = useReducer(passwordReducer,{
    value:"",
    isValid:null
  })
  const [enteredEmail, setEnteredEmail] = useState("");
  const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState("");
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [enteredCollege, setCollegeIsValid] = useState("");

  const [formIsValid, setFormIsValid] = useState(false);
  
  const emailChangeHandler = (event) => {
    setEnteredEmail(event.target.value);

    setFormIsValid(
      event.target.value.includes("@") && passwordState.isValid
    );
  };
  const collegeChangeHandler = (e)=>{
    setCollegeIsValid(e.target.value)
    setFormIsValid(enteredCollege.trim().length === 0)
  }

  const passwordChangeHandler = (event) => {
    dispachPassword({type:"USER_INPUT" , val:event.target.value})

    setFormIsValid(
      passwordState.isValid && enteredEmail.includes("@")
    );
  };

  const validateEmailHandler = () => {
    setEmailIsValid(enteredEmail.includes("@"));
  };

  const validateCollegeHandler = ()=>{
    setCollegeIsValid(enteredCollege.trim().length > 0)
  };

  const validatePasswordHandler = () => {
    dispachPassword({type:"INPUT_BLUR"})
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(enteredEmail, passwordState.value , enteredCollege);
  };
 

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailIsValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={enteredEmail}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            enteredCollege === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="college">College</label>
          <input
            type="text"
            id="college"
            value={enteredCollege}
            onChange={collegeChangeHandler}
            onBlur={validateCollegeHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordState.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
