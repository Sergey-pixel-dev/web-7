import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { BASE_URL } from "../app/App";

export const QueryPage = () => {
  const location = useLocation(); // Получаем объект location
  const [state, setState] = useState({
    name: "",
    WasError: false,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    const fetchMessage = () => {
      const queryParams = new URLSearchParams(location.search || "");
      const name = queryParams.get("name") || "";

      if (!name) {
        setState({
          isLoading: false,
          WasError: true,
          error: "Параметр 'name' отсутствует",
        });
        return;
      }

      const url = `${BASE_URL}query/?name=${encodeURIComponent(name)}`;

      fetch(url)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Сетевая ошибка");
          }
          return response.json();
        })
        .then((data) => {
          setState({
            name: data.name || "Unnamed",
            isLoading: false,
            WasError: false,
            error: null,
          });
        })
        .catch((error) => {
          setState({
            name: "Error loading name",
            isLoading: false,
            WasError: true,
            error: error.message || "Неизвестная ошибка",
          });
        });
    };

    fetchMessage();
  }, [location.search]);

  const { isLoading, WasError, error, name } = state;

  return (
    <div>
      <h1>Query Page</h1>
      {isLoading ? (
        <div className="loader">Загрузка...</div>
      ) : WasError ? (
        <p>Произошла ошибка: {error || "Неизвестная ошибка"}</p>
      ) : (
        <p>Hello, {name}!</p>
      )}
    </div>
  );
};

export default QueryPage;
