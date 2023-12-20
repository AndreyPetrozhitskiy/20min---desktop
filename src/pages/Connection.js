import React, { useState, useEffect } from "react";
import axios from "axios";
import "../style/connection.scss";

const Connection = () => {
    const [connections, setConnections] = useState([]);
    const [searchValue, setSearchValue] = useState("");
  
    const fetchConnections = async () => {
      try {
        const response = await axios.get("http://74.119.192.138:5000/api/role/all-roles");
        setConnections(response.data);
      } catch (error) {
        console.error("Ошибка при получении связей:", error);
        alert("Ошибка при получении связей");
      }
    };
  
    useEffect(() => {
      fetchConnections();
    }, []);
  
    const handleDeleteConnection = async (connectionId) => {
      try {
        const token = localStorage.getItem("jwtToken");
  
        if (!token) {
          alert("Пользователь не авторизован");
          return;
        }
  
        await axios.delete("http://74.119.192.138:5000/api/role/deleterole", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: {
            id: connectionId,
          },
        });
  
        // Перерендерим список связей после успешного удаления
        fetchConnections();
        alert("Роль удалена!");
        // Дополнительные действия после успешного удаления (обновление интерфейса и т.д.)
      } catch (error) {
        console.error("Ошибка при удалении связи:", error.response?.data || error.message);
        alert(`Ошибка при удалении связи: ${error.response?.data || error.message}`);
      }
    };
  
    // Функция для фильтрации связей по имени проекта
    const filteredConnections = connections.filter((connection) =>
      connection.ProjectName.toLowerCase().includes(searchValue.toLowerCase())
    );
  return (
    <div className="connection">
      <h1>Связи проектов</h1>
      <input
        type="text"
        placeholder="Поиск по проекту"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />

      {filteredConnections.map((connection, index) => (
        <div key={index} className="connection__item">
          <div className="connection__item-number">
            <p>{index + 1}</p>
          </div>
          <p className="connection__item-id">id: {connection.MemberID}</p>
          <p className="connection__item-name">Проект: {connection.ProjectName}</p>
          <p className="connection__item-name">User: {connection.UserName}</p>
          <p className="connection__item-name">Роль: {connection.Role}</p>
          <input type="button" value={"Удалить"} onClick={() => handleDeleteConnection(connection.MemberID)} />
        </div>
      ))}
    </div>
  );
};

export default Connection;