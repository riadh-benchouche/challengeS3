import ReactDOM from 'react-dom/client'
import './styles/index.css'
import {Provider, useDispatch} from "react-redux"
import {tokenToRedux} from "./utils/redux"
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {routes} from "@/routes";
import {reduxStore} from "@/store/reduxStore.ts";

const Redux = () => {
    const dispatch = useDispatch()
    const events = ["local-storage-updated", "storage"]
    events.forEach((event) => {
        window.addEventListener(event, () => {
            tokenToRedux(localStorage.getItem("token") || "", dispatch)
            if (!localStorage.getItem("token")) window.location.replace("/")
        })
    })
    tokenToRedux(localStorage.getItem("token") || "", dispatch)

    return null
}
const router = createBrowserRouter([...routes])

ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider store={reduxStore}>
        <RouterProvider router={router}/>
        <Redux/>
    </Provider>
)
