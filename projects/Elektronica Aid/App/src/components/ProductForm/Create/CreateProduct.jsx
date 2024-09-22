import React, { useEffect, useState } from "react";
import { useShop } from "../../../context/ShopContext";
import style from "./CreateProduct.module.css";

const CreateProduct = ({ show, onClose }) => {
    const { productService, error } = useShop();

    const [formData, setFormData] = useState({
        productName: "",
        category: "",
        brand: "",
        price: "",
        description: "",
        specifications: {},
        images: [],
    });

    const [specifications, setSpecifications] = useState([
        { key: "", value: "" },
    ]);

    useEffect(() => {
        if (show) {
            const createDiv = document.getElementById("createDiv");
            createDiv.classList.remove(style.hidden);
        }
    }, [show]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSpecificationChange = (index, field, value) => {
        const newSpecifications = [...specifications];
        newSpecifications[index][field] = value;
        setSpecifications(newSpecifications);
    };

    const addSpecification = () => {
        setSpecifications([...specifications, { key: "", value: "" }]);
    };

    const handleSave = async (e) => {
        e.preventDefault();
        const updatedSpecifications = specifications.reduce((acc, spec) => {
            if (spec.key) acc[spec.key] = spec.value;
            return acc;
        }, {});
        const newProductData = {
            ...formData,
            specifications: updatedSpecifications,
        };
        try {
            await productService.createProduct(newProductData);
        } catch (e) {
            console.log(e);
        }

        const createDiv = document.getElementById("createDiv");
        createDiv.classList.add(style.hidden);
        onClose();
    };

    return (
        <div id="createDiv" className={style.hidden}>
            <form onSubmit={handleSave} className={style.admin_form}>
                <label>
                    Productnaam:
                    <input
                        type="text"
                        name="productName"
                        value={formData.productName}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Prijs:
                    <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Categorie:
                    <input
                        type="text"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Merk:
                    <input
                        type="text"
                        name="brand"
                        value={formData.brand}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Beschrijving:
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                    />
                </label>
                <label className={style.specs}>
                    Specificaties:
                    {specifications.map((spec, index) => (
                        <div key={index}>
                            <input
                                type="text"
                                placeholder="Naam"
                                value={spec.key}
                                onChange={(e) =>
                                    handleSpecificationChange(
                                        index,
                                        "key",
                                        e.target.value
                                    )
                                }
                            />
                            <input
                                type="text"
                                placeholder="Waarde"
                                value={spec.value}
                                onChange={(e) =>
                                    handleSpecificationChange(
                                        index,
                                        "value",
                                        e.target.value
                                    )
                                }
                            />
                        </div>
                    ))}
                    <button type="button" onClick={addSpecification}>
                        Specificatie toevoegen
                    </button>
                </label>
                <button type="submit" className={style.save}>
                    Opslaan
                </button>
            </form>
        </div>
    );
};

export default CreateProduct;
