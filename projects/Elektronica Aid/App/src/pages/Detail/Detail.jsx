import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import style from "./Detail.module.css";
import { useShop } from "../../context/ShopContext";
import EditProduct from "../../components/ProductForm/Edit/EditProduct";

const ProductDetail = () => {
    const { productId } = useParams();
    const { products, productService, user } = useShop();
    const [product, setProduct] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [showEdit, setShowEdit] = useState(false);
    const [popupContent, setPopupContent] = useState("");
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        const fetchProduct = async () => {
            if (products[productId]) {
                setProduct(products[productId]);
                setIsLoading(false);
            } else {
                const fetchedProduct = await productService.getProductById(
                    productId
                );
                setProduct(fetchedProduct);
                setIsLoading(false);
            }
        };

        fetchProduct();
    }, [productId, products, productService]);

    const handleLike = async () => {
        if (user.id) {
            productService.addFavorite(product.id, user.id);
            setPopupContent("Product toegevoegd aan favorieten");
            setShowPopup(true);
            setTimeout(() => setShowPopup(false), 3000);
        } else {
            setPopupContent("Log in om favorieten toe te voegen");
            setShowPopup(true);
            setTimeout(() => setShowPopup(false), 3000);
        
        }
    };

    const handleCart = async () => {
        if (user.id) {
            productService.addTocart(product.id, user.id);
            setPopupContent("Product toegevoegd aan winkelwagen");
            setShowPopup(true);
            setTimeout(() => setShowPopup(false), 3000);
        } else {
            setPopupContent("Log in om producten toe te voegen aan uw winkelwagen");
            setShowPopup(true);
            setTimeout(() => setShowPopup(false), 3000);
        }
    };

    const handleEdit = () => {
        setShowEdit(true);
    };
    const handleEditClose = () => {
        setShowEdit(false);
    };

    if (isLoading) {
        return <div>Product laden...</div>;
    }

    if (!product) {
        return <div>Product niet gevonden.</div>;
    }

    return (
        <div className={style.container}>
            {user && user.admin ? (
                <>
                    <svg
                        width="30"
                        height="30"
                        viewBox="0 0 306.637 306.637"
                        xmlns="http://www.w3.org/2000/svg"
                        className={style.icon_edit}
                        onClick={handleEdit}
                    >
                        <g>
                            <path d="M12.809,238.52L0,306.637l68.118-12.809l184.277-184.277l-55.309-55.309L12.809,238.52z M60.79,279.943l-41.992,7.896 l7.896-41.992L197.086,75.455l34.096,34.096L60.79,279.943z" />
                            <path d="M251.329,0l-41.507,41.507l55.308,55.308l41.507-41.507L251.329,0z M231.035,41.507l20.294-20.294l34.095,34.095 L265.13,75.602L231.035,41.507z" />
                        </g>
                    </svg>

                    <EditProduct
                        show={showEdit}
                        product={product}
                        onClose={handleEditClose}
                    />
                </>
            ) : (
                ""
            )}
            <div className={style.product_header}>
                <h1>{product.productName}</h1>
                <p>(€{product.price})</p>
            </div>
            <div className={style.product_info}>
                <div className={style.product_images}>
                    {product.images
                        ? product.images.map((imageSrc, index) => (
                              <img
                                  key={index}
                                  src={imageSrc}
                                  alt={`Product afbeelding ${index + 1}`}
                              />
                          ))
                        : null}
                </div>
                <div className={style.product_details}>
                    <h2>Productdetails</h2>
                    <p>
                        <strong>Prijs:</strong> €{product.price}
                    </p>
                    <p>
                        <strong>Categorie:</strong> {product.category}
                    </p>
                    <p>
                        <strong>Merk:</strong> {product.brand}
                    </p>
                    <p>
                        <strong>Beschrijving:</strong> {product.description}
                    </p>
                    <div className={style.button__wrapper}>
                        <a href={`/question/${product.id}`}>
                            <button className={style.questionButton}>
                                Vragen over dit product?
                            </button>
                        </a>
                        <div className={style.icon__wrapper}>
                            <svg
                                width="30"
                                height="30"
                                viewBox="0 0 471.701 471.701"
                                xmlns="http://www.w3.org/2000/svg"
                                className={style.icon}
                                onClick={handleLike}
                            >
                                <g fill="#FFFFFF">
                                    <path
                                        d="M433.601,67.001c-24.7-24.7-57.4-38.2-92.3-38.2s-67.7,13.6-92.4,38.3l-12.9,12.9l-13.1-13.1
                                            c-24.7-24.7-57.6-38.4-92.5-38.4c-34.8,0-67.6,13.6-92.2,38.2c-24.7,24.7-38.3,57.5-38.2,92.4c0,34.9,13.7,67.6,38.4,92.3
                                            l187.8,187.8c2.6,2.6,6.1,4,9.5,4c3.4,0,6.9-1.3,9.5-3.9l188.2-187.5c24.7-24.7,38.3-57.5,38.3-92.4
                                            C471.801,124.501,458.301,91.701,433.601,67.001z M414.401,232.701l-178.7,178l-178.3-178.3c-19.6-19.6-30.4-45.6-30.4-73.3
                                            s10.7-53.7,30.3-73.2c19.5-19.5,45.5-30.3,73.1-30.3c27.7,0,53.8,10.8,73.4,30.4l22.6,22.6c5.3,5.3,13.8,5.3,19.1,0l22.4-22.4
                                            c19.6-19.6,45.7-30.4,73.3-30.4c27.6,0,53.6,10.8,73.2,30.3c19.6,19.6,30.3,45.6,30.3,73.3
                                            C444.801,187.101,434.001,213.101,414.401,232.701z"
                                    />
                                </g>
                            </svg>

                            <svg
                                width="30"
                                height="30"
                                viewBox="0 0 902 902"
                                xmlns="http://www.w3.org/2000/svg"
                                className={style.icon}
                                onClick={handleCart}
                            >
                                <g fill="#FFFFFF">
                                    <path d="M671.504,577.829l110.485-432.609H902.86v-68H729.174L703.128,179.2L0,178.697l74.753,399.129h596.751V577.829z M685.766,247.188l-67.077,262.64H131.199L81.928,246.756L685.766,247.188z" />
                                    <path
                                        d="M578.418,825.641c59.961,0,108.743-48.783,108.743-108.744s-48.782-108.742-108.743-108.742H168.717
                                        c-59.961,0-108.744,48.781-108.744,108.742s48.782,108.744,108.744,108.744c59.962,0,108.743-48.783,108.743-108.744
                                        c0-14.4-2.821-28.152-7.927-40.742h208.069c-5.107,12.59-7.928,26.342-7.928,40.742
                                        C469.675,776.858,518.457,825.641,578.418,825.641z M209.46,716.897c0,22.467-18.277,40.744-40.743,40.744
                                        c-22.466,0-40.744-18.277-40.744-40.744c0-22.465,18.277-40.742,40.744-40.742C191.183,676.155,209.46,694.432,209.46,716.897z
                                        M619.162,716.897c0,22.467-18.277,40.744-40.743,40.744s-40.743-18.277-40.743-40.744c0-22.465,18.277-40.742,40.743-40.742
                                        S619.162,694.432,619.162,716.897z"
                                    />
                                </g>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
            <div className={style.product_specifications}>
                <h3>Specificaties</h3>
                <table>
                    <tbody>
                        {Object.entries(product.specifications).map(
                            ([key, value], index) => (
                                <tr key={index}>
                                    <td>
                                        <strong>{key}</strong>
                                    </td>
                                    <td>{value}</td>
                                </tr>
                            )
                        )}
                    </tbody>
                </table>
            </div>
            {showPopup && <div className={style.popup}>{popupContent}</div>}
        </div>
    );
};

export default ProductDetail;
