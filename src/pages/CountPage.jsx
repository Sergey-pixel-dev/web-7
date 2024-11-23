import React, { Component } from "react";
import { BASE_URL } from "../app/App";

export class CountPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: "",
      isLoading: true,
      error: null,
      inputCount: "",
    };
  }

  componentDidMount() {
    this.fetchCount();
  }

  fetchCount() {
    const url = `${BASE_URL}count/`;
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Ошибка сети");
        }
        return response.json();
      })
      .then((data) => {
        this.setState({ count: data.count, isLoading: false });
      })
      .catch((error) => {
        console.error("Ошибка при получении числа:", error);
        this.setState({ error: error, isLoading: false });
      });
  }

  handleInputChange = (event) => {
    const value = event.target.value;
    if (/^\d*$/.test(value)) {
      this.setState({ inputCount: value });
    }
  };

  handleSubmit = () => {
    const { inputCount } = this.state;

    if (inputCount === "") {
      alert("Введите корректное число");
      return;
    }

    const url = `${BASE_URL}count/`;
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ count: inputCount }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Не удалось обновить число");
        }
        return response.json();
      })
      .then(() => {
        this.fetchCount();
        this.setState({ inputCount: "" });
      })
      .catch((error) => {
        console.error("Ошибка при обновлении числа:", error);
        this.setState({ error: error });
      });
  };

  render() {
    const { count, isLoading, error, inputCount } = this.state;

    return (
      <div>
        <h1>Page Count</h1>

        {isLoading ? (
          <div className="loader">Загрузка...</div>
        ) : error ? (
          <p>Ошибка: {error.message}</p>
        ) : (
          <p>Текущее значение: {count}</p>
        )}

        <div>
          <input
            type="text"
            value={inputCount}
            onChange={this.handleInputChange}
            placeholder="Введите число"
          />
          <button onClick={this.handleSubmit}>Обновить значение</button>
        </div>
      </div>
    );
  }
}
