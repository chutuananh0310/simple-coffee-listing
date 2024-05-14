import React, { Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Dashboard from "./pages/Dashboard/index.tsx";
import Api from "./common/api.ts";
import fetcher from "./utils/fetcher.ts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
  },
]);

const App = () => (
  <Suspense fallback={null}>
    <Api.Provider config={{ fetcher: fetcher }}>
      <RouterProvider router={router} />
    </Api.Provider>
  </Suspense>
);

export default App;
