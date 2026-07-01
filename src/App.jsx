import "./App.css";

import { AppProvider } from "./context/AppContext";
import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { router } from "./routes";

/*
  - ThemeProvider отвечает за тему интерфейса;
  - AppProvider отвечает за данные приложения;
  - RouterProvider отвечает за маршрутизацию.
*/

function App() {
  return (
    <ThemeProvider>
      <AppProvider>
        <div className="app">
          <RouterProvider router={router} />
        </div>
      </AppProvider>
    </ThemeProvider>
  );
}

export default App;
