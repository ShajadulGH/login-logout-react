import classes from "./Input.module.css";
import React, { forwardRef } from "react";
const Input = (props, ref) => {
  // const inputRef = useRef();
  // const active = () => {
  //   inputRef.current.focus();
  // };
  // useImperativeHandle(ref, () => {
  //   return {
  //     focus: active,
  //   };
  // });
  return (
    <div
      className={`${classes.control} ${
        props.isValid === false ? classes.invalid : ""
      }`}
    >
      <label htmlFor={props.htmlFor}>{props.label}</label>
      <input
        ref={ref}
        type={props.type}
        id={props.id}
        value={props.value}
        onChange={props.onChange}
        onBlur={props.onBlur}
      />
    </div>
  );
};
export default forwardRef(Input);
