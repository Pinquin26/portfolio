// In RandomProducts.js
import React, { useState, useEffect } from "react";
import { useShop } from "../../context/ShopContext";
import Productcard from "../Productcard/Productcard";
import style from "./RandomProducts.module.css";

const RandomProducts = () => {
    const { products, isLoading, error } = useShop();
    const [randomProducts, setRandomProducts] = useState([]);
    
    useEffect(() => {
        const randomProducts = Object.values(products).sort(() => Math.random() - 0.5).slice(0, 5);

        setRandomProducts(randomProducts);
    console.log(randomProducts);

    }, [products]);

    return (
        <div>
            <h2>Voorgestelde producten</h2>

            <section className={style.card_wrapper}>
                {
                    Object.values(randomProducts).map((product) => (
                        <Productcard key={product.id} productData={product} />
                    ))
                }
            </section>
        </div>
    );
};

export default RandomProducts;
