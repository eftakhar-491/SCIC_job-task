import AuthProvider from "./Firebase/AuthProvider";
import Layout from "./Layout";
import { ThemeProvider } from "./Context/ThemeContext";
import ProtectCom from "./ProtectRoute/ProtectCom";
import { Outlet } from "react-router";

function App() {
  return (
    <>
      <AuthProvider>
        <ThemeProvider>
          <Layout />
        </ThemeProvider>
      </AuthProvider>
    </>
  );
}

export default App;
