import { Navigate, Route, Routes } from "react-router-dom";
import Home from "../Home/Home";
import Detail from "../Detail/Detail";
import About from "../About/About";
import ROUTES from "../../consts/Routes";

const Authentication = () => {
    return (
        <Routes>
            <Route path={ROUTES.home} element={<Home />} />
            <Route path={ROUTES.about} element={<About />} />
            <Route path={ROUTES.detail.path} element={<Detail />} />
            <Route path="*" element={<Navigate to={ROUTES.home} />} />
        </Routes>
    );
}

export default Authentication;