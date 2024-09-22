import React, { useEffect, useState } from "react";
import { useShop } from "../../context/ShopContext";
import Loading from "../../components/Loading/Loading";
import style from "./Favorite.module.css";

const Favorite = () => {
    const { user, productService, products } = useShop();
    const [favoriteProducts, setFavoriteProducts] = useState([]);
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        console.log(user);
        async function fetchFavoriteProducts() {
            if (user && typeof user.favorites === "object") {
                const foundFavoriteProducts = [];
                for (const productId in user.favorites) {
                    if (user.favorites[productId]) {
                        const favoriteProduct =
                            await productService.getProductById(productId);
                        if (favoriteProduct) {
                            foundFavoriteProducts.push(favoriteProduct);
                        }
                    }
                }
                setFavoriteProducts(foundFavoriteProducts);
            }
        }
        fetchFavoriteProducts();
    }, [user, productService ]);

    // Verplaats de console.log naar een aparte useEffect
    useEffect(() => {
        console.log(favoriteProducts);
    }, [favoriteProducts]);

    const removeLike = async (e) => {
        productService.removeFavorite(e, user.id);
        setFavoriteProducts(
            favoriteProducts.filter((product) => product.id !== e)
        );
    };
    const handleCart = async (e) => {
        productService.addTocart(e, user.id);
        setShowPopup(true);
        setTimeout(() => setShowPopup(false), 3000);
    };

    // Controleer of de gebruiker favorieten heeft
    if ( !user.favorites || Object.keys(user.favorites).length === 0  ) {
        return <div className={style.container_empty}>Je hebt nog geen favorieten</div>;
    }

    
    return (
        <div className={style.container}>
            <h2 className={style.header}>Mijn favorieten</h2>
            <ul className={style.productList}>
                {favoriteProducts.map((product) => (
                    <li key={product.id} className={style.productItem}>
                        <a href={`/detail/${product.id}`}>
                            <div className={style.imageContainer}>
                                {product.images ? (
                                    product.images.map((imageSrc, index) => (
                                        <img
                                            key={index}
                                            src={imageSrc}
                                            alt={`Product afbeelding ${
                                                index + 1
                                            }`}
                                            className={style.productImage}
                                        />
                                    ))
                                ) : (
                                    <div className={style.placeholderImage}>
                                        <p>No picture available</p>
                                    </div>
                                )}
                            </div>
                            <div className={style.productDetails}>
                                <h3 className={style.productName}>
                                    {product.productName}
                                </h3>
                                <p className={style.productPrice}>
                                    <span>Prijs: €{product.price}</span>
                                </p>
                                <p className={style.productDescription}>
                                    {product.description.slice(0, 100)}...
                                </p>
                            </div>
                        </a>
                        <div className={style.icon__wrapper}>
                            <svg
                                width="30"
                                height="30"
                                viewBox="0 0 512 512"
                                xmlns="http://www.w3.org/2000/svg"
                                className={style.icon}
                                onClick={() => removeLike(product.id)}
                            >
                                <g fill="#ffffff">
                                    <path
                                        d="M375.026,46.268c-31.688,0-62.593,12.083-87.023,34.024c-1.109,0.995-1.989,2.215-2.588,3.579
				c-0.28,0.636-0.557,1.16-0.849,1.603l-34.157,51.588c-2.315,3.497-2.315,8.039,0,11.537l34.157,51.589
				c2.321,3.505,2.321,8.033,0.001,11.537l-34.158,51.592c-2.315,3.497-2.315,8.039,0,11.537l34.157,51.59
				c2.321,3.505,2.321,8.033,0,11.536l-34.159,51.6c-2.314,3.497-2.314,8.039,0.001,11.537l30.229,45.663
				c2.002,3.024,5.323,4.681,8.722,4.681c1.768,0,3.559-0.449,5.196-1.389c36.187-20.783,88.685-54.506,133.289-97.143
				C483.685,299.547,512,246.619,512,195.613C512,113.264,450.554,46.268,375.026,46.268z M292.615,427.013l-20.964-31.668
				l30.34-45.831c6.96-10.512,6.959-24.097-0.001-34.609l-30.338-45.822l30.339-45.823c6.96-10.513,6.96-24.097-0.001-34.61
				l-30.338-45.821l30.336-45.817c0.529-0.797,1.02-1.626,1.483-2.501c20.342-17.651,45.672-27.346,71.556-27.346
				c64.004,0.001,116.076,57.623,116.076,128.448C491.102,297.08,358.555,388.053,292.615,427.013z"
                                    />
                                    <path
                                        d="M225.345,401.113c-2.32-3.504-2.32-8.032,0-11.536l34.158-51.599c2.314-3.497,2.314-8.038-0.001-11.536l-34.157-51.591
				c-2.321-3.505-2.321-8.033-0.001-11.537l34.158-51.592c2.315-3.497,2.315-8.039,0-11.537l-34.157-51.59
				c-2.321-3.504-2.321-8.032,0-11.536l16.854-25.455c2.469-3.729,2.29-8.617-0.444-12.156
				c-26.11-33.798-64.302-53.182-104.781-53.182C61.446,46.268,0,113.264,0,195.613c0,57.885,36.172,117.873,107.512,178.292
				c54.559,46.209,113.524,78.786,136.342,90.649c1.528,0.794,3.179,1.178,4.815,1.178c2.892,0,5.738-1.199,7.772-3.461
				c3.186-3.54,3.575-8.785,0.946-12.757L225.345,401.113z M121.017,357.958C54.582,301.692,20.898,247.071,20.898,195.613
				c0-70.825,52.071-128.447,116.076-128.447c31.624,0,61.693,14.245,83.545,39.332l-12.598,19.026
				c-6.962,10.514-6.962,24.098,0,34.611l30.338,45.821l-30.339,45.823c-6.96,10.513-6.96,24.097,0.001,34.61l30.338,45.823
				l-30.34,45.831c-6.958,10.512-6.958,24.095,0,34.606c0,0,0,0,0,0.001l8.275,12.498
				C189.269,409.099,154.276,386.125,121.017,357.958z"
                                    />
                                </g>
                            </svg>
                            <svg
                                width="30"
                                height="30"
                                viewBox="0 0 902 902"
                                xmlns="http://www.w3.org/2000/svg"
                                className={style.icon}
                                onClick={() => handleCart(product.id)}
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
                    </li>
                ))}
            </ul>
            {showPopup && (
                <div className={style.popup}>
                    Product toegevoegd aan winkelwagen
                </div>
            )}
        </div>
    );
};

export default Favorite;
