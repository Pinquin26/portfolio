import React, { useEffect, useState } from "react";
import style from "./Webshop.module.css";
import Productcard from "../../components/Productcard/Productcard";
import { useShop } from "../../context/ShopContext";
import CreateProduct from "../../components/ProductForm/Create/CreateProduct";

const Webshop = () => {
    const { products, isLoading, error, user } = useShop();
    const [showCreate, setShowCreate] = useState(false);
    const [filteredData, setFilteredData] = useState(products);
    const [formData, setFormData] = useState({
        minPrice: "",
        maxPrice: "",
        categories: {
            Headset: false,
            Headphones: false,
            Smartphones: false,
            Laptops: false,
            Chargers: false,
        },
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleCategoryChange = (e) => {
        setFormData({
            ...formData,
            categories: {
                ...formData.categories,
                [e.target.name]: e.target.checked,
            },
        });
    };

    const handleCreate = () => {
        setShowCreate(true);
    };

    const handleCreateClose = () => {
        setShowCreate(false);
    };

    const filterAndSort = () => {
        let dataCopy = Object.values(products); // Converteer het object naar een array van waarden
        dataCopy = dataCopy.filter((dataItem) => {
            const price = parseFloat(dataItem.price);
            const minPrice = parseFloat(formData.minPrice);
            const maxPrice = parseFloat(formData.maxPrice);
            const categoryMatch = Object.keys(formData.categories).some(
                (category) =>
                    formData.categories[category] &&
                    dataItem.category === category
            );
            return (
                (!minPrice || price >= minPrice) &&
                (!maxPrice || price <= maxPrice) &&
                (categoryMatch ||
                    !Object.values(formData.categories).some((value) => value))
            );
        });
        // Sorteer de producten op prijs van laag naar hoog
        dataCopy.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
        setFilteredData(dataCopy);
    };

    useEffect(() => {
        if (products) {
            filterAndSort();
        }
    }, [products]);

    useEffect(() => {
        if (products) filterAndSort();
    }, [formData]);

    useEffect(() => {
        if (!isLoading && !error && products) filterAndSort();
    }, [isLoading, error]);

    return (
        <>
            <h1>Webshop</h1>
            <article className={style.webshop}>
                {user && user.admin ? (
                    <>
                        <button
                            className={style.addProductButton}
                            onClick={handleCreate}
                        >
                            {" "}
                            Voeg product toe
                        </button>
                        <CreateProduct
                            show={showCreate}
                            onClose={handleCreateClose}
                        />
                    </>
                ) : (
                    ""
                )}
                <section className={style.filter}>
                    <div className={style.price_filter}>
                        <label>Minimum prijs:</label>
                        <input
                            type="number"
                            className={style.priceInput}
                            name="minPrice"
                            value={formData.minPrice}
                            placeholder="0"
                            onChange={handleChange}
                        />
                    </div>
                    <div className={style.price_filter}>
                        <label>Maximum prijs:</label>
                        <input
                            type="number"
                            className={style.priceInput}
                            name="maxPrice"
                            value={formData.maxPrice}
                            placeholder="1500"
                            onChange={handleChange}
                        />
                    </div>
                    <div className={style.category_filter}>
                        {Object.keys(formData.categories).map((category) => (
                            <div key={category}>
                                <label>{category}</label>
                                <input
                                    type="checkbox"
                                    name={category}
                                    checked={formData.categories[category]}
                                    onChange={handleCategoryChange}
                                />
                            </div>
                        ))}
                    </div>
                </section>
                <section className={style.card__wrapper}>
                    {Object.values(filteredData).map((product) => {
                        return (
                            <Productcard
                                key={`product_${product.id}`}
                                productData={product}
                            />
                        );
                    })}
                </section>
            </article>
        </>
    );
};

export default Webshop;
