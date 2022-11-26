import React, { useState, useEffect } from "react";
import Context from "./components/Context/context";
import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import MainHeader from "./components/MainHeader/MainHeader";

function App() {
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
    <Context.Provider value={{ isLoggedIn: isLoggedIn }}>
      <MainHeader onLogout={logoutHandler} />
      <main>
        {!isLoggedIn && <Login onLogin={loginHandler} />}
        {isLoggedIn && <Home onLogout={logoutHandler} />}
      </main>
    </Context.Provider>
  );
}

export default App;
