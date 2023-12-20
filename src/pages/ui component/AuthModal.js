import React, { useState } from "react";
import axios from "axios";
import "../../style/AuthModal.scss";

const AuthModal = ({onAuthentication}) => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://74.119.192.138:5000/api/root/login", {
        name: login,
        password: password,
      });

      const { token } = response.data;
      localStorage.setItem("jwtToken", token);

      // Вызываем функцию onAuthentication с параметром true для обновления статуса в родительском компоненте
      onAuthentication(true);
    } catch (error) {
      const errorMessage = error.response?.data?.error || "Произошла ошибка при аутентификации";
      alert(errorMessage);
    }
  };

  return (
    <div className="AuthModal__container">
      <div className="AuthModal__window">
        <h1>Авторизация</h1>
        <input
          type="text"
          placeholder="Логин"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
        />
        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input type="button"  value="Войти" onClick={handleLogin} />
      </div>
    </div>
  );
};

export default AuthModal;