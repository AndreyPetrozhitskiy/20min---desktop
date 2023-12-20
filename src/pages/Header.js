import React from "react"
import "../style/header.scss"
import { Link } from "react-router-dom";
const Header = ({ onLogout }) => {
  const handleLogout = () => {
    // Очистка токена из localStorage
    localStorage.removeItem("jwtToken");
    
    // Вызов функции onLogout для обновления статуса авторизации в родительском компоненте
    onLogout();
  };
  return (
    <div className="Header">
      <div className="Header__Nav">
      <Link to="/"><input type="button" value={"Проекты"} /></Link>
        <Link to="/users"><input type="button" value={"Пользователи"} /></Link>
        <Link to="/connection"><input type="button" value={"Связи проектов"} /></Link>
        <Link to="/published"><input type="button" value={"Опубликованные"} /></Link>
      </div>
      <input type="button" value={"Выйти"} onClick={handleLogout} />
    </div>
  )
};

export default Header;
