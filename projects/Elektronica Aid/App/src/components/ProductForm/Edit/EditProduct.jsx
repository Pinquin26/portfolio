import React, { useEffect, useState } from 'react';
import style from './EditProduct.module.css';
import { useShop } from '../../../context/ShopContext';
const EditProduct = ({ show, product, onClose }) => {
    const { productService, error } = useShop();

    const [formData, setFormData] = useState({
        productId: 0,
        productName: product.productName,
        category: product.category,
        brand: product.brand,
        price: product.price,
        description: product.description,
        specifications: product.specifications,
        images: [],
        id: product.id,
    });

    useEffect(() => {
        if (show) {
            const editDiv = document.getElementById('editDiv');
            editDiv.classList.remove(style.hidden);
        }
    }, [show, product]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    const handleSpecificationChange = (key, value) => {
        setFormData({
            ...formData,
            specifications: {
                ...formData.specifications,
                [key]: value,
            },
        });
    };

    const handleSave = async () => {
        
        try {
            await productService.updatedProduct(formData);
        } catch (e) {
            console.log(e);
        }
        
        const editDiv = document.getElementById("editDiv");
        editDiv.classList.add(style.hidden);
        onClose();
    };

    return (
        <div id="editDiv" className={style.hidden}>
            <h2>Product bewerken</h2>
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
                    {Object.entries(formData.specifications).map(
                        ([key, value]) => (
                            <div key={key}>
                                <input
                                    type="text"
                                    value={key}
                                    onChange={(e) =>
                                        handleSpecificationChange(
                                            e.target.value,
                                            value
                                        )
                                    }
                                />
                                <input
                                    type="text"
                                    value={value}
                                    onChange={(e) =>
                                        handleSpecificationChange(
                                            key,
                                            e.target.value
                                        )
                                    }
                                />
                            </div>
                        )
                    )}
                </label>
                <button type="submit" onClick={handleSave} className={style.save}>
                    Opslaan
                </button>
            </form>
        </div>
    );
};

export default EditProduct;