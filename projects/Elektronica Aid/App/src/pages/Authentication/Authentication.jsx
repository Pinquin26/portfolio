

//-------------------
import React, { useEffect, useState } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Home from "../Home/Home";
import ROUTES from "../../consts/Routes";
import Webshop from "../Webshop/Webshop";
import Detail from "../Detail/Detail";
import Favorite from "../Favorite/Favorite";
import Shoppingcart from "../Shoppingcart/Shoppingcart";
import Account from "../Account/Account";
import Question from "../Question/Question";
import QuestionOverview from "../QuestionsOverview/QuestionOverview";
import { useShop } from "../../context/ShopContext";
import Login from "../Login/Login";
import About from "../About/About";
import Contact from "../Contact/Contact";
import Register from "../Register/Register";

const Authentication = () => {
    const { user, authService } = useShop();
    const location = useLocation();

    
    return (
        <Routes>
            <Route
                path={ROUTES.login}
                element={<Login authService={authService} />}
            />
            <Route path={ROUTES.register} element={<Register authService={authService} />} />
            <Route path={ROUTES.home} element={<Home />} />
            <Route path={ROUTES.webshop} element={<Webshop />} />
            <Route path={ROUTES.about} element={<About />} />
            <Route path={ROUTES.contact} element={<Contact />} />
            <Route path={ROUTES.detail.path} element={<Detail />} />
            {user ? (
                <Route path={ROUTES.question.path} element={<Question />} />
            ) : (
                <Route
                    path={ROUTES.question.path}
                    element={
                        <Login authService={authService} lastPage={location} />
                    }
                />
            )}
            {user && user.admin ? (
                <Route
                    path={ROUTES.questionOverview}
                    element={<QuestionOverview />}
                />
            ) : (
                <Route
                    path={ROUTES.questionOverview}
                    element={
                        <Login authService={authService} lastPage={location} />
                    }
                />
            )}

            {user ? (
                <Route path={ROUTES.favorite} element={<Favorite />} />
            ) : (
                <Route
                    path={ROUTES.favorite}
                    element={
                        <Login authService={authService} lastPage={location} />
                    }
                />
            )}

            {user ? (
                <Route path={ROUTES.shoppingcart} element={<Shoppingcart />} />
            ) : (
                <Route
                    path={ROUTES.shoppingcart}
                    element={
                        <Login authService={authService} lastPage={location} />
                    }
                />
            )}
            {user ? (
                <Route path={ROUTES.account} element={<Account />} />
            ) : (
                <Route
                    path={ROUTES.account}
                    element={
                        <Login authService={authService} lastPage={location} />
                    }
                />
            )}
        </Routes>
    );
};

export default Authentication;
