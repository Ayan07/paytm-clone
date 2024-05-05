import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Signup } from "./pages/Signup";
import { Send } from "./pages/Send";
import { Dashboard } from "./pages/Dashboard";
import { Signin } from "./pages/Signin";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path={"/signup"} element={<Signup />} />
          <Route path={"/signin"} element={<Signin />} />
          <Route path={"/dashboard"} element={<Dashboard />} />
          <Route path={"/send"} element={<Send />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
