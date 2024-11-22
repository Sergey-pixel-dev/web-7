import { Component } from "react";
import { TodoPage } from "../pages/TodoPage/TodoPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout } from "../pages/Layout";
import { AppContext } from "./context";
import { HelloPage } from "../pages/HelloPage";
import { QueryPage } from "../pages/QueryPage";
import { CountPage } from "../pages/CountPage";
export const BASE_URL = "http://localhost:8081/";
// Создание роутера приложения, который в зависимости от url отрисовывает
// определенную компоненту
// Ссылка на документацию: https://reactrouter.com/en/main/start/tutorial (демонстрация нового API)
// Ссылка на видеокурс по маршрутизации: https://www.youtube.com/playlist?list=PLiZoB8JBsdznY1XwBcBhHL9L7S_shPGVE (старый API, но смысл такой же)
const router = createBrowserRouter([
  {
    // Корневая компонента по url: "/". Она отрисовывает лэйаут приложения,
    // куда подставляется контент странички
    path: "/",
    element: <Layout />,
    // Вложенные роуты, которые будут подставляться в лэйаут
    children: [
      {
        // Это свойство позволяет задать элемент по умолчанию для родительского роута
        // То есть, если в адресной строке url будет "/", то отрисуется этот element
        index: true,
        element: <h1>Главная страница</h1>,
      },
      {
        path: "/hello",
        element: <HelloPage />,
      },
      {
        path: "/count",
        element: <CountPage />,
      },
      {
        path: "/query",
        element: <QueryPage />,
      },
      {
        path: "/login",
        element: <h1>Логин</h1>,
      },
      {
        path: "/todos",
        element: <TodoPage />,
        index: true,
      },
      {
        path: "/register",
        element: <h1>Регистрация</h1>,
      },
    ],
  },
  {
    // Другой корневой url-путь, который тоже может содержать лейаут, а может и нет
    path: "/root",
    element: <h2>Другой лейаут</h2>,
  },
]);

// Компонента приложения, которая содержит состояние приложения. Именно она вмортируется в div#root, который
// описан в index.html
export class App extends Component {
  constructor(props) {
    super(props); //для вызова инициализатора родительского класса

    // Задаем объект пользователя
    this.state = {
      user: undefined,
    };
  }

  // Метод отрисовки компоненты
  render() {
    return (
      // Провайдинг контекста. Контекст работает по принципу шины. Через него компонента App
      // предоставляет данные дочерним компонентам. Использование контекста позволяет избежать такой проблемы
      // как props drilling или сквозной передачи пропсов через множество компонент.
      // Контекст имеет пропс value, куда мы передаем объект, содержащий данные контекста
      // Видеоролик по React Context: https://www.youtube.com/watch?v=W_-TO_reSGs
      // В этом ролике автор показывает синтаксис работы с контекстом для функциональных компонент. В целом можете использовать пример,
      // который рассматривали на семинар, но так же можете воспользоваться примером из урока
      <AppContext.Provider
        value={{
          user: this.state.user,
          login: this.#login.bind(this),
          logout: this.#logout.bind(this),
        }}
      >
        {/* // Компонента провайдинга роутера. Ее использование важно для работы маршрутизации приложения
                // Чтобы роутер заработал, ему необходмо передатать объект конфигурации роутера в качестве пропса */}
        <RouterProvider router={router} />
      </AppContext.Provider>
    );
  }

  // Метод, имитирующий процесс авторизации пользователя
  #login() {
    this.setState({
      user: {
        name: "Вася Пупкин",
        email: "Почта",
      },
    });
  }

  // Метод, имитирующий процесс выхода из приложения
  #logout() {
    this.setState({
      user: undefined,
    });
  }
}
