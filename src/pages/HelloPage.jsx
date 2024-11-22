import React, { Component } from "react";
import { BASE_URL } from "../app/App";
export class HelloPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      isLoading: true,
    };
  }

  componentDidMount() {
    this.fetchMessage();
  }

  fetchMessage() {
    const url = `${BASE_URL}hello/`;
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        this.setState({ message: data.msg, isLoading: false });
      })
      .catch((error) => {
        console.error("Error fetching the message:", error);
        this.setState({ message: "Error loading message", isLoading: false });
      });
  }

  render() {
    return (
      <div>
        <h1>Hello Page</h1>
        {(this.state.isLoading && (
          <div className="loader">Загрузка...</div>
        )) || <p>{this.state.message}</p>}
      </div>
    );
  }
}
