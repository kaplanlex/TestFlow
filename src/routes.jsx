import { Link, createBrowserRouter } from "react-router-dom";

import Dashboard from "./pages/Dashboard/Dashboard";
import Home from "./pages/Home/Home";
import Layout from "./components/Layout/Layout";
import Projects from "./pages/Projects/Projects";
import Bugs from "./pages/Bugs/Bugs";
/*
  Временный компонент для страниц-заглушек.
  Позже каждую страницу можно будет вынести в отдельную папку pages.
*/

function PageStub({ title, description }) {
  return (
    <section className="container">
      <h1>{title}</h1>
      <p>{description}</p>

      <nav>
        <ul>
          <li>
            <Link to="/">Главная</Link>
          </li>
          <li>
            <Link to="/dashboard">Панель управления</Link>
          </li>
          <li>
            <Link to="/projects">Проекты</Link>
          </li>
          <li>
            <Link to="/test-cases">Тест-кейсы</Link>
          </li>
          <li>
            <Link to="/checklists">Чек-листы</Link>
          </li>
          <li>
            <Link to="/bugs">Баги</Link>
          </li>
          <li>
            <Link to="/kanban">Канбан</Link>
          </li>
          <li>
            <Link to="/settings">Настройки</Link>
          </li>
        </ul>
      </nav>
    </section>
  );
}

/*
  Страницы-заглушки приложения TestFlow.
*/

function TestCases() {
  return (
    <PageStub
      title="Тест-кейсы"
      description="Здесь будут создаваться и редактироваться тест-кейсы."
    />
  );
}

function Checklists() {
  return (
    <PageStub
      title="Чек-листы"
      description="Здесь будут чек-листы для быстрой проверки функциональности."
    />
  );
}

function Kanban() {
  return (
    <PageStub
      title="Канбан"
      description="Здесь будет канбан-доска для отслеживания задач и багов."
    />
  );
}

function Settings() {
  return (
    <PageStub
      title="Настройки"
      description="Здесь будут настройки профиля, темы и данных приложения."
    />
  );
}

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    element: <Layout />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/projects",
        element: <Projects />,
      },
      {
        path: "/test-cases",
        element: <TestCases />,
      },
      {
        path: "/checklists",
        element: <Checklists />,
      },
      {
        path: "/bugs",
        element: <Bugs />,
      },
      {
        path: "/kanban",
        element: <Kanban />,
      },
      {
        path: "/settings",
        element: <Settings />,
      },
    ],
  },
]);
