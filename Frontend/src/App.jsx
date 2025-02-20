import Login from "./Components/Login";
import Register from "./Components/Register";
import WorkFlowToDo from "./Components/DashboardComponents/WorkFlowToDo";
import Dashboard from "./Components/dashboard";
import AuthProvider from "./Firebase/AuthProvider";
import Layout from "./Layout";
import { ThemeProvider } from "./Context/ThemeContext";
function App() {
  return (
    <>
      <ThemeProvider>
        <AuthProvider>
          <Layout />
        </AuthProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
