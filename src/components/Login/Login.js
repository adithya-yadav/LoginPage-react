import React, { useState, useReducer, useContext, useEffect } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import AuthContext from "../../storage/auth-context";
import Input from "../UI/input/input";

const passwordReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.trim().length > 6 };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.trim().length > 6 };
  }
  return { value: "", isValid: false };
};

const emailReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.includes("@") };
  }
  if (action.type === "INPUT_BLUR") {

    return { value: state.value, isValid: state.value.includes("@") };
  }
  return { value: "", isValid: false };
};
const collegeReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.trim().length > 0 };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.trim().length > 0 };
  }
  return { value: "", isValid: false };
};

const Login = (props) => {
  const [passwordState, dispachPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: null,
  });
  const [emailState, dispachEmail] = useReducer(emailReducer, {
    value: "",
    isValid: null,
  });
  const [collegeState, dispachCollege] = useReducer(collegeReducer, {
    value: "",
    isValid: null,
  });

  const [formIsValid, setFormIsValid] = useState(false);
  const authCtx = useContext(AuthContext);

  const { isValid: emailIsValid } = emailState;
  const { isValid: passwordIsVaild } = passwordState;
  const { isValid: collegeIsValid } = collegeState;

  useEffect(()=>{
    const identifier = setTimeout(()=>{
      setFormIsValid(
          emailState.isValid &&
          passwordState.isValid &&
          collegeState.isValid
      );
    },500)
    return ()=>{
      clearTimeout(identifier)
    }
  },[emailState,passwordState,collegeState])

  const emailChangeHandler = (event) => {
    dispachEmail({ type: "USER_INPUT", val: event.target.value });
    // setFormIsValid(
    //   event.target.value.includes("@") &&
    //     passwordState.isValid &&
    //     collegeState.isValid
    // );
  };
  const collegeChangeHandler = (e) => {
    dispachCollege({ type: "USER_INPUT", val: e.target.value });
    // setFormIsValid(
    //   e.target.value.trim().length > 0 &&
    //     passwordState.isValid &&
    //     emailState.isValid
    // );
  };

  const passwordChangeHandler = (event) => {
    dispachPassword({ type: "USER_INPUT", val: event.target.value });

    // setFormIsValid(
    //   event.target.value.trim().length > 6 &&
    //     emailState.isValid &&
    //     collegeState.isValid
    // );
  };

  const validateEmailHandler = () => {
    dispachEmail({ type: "INPUT_BLUR" });
  };

  const validateCollegeHandler = () => {
    dispachCollege({ type: "INPUT_BLUR" });
  };

  const validatePasswordHandler = () => {
    dispachPassword({ type: "INPUT_BLUR" });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    authCtx.onLogin(emailState.value, passwordState.value, collegeState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          id="email"
          label="E-Mail"
          type="email"
          isValid={emailIsValid}
          value={emailState.value}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
        />
        <Input
          id="password"
          label="Password"
          type="password"
          isValid={passwordIsVaild}
          value={passwordState.value}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
        />
        <Input
          id="college"
          label="College"
          type="text"
          isValid={collegeIsValid}
          value={collegeState.value}
          onChange={collegeChangeHandler}
          onBlur={validateCollegeHandler}
        />
      
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
