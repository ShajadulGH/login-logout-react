import React, { useState, useEffect, useReducer, useContext } from "react";
import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import Context from "../Context/context";
import Input from "../UI/Input/Input";
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
  const ctx = useContext(Context);
  const [gotEmail, emailDispatch] = useReducer(emailReducer, {
    value: "",
    isValid: null,
  });
  const [gotPassword, passwordDispatch] = useReducer(passReducer, {
    value: "",
    isValid: null,
  });

  const [formIsValid, setFormIsValid] = useState(false);

  const emailChangeHandler = (event) => {
    emailDispatch({ type: "USER_INPUT", value: event.target.value });
  };

  const passwordChangeHandler = (event) => {
    passwordDispatch({ type: "INPUT_PASS", value: event.target.value });
  };

  const { isValid: emailISValid } = gotEmail;
  const { isValid: passIsValid } = gotPassword;
  // Use of useEffect() Hook
  useEffect(() => {
    const timeout = setTimeout(() => {
      setFormIsValid(emailISValid && passIsValid);
    }, 1000);
    return () => {
      clearTimeout(timeout);
    };
  }, [emailISValid, passIsValid]);
  const validateEmailHandler = () => {
    emailDispatch({ type: "INPUT_BLUR" });
  };

  const validatePasswordHandler = () => {
    passwordDispatch({ type: "INPUT_BLUR" });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    ctx.onLogIn(gotEmail.value, gotPassword.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          htmlFor="email"
          label="E-Mail"
          type="email"
          id="email"
          value={gotEmail.value}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
          isValid={gotEmail.isValid}
        ></Input>
        <Input
          htmlFor="password"
          label="Password"
          type="password"
          id="password"
          value={gotPassword.value}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
          isValid={gotPassword.isValid}
        ></Input>
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
