import { Suspense, lazy } from "react";
import {
  Navigate,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import { routes } from "./routes/routes";
import SuspenseLoader from "./components/common/SuspenseLoader";
import DataProvider from "./context/DataProvider";
import ChatBot from "./components/chatbot/Chatbot"; // adjust the path as needed

const ErrorComponent = lazy(() => import("./components/common/ErrorComponent"));

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route
        path={routes.main.path}
        element={<Navigate to={`${routes.emails.path}/inbox`} />}
      />
      <Route path={routes.main.path} element={<routes.main.element />}>
        <Route
          path={`${routes.emails.path}/:type`}
          element={<routes.emails.element />}
          errorElement={<ErrorComponent />}
        />
        <Route
          path={routes.view.path}
          element={<routes.view.element />}
          errorElement={<ErrorComponent />}
        />
      </Route>

      <Route
        path={routes.invalid.path}
        element={<Navigate to={`${routes.emails.path}/inbox`} />}
      />
    </Route>
  )
);

function App() {
  return (
    <Suspense fallback={<SuspenseLoader />}>
      <DataProvider>
        <RouterProvider router={router} />
        <ChatBot /> {/* 👈 This will float on all pages */}
      </DataProvider>
    </Suspense>
  );
}

export default App;
