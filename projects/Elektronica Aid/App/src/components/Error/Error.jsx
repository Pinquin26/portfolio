import React from "react";
import style from "./Error.module.css";
import { useShop } from "../../context/ShopContext";

const Error = () => {
    const { error } = useShop();

    if (error)
        
        return (
            <section className={style.wrapper}>
                
                <p>{error}</p>
            </section>
        );
    else return null;
};

export default Error;
