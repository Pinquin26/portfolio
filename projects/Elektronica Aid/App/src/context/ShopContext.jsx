import React, { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import AuthService from "../services/AuthService";
import ProductService from "../services/ProductService";
import Login from "../pages/Login/Login";

const ShopContext = createContext();

const ShopProvider = ({ children }) => {
    const [products, setProducts] = useState({});
    const [questions, setQuestions] = useState({});
    const [user, setUser] = useState(false);
    const [error, setError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const authService = new AuthService({
        user: { user, setUser },
        loading: setIsLoading,
        error: setError,
    });

    const productService = new ProductService({
        user: { user, setUser },
        error: setError,
        setProducts,
        setQuestions,
    });

    useEffect(() => {
        productService.getAllProducts(setIsLoading);
    }, []);

    useEffect(() => {
        if (user?.admin) {
            productService.getAllQuestions(setIsLoading);
        }
    }, [user]);

    useEffect(() => {
        if (products) {
            productService.liveUpdate(products);
        }
    }, [products]);

    useEffect(() => {
        if (!user && authService.isLoggedIn) {
            authService.loginFromCookies();
        } 
    }, []);

    useEffect(() => {
        let isActive = true;
        if (isActive && error) setTimeout(() => setError(false), 5000);
        return () => {
            isActive = false;
        };
    }, [error]);

    return (
        <ShopContext.Provider
            value={{
                products,
                isLoading,
                error,
                user,
                authService,
                productService,
                questions,
            }}
        >
            {children}
        </ShopContext.Provider>
    );
};

export default ShopProvider;
export const useShop = () => useContext(ShopContext);
