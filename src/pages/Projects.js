import React, { useEffect, useState } from "react";
import axios from 'axios';
import "../style/projects.scss";
import pencil from "../image/pencil.png";
import { Link } from 'react-router-dom';
const Projects = () => {
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

  const handlePublish = (id) => {
    const apiUrl = 'http://74.119.192.138:5000/api/projects/visibility';

    const publishData = {
      id: id,
      visibility: 'Публичный',
    };

    axios.put(apiUrl, publishData).then((resp) => {
      console.log(resp.data);
      fetchData();
      alert('Проект опубликован');
    }).catch((error) => {
      alert('Ошибка при публикации проекта:', error);
    });
  };

  const filteredProjects = data.filter((item) =>
    item.NameProject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="Projects">
      <h1>Проекты</h1>
      
      <input
        type="text"
        placeholder="Поиск"
        value={searchTerm}
        onChange={handleSearch}
      />
      
      {filteredProjects.map((item, index) => (
        <div key={index} className="Projects__item">
          <div className="Projects__item-number">
            <p>{index + 1}</p>
          </div>
          <div className="Projects__item-description">
            <h1>{item.NameProject}</h1>
            <p>{item.DescriptionProject} {item.Status}</p>
          </div>
          <img src={item.PhotoProject} alt={`Project ${index}`} />
          <div className="Projects__item-button">
          <input
              type="button"
              value={"Удалить"}
              onClick={() => handleDelete(item.ProjectID)}
            />
            <input
              type="button"
              value={"Опубликовать"}
              disabled={item.Visibility === 'Публичный'}
              style={{ backgroundColor: item.Visibility === 'Публичный' ? ' gray ' : 'green' }}
              onClick={() => handlePublish(item.ProjectID)}
              
              
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Projects;