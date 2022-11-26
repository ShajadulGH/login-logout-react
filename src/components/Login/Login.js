import React, { useState, useReducer } from "react";
import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
const emailReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.value, isValid: action.value.trim().includes("@") };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.trim().includes("@") };
  }
  return {
    value: "",
    isValid: null,
  };
};

const passReducer = (state, action) => {
  if (action.type === "INPUT_PASS") {
    return { value: action.value, isValid: action.value.trim().length > 6 };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.trim().length > 6 };
  }
  return { value: "", isValid: null };
};
const Login = (props) => {
  const [gotEmail, emailDispatch] = useReducer(emailReducer, {
    value: "",
    isValid: null,
  });
  const [gotPassword, passwordDispatch] = useReducer(passReducer, {
    value: "",
    isValid: null,
  });
  // const [enteredEmail, setEnteredEmail] = useState("");
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState("");
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const emailChangeHandler = (event) => {
    // setEnteredEmail(event.target.value);
    emailDispatch({ type: "USER_INPUT", value: event.target.value });
    setFormIsValid(
      event.target.value.includes("@") && gotPassword.value.trim().length > 6
    );
  };

  const passwordChangeHandler = (event) => {
    passwordDispatch({ type: "INPUT_PASS", value: event.target.value });
    setFormIsValid(
      event.target.value.trim().length > 6 && gotEmail.value.includes("@")
    );
  };
  // Use of useEffect() Hook
  // useEffect(() => {
  //   const timeout = setTimeout(() => {
  //     setFormIsValid(
  //       enteredPassword.trim().length > 6 && enteredEmail.includes("@")
  //     );
  //   }, 1000);
  //   return () => {
  //     clearTimeout(timeout);
  //   };
  // }, [enteredEmail, enteredPassword]);
  const validateEmailHandler = () => {
    emailDispatch({ type: "INPUT_BLUR" });
  };

  const validatePasswordHandler = () => {
    passwordDispatch({ type: "INPUT_BLUR" });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(gotEmail.value, gotPassword.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            gotEmail.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={gotEmail.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            gotPassword.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={gotPassword.value}
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
