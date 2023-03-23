import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import { Login } from "./components/forms/Login";
import { Navbar } from "./components/Navbar";
import { SignUp } from "./components/forms/SignUp";
import { Provider } from "react-redux";
import store from "./reducer/Store";
function App() {
  let router = createBrowserRouter([
    {
      path: "/",
      element: <Navbar />,
    },
    {
      path: "/SignUp",
      element: <SignUp />,
    },
    {
      path: "/Login",
      element: <Login />,
    },
  ]);
  return (
    <div className="App">
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </div>
  );
}

export default App;
