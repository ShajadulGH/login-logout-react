import React, { useEffect, useState } from "react";

const Context = React.createContext({
  isLoggedIn: false,
  onLogOut: () => {},
  onLogIn: (email, password) => {},
});
export const CotextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const logedInfo = localStorage.getItem("isLogedIn");
    if (logedInfo === "1") {
      setIsLoggedIn(true);
    }
  }, []);
  const loginHandler = (email, password) => {
    // We should of course check email and password
    // But it's just a dummy/ demo anyways
    setIsLoggedIn(true);
    localStorage.setItem("isLogedIn", "1");
  };
  const logoutHandler = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("isLogedIn");
  };

  return (
    <Context.Provider
      value={{
        isLoggedIn: isLoggedIn,
        onLogOut: logoutHandler,
        onLogIn: loginHandler,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};
export default Context;
