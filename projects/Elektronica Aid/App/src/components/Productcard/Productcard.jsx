import React, { useEffect, useState } from 'react';
import style from './Productcard.module.css';
import { useShop } from '../../context/ShopContext';

const Productcard = ({ productData }) => {
    const { productService, user } = useShop();
    const [popupContent, setPopupContent] = useState("");
    const [showPopup, setShowPopup] = useState(false);

    const handleLike = async () => {
        if (user.id) {
            productService.addFavorite(productData.id, user.id);
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
            productService.addTocart(productData.id, user.id);
            setPopupContent("Product toegevoegd aan winkelwagen");
            setShowPopup(true);
            setTimeout(() => setShowPopup(false), 3000);
        } else {
            setPopupContent("Log in om producten toe te voegen aan uw winkelwagen");
            setShowPopup(true);
            setTimeout(() => setShowPopup(false), 3000);
        }
    };

    const handleRemove = async () => {
        productService.deleteProduct(productData);
    };
    
    return (
        <div className={style.Productcard}>
            {user && user.admin ? (
                <svg
                    width="30"
                    height="30"
                    viewBox="0 0 508 508"
                    xmlns="http://www.w3.org/2000/svg"
                    className={style.icon_remove}
                    onClick={handleRemove}
                >
                    <g fill="#FF0000">
                        <g>
                            <path d="M204.5,408.2l-18.9-250.5c-0.6-7.8-7.4-13.6-15.1-13c-7.8,0.6-13.6,7.4-13,15.1l18.9,250.5c0.6,7.4,6.3,13.7,15.1,13 C199.3,422.7,205.1,415.9,204.5,408.2z" />
                        </g>
                    </g>
                    <g fill="#FF0000">
                        <g>
                            <path d="M337.5,144.7c-7.8-0.6-14.5,5.2-15.1,13l-18.9,250.5c-0.6,7.7,5.2,14.5,13,15.1c8.9,0.7,14.6-5.6,15.1-13l18.9-250.5 C351.1,152,345.3,145.3,337.5,144.7z" />
                        </g>
                    </g>
                    <g fill="#FF0000">
                        <g>
                            <path
                                d="M455.1,60h-136V35.3c0-19.5-15.8-35.3-35.3-35.3h-59.6c-19.5,0-35.3,15.8-35.3,35.3V60h-136c-7.8,0-14.1,6.3-14.1,14.1
                                s6.3,14.1,14.1,14.1h14.2l27.8,367.6c2.2,29.3,26.9,52.2,56.3,52.2h205.6c29.4,0,54.1-22.9,56.3-52.2l27.8-367.6h14.2
                                c7.8,0,14.1-6.3,14.1-14.1S462.9,60,455.1,60z M224.2,28.2h59.6c3.9,0,7.1,3.2,7.1,7.1V60h-73.7V35.3h-0.1
                                C217.1,31.4,220.3,28.2,224.2,28.2z M384.9,453.7c-1.1,14.6-13.5,26.1-28.1,26.1H151.2c-14.7,0-27-11.5-28.1-26.1L95.4,88.2h317.1
                                L384.9,453.7z"
                            />
                        </g>
                    </g>
                </svg>
            ) : (
                ""
            )}

            <a href={`/detail/${productData.id}`}>
                <div className={style.card_img} alt={productData.productName}>
                    {productData.images}
                </div>
                <div className={style.product_banner}>
                    <div className={style.product_title}>
                        <p>{productData.productName}</p>
                        <p>{productData.brand}</p>
                    </div>
                    <p>€{productData.price}</p>
                </div>
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
            {showPopup && <div className={style.popup}>{popupContent}</div>}
        </div>
    );
};

export default Productcard;