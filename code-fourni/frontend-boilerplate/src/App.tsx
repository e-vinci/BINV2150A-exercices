import { BrowserRouter, Route, Routes } from "react-router";
import Layout from "./components/Layout";
import { useAuth } from "./hooks/useAuth";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import RegisterPage from "./pages/RegisterPage";

const App = () => {
  const auth = useAuth();
  const isLoggedIn = auth.token !== null;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout user={auth.user} isLoggedIn={isLoggedIn} onLogout={auth.logout} />}>
          <Route index element={<HomePage />} />
          <Route path="login" element={<LoginPage onLogin={auth.login} />} />
          <Route path="register" element={<RegisterPage onRegister={auth.register} />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
