import { createContext, useContext } from "react";

import useLocalStorage from "../hooks/useLocalStorage";

const AppContext = createContext(null);

//   Начальные значения для хранилища приложения.

const DEFAULT_USER_NAME = "Тестировщик";

//   Функция для генерации текущей даты в формате YYYY-MM-DD.

function getCurrentDate() {
  return new Date().toISOString().slice(0, 10);
}

//   Функция для генерации уникального id.

function generateId() {
  return crypto.randomUUID();
}

//   Глобальный провайдер данных приложения TestFlow.
//   Все данные автоматически сохраняются в localStorage.

export function AppProvider({ children }) {
  const [projects, setProjects] = useLocalStorage("testflow_projects", []);
  const [bugs, setBugs] = useLocalStorage("testflow_bugs", []);
  const [testCases, setTestCases] = useLocalStorage("testflow_test_cases", []);
  const [checklists, setChecklists] = useLocalStorage(
    "testflow_checklists",
    [],
  );
  const [userName, setUserName] = useLocalStorage(
    "testflow_user_name",
    DEFAULT_USER_NAME,
  );

  // CRUD для проектов.

  function addProject(projectData) {
    const newProject = {
      ...projectData,
      id: generateId(),
      createdAt: getCurrentDate(),
    };

    setProjects((currentProjects) => [...currentProjects, newProject]);
  }

  function updateProject(projectId, updatedProjectData) {
    setProjects((currentProjects) =>
      currentProjects.map((project) => {
        if (project.id === projectId) {
          return {
            ...project,
            ...updatedProjectData,
          };
        }

        return project;
      }),
    );
  }

  function deleteProject(projectId) {
    setProjects((currentProjects) =>
      currentProjects.filter((project) => project.id !== projectId),
    );
  }

  // CRUD для багов.

  function addBug(bugData) {
    const newBug = {
      ...bugData,
      id: generateId(),
      createdAt: getCurrentDate(),
    };

    setBugs((currentBugs) => [...currentBugs, newBug]);
  }

  function updateBug(bugId, updatedBugData) {
    setBugs((currentBugs) =>
      currentBugs.map((bug) => {
        if (bug.id === bugId) {
          return {
            ...bug,
            ...updatedBugData,
          };
        }

        return bug;
      }),
    );
  }

  function deleteBug(bugId) {
    setBugs((currentBugs) => currentBugs.filter((bug) => bug.id !== bugId));
  }

  // CRUD для тест-кейсов.

  function addTestCase(testCaseData) {
    const newTestCase = {
      ...testCaseData,
      id: generateId(),
      createdAt: getCurrentDate(),
    };

    setTestCases((currentTestCases) => [...currentTestCases, newTestCase]);
  }

  function updateTestCase(testCaseId, updatedTestCaseData) {
    setTestCases((currentTestCases) =>
      currentTestCases.map((testCase) => {
        if (testCase.id === testCaseId) {
          return {
            ...testCase,
            ...updatedTestCaseData,
          };
        }

        return testCase;
      }),
    );
  }

  function deleteTestCase(testCaseId) {
    setTestCases((currentTestCases) =>
      currentTestCases.filter((testCase) => testCase.id !== testCaseId),
    );
  }

  // CRUD для чек-листов.

  function addChecklist(checklistData) {
    const newChecklist = {
      ...checklistData,
      id: generateId(),
      createdAt: getCurrentDate(),
    };

    setChecklists((currentChecklists) => [...currentChecklists, newChecklist]);
  }

  function updateChecklist(checklistId, updatedChecklistData) {
    setChecklists((currentChecklists) =>
      currentChecklists.map((checklist) => {
        if (checklist.id === checklistId) {
          return {
            ...checklist,
            ...updatedChecklistData,
          };
        }

        return checklist;
      }),
    );
  }

  function deleteChecklist(checklistId) {
    setChecklists((currentChecklists) =>
      currentChecklists.filter((checklist) => checklist.id !== checklistId),
    );
  }

  // Обновление имени пользователя.

  function updateUserName(newUserName) {
    setUserName(newUserName);
  }

  // Полная очистка данных приложения.

  function clearAllData() {
    setProjects([]);
    setBugs([]);
    setTestCases([]);
    setChecklists([]);
    setUserName(DEFAULT_USER_NAME);
  }

  const value = {
    projects,
    bugs,
    testCases,
    checklists,
    userName,

    addProject,
    updateProject,
    deleteProject,

    addBug,
    updateBug,
    deleteBug,

    addTestCase,
    updateTestCase,
    deleteTestCase,

    addChecklist,
    updateChecklist,
    deleteChecklist,

    updateUserName,
    clearAllData,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

//   Хук для удобного доступа к глобальному хранилищу приложения.

export function useAppContext() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useAppContext должен использоваться внутри AppProvider");
  }

  return context;
}
