import React, { useState } from "react";
import AppRouter from "./AppRouter";
import Header from "./pages/Header";
import AuthModal from "./pages/ui component/AuthModal";
import "./style/app.scss";

function App() {
  // Состояние для отслеживания статуса авторизации
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Функция для обновления статуса авторизации
  const handleAuthentication = (isAuth) => {
    setIsAuthenticated(isAuth);
  };

  // Функция для выхода из аккаунта
  const handleLogout = () => {
    // Очистка токена из localStorage
    localStorage.removeItem("jwtToken");
    // Обновление статуса авторизации
    setIsAuthenticated(false);
  };

  return (
    <div className="App">
      <div className="App__Container">
        {/* Рендер AuthModal только при отсутствии авторизации */}
        {!isAuthenticated && <AuthModal onAuthentication={handleAuthentication} />}
        
        {/* Рендер Header и AppRouter только при наличии авторизации */}
        {isAuthenticated && <Header onLogout={handleLogout} />}
        {isAuthenticated && <AppRouter />}
      </div>
    </div>
  );
}

export default App;