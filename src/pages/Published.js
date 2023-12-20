import React, { useEffect, useState } from "react";
import axios from 'axios';
import "../style/Published.scss";

const Published = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    const apiUrl = 'http://74.119.192.138:5000/api/projects/';
    axios.get(apiUrl).then((resp) => {
      const projectsData = resp.data;
      setData(projectsData);
    }).catch((error) => {
      console.error('Ошибка при получении данных:', error);
    });
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleDelete = (id) => {
    const apiUrl = 'http://74.119.192.138:5000/api/projects/delete';
    
    axios.delete(apiUrl, { data: { id } }).then((resp) => {
      console.log(resp.data);
      fetchData();
      alert('Проект удален');
    }).catch((error) => {
      alert('Ошибка при удалении проекта:', error);
    });
  };

  // Проверка на наличие данных перед их отображением
  const filteredProjects = data && data.filter((item) =>
    item.NameProject.toLowerCase().includes(searchTerm.toLowerCase()) &&
    item.Visibility === "Публичный"
  );

  return (
    <div className="Published">
      <h1>Опубликованные проекты</h1>
      <input
        type="text"
        placeholder="Поиск"
        value={searchTerm}
        onChange={handleSearch}
      />

      {filteredProjects && filteredProjects.map((item, index) => (
        <div key={index} className="Published__item">
          <div className="Published__item-number">
            <p>{index + 1}</p>
          </div>
          <div className="Published__item-description">
            <h1>{item.NameProject}</h1>
            <p>{item.DescriptionProject}</p>
          </div>
          <img src={item.PhotoProject} alt={`Published ${index}`} />
          <div className="Published__item-button">
            <input
              type="button"
              value={"Удалить"}
              onClick={() => handleDelete(item.ProjectID)}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Published;
