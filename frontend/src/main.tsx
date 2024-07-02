import ReactDOM from 'react-dom/client';
import './styles/index.css';
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { routes } from "@/routes";
import { reduxStore } from "@/store/reduxStore.ts";
import Redux from "@/redux.tsx";

const router = createBrowserRouter([...routes]);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider store={reduxStore}>
        <RouterProvider router={router} />
        <Redux />
    </Provider>
);
