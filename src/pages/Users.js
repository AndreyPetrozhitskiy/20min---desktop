import React, { useState, useEffect } from "react";
import axios from "axios";
import "../style/Users.scss";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://74.119.192.138:5000/api/users/alluser");
      setUsers(response.data);
    } catch (error) {
      console.error("Ошибка при получении пользователей:", error);
      alert("Ошибка при получении пользователей");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDeleteUser = async (userId) => {
    try {
      const token = localStorage.getItem("jwtToken");

      if (!token) {
        alert("Пользователь не авторизован");
        return;
      }

      await axios.delete("http://74.119.192.138:5000/api/users/delete", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          id: userId,
        },
      });

      // Перерендерим список пользователей после успешного удаления
      fetchUsers();
      alert("Пользователь удален!");
      // Дополнительные действия после успешного удаления (обновление интерфейса и т.д.)
    } catch (error) {
      console.error("Ошибка при удалении пользователя:", error.response?.data || error.message);
      alert(`Ошибка при удалении пользователя: ${error.response?.data || error.message}`);
    }
  };

  // Функция для фильтрации пользователей по имени
  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <div className="Users">
      <h1>Пользователи</h1>
      {/* Добавим поле для ввода и обработчик изменения */}
      <input
        type="text"
        placeholder="Поиск"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />

      {filteredUsers.map((user, index) => (
        <div key={index} className="Users__item">
          <div className="Users__item-number">
            <p>{index + 1}</p>
          </div>
          <p className="Users__item-id">id: {user.UserID}</p>
          <p className="Users__item-name">{user.username}</p>
          {user.avatar && <img src={user.avatar} alt="User Avatar" className="Users__item-avatar" />}
          <input type="button" value={"Удалить"} onClick={() => handleDeleteUser(user.UserID)} />
        </div>
      ))}
    </div>
  );
};

export default Users;
