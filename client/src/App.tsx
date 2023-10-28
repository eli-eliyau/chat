import { Routes, Route, Navigate } from "react-router-dom";
import LogIn from "./components/LogIn";
import Home from "./components/Home";

function App() {
  let userExist: string | null = localStorage.getItem("chatUser");

  return (
    <>
      {userExist === null || undefined ? (
        <Routes>
          <Route path="/sign-in" element={<LogIn toUrlServer={"signIn"} />} />
          <Route path="/sign-up" element={<LogIn toUrlServer={"signUp"} />} />
          <Route path="*" element={<Navigate replace to="/sign-in" />} />
        </Routes>
      ) : userExist === "true" ? (
        <>
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/*" element={<Navigate replace to="/home" />} />
          </Routes>
        </>
      ) : (
        ""
      )}
    </>
  );
}

export default App;
