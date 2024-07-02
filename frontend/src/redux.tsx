import { useDispatch } from "react-redux";
import { tokenToRedux } from "./utils/redux";

const Redux = () => {
    const dispatch = useDispatch();
    const events = ["local-storage-updated", "storage"];
    events.forEach((event) => {
        window.addEventListener(event, () => {
            tokenToRedux(localStorage.getItem("token") || "", dispatch);
            if (!localStorage.getItem("token")) window.location.replace("/");
        });
    });
    tokenToRedux(localStorage.getItem("token") || "", dispatch);

    return null;
};

export default Redux;
