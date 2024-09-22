// import React, { useEffect, useState } from "react";
// import { useShop } from "../../context/ShopContext";
// import style from "./Shoppingcart.module.css";

// const Shoppingcart = () => {
//     const { user, productService } = useShop();
//     const [cartProducts, setCartProducts] = useState([]);
//     const [quantities, setQuantities] = useState({});
//     const [showPopup, setShowPopup] = useState(false);

//     useEffect(() => {
//         async function fetchCartProducts() {
//             if (user && typeof user.shoppingcart === "object") {
//                 const foundCartProducts = [];
//                 const quantities = {};
//                 for (const productId in user.shoppingcart) {
//                     if (user.shoppingcart[productId]) {
//                         const cartProduct = await productService.getProductById(
//                             productId
//                         );
//                         if (cartProduct) {
//                             foundCartProducts.push(cartProduct);
//                             quantities[productId] =
//                                 user.shoppingcart[productId].quantity || 1;
//                         }
//                     }
//                 }
//                 setCartProducts(foundCartProducts);
//                 setQuantities(quantities);
//             }
//         }
//         fetchCartProducts();
//     }, [user, productService]);

//     const handleQuantityChange = (productId, newQuantity) => {
//         const updatedQuantities = {
//             ...quantities,
//             [productId]: newQuantity,
//         };
//         setQuantities(updatedQuantities);
//         const updatedShoppingCart = {
//             ...user.shoppingcart,
//             [productId]: {
//                 ...user.shoppingcart[productId],
//                 quantity: newQuantity,
//             },
//         };
//         productService.updateCart(user.id, updatedShoppingCart);
//     };

//     const removeCart = async (productId) => {
//         const updatedShoppingCart = { ...user.shoppingcart };
//         delete updatedShoppingCart[productId];
//         await productService.removeFromCart(productId, user.id);
//         setCartProducts(
//             cartProducts.filter((product) => product.id !== productId)
//         );
//         setQuantities((prevQuantities) => {
//             const newQuantities = { ...prevQuantities };
//             delete newQuantities[productId];
//             return newQuantities;
//         });
//         productService.updateCart(user.id, updatedShoppingCart);
//     };

//     const handleLike = async (productId) => {
//         productService.addFavorite(productId, user.id);
//         setShowPopup(true);
//         setTimeout(() => setShowPopup(false), 3000);
//     };

//     if (!user.shoppingcart ||  Object.keys(user.shoppingcart).length === 0) {
//         return (
//             <div className={style.container_empty}>
//                 Je hebt nog geen producten in je winkelmandje
//             </div>
//         );
//     }

//     return (
//         <div className={style.container}>
//             <h2 className={style.header}>Mijn winkelmandje</h2>
//             <ul className={style.productList}>
//                 {cartProducts.map((product) => (
//                     <div className={style.productWrapper} key={product.id}>
//                         <li className={style.productItem}>
//                             <a href={`/detail/${product.id}`}>
//                                 <div className={style.imageContainer}>
//                                     {product.images ? (
//                                         product.images.map(
//                                             (imageSrc, index) => (
//                                                 <img
//                                                     key={index}
//                                                     src={imageSrc}
//                                                     alt={`Product afbeelding ${
//                                                         index + 1
//                                                     }`}
//                                                     className={
//                                                         style.productImage
//                                                     }
//                                                 />
//                                             )
//                                         )
//                                     ) : (
//                                         <div className={style.placeholderImage}>
//                                             <p>No picture available</p>
//                                         </div>
//                                     )}
//                                 </div>
//                                 <div className={style.productDetails}>
//                                     <h3 className={style.productName}>
//                                         {product.productName}
//                                     </h3>
//                                     <p className={style.productPrice}>
//                                         <span>Prijs: €{product.price}</span>
//                                     </p>
//                                     <p className={style.productDescription}>
//                                         {product.description.slice(0, 100)}...
//                                     </p>
//                                 </div>
//                             </a>
//                             <div className={style.icon__wrapper}>
//                                 <svg
//                                     width="30"
//                                     height="30"
//                                     viewBox="0 0 508 508"
//                                     xmlns="http://www.w3.org/2000/svg"
//                                     className={style.icon}
//                                     onClick={() => removeCart(product.id)}
//                                 >
//                                     <g fill="#ffffff">
//                                         <g>
//                                             <path d="M204.5,408.2l-18.9-250.5c-0.6-7.8-7.4-13.6-15.1-13c-7.8,0.6-13.6,7.4-13,15.1l18.9,250.5c0.6,7.4,6.3,13.7,15.1,13 C199.3,422.7,205.1,415.9,204.5,408.2z" />
//                                         </g>
//                                     </g>
//                                     <g fill="#ffffff">
//                                         <g>
//                                             <path d="M337.5,144.7c-7.8-0.6-14.5,5.2-15.1,13l-18.9,250.5c-0.6,7.7,5.2,14.5,13,15.1c8.9,0.7,14.6-5.6,15.1-13l18.9-250.5 C351.1,152,345.3,145.3,337.5,144.7z" />
//                                         </g>
//                                     </g>
//                                     <g fill="#ffffff">
//                                         <g>
//                                             <path
//                                                 d="M455.1,60h-136V35.3c0-19.5-15.8-35.3-35.3-35.3h-59.6c-19.5,0-35.3,15.8-35.3,35.3V60h-136c-7.8,0-14.1,6.3-14.1,14.1
//                                     s6.3,14.1,14.1,14.1h14.2l27.8,367.6c2.2,29.3,26.9,52.2,56.3,52.2h205.6c29.4,0,54.1-22.9,56.3-52.2l27.8-367.6h14.2
//                                     c7.8,0,14.1-6.3,14.1-14.1S462.9,60,455.1,60z M224.2,28.2h59.6c3.9,0,7.1,3.2,7.1,7.1V60h-73.7V35.3h-0.1
//                                     C217.1,31.4,220.3,28.2,224.2,28.2z M384.9,453.7c-1.1,14.6-13.5,26.1-28.1,26.1H151.2c-14.7,0-27-11.5-28.1-26.1L95.4,88.2h317.1
//                                     L384.9,453.7z"
//                                             />
//                                         </g>
//                                     </g>
//                                 </svg>
//                                 <svg
//                                     className={style.icon}
//                                     onClick={() => handleLike(product.id)}
//                                     xmlns="http://www.w3.org/2000/svg"
//                                     viewBox="0 0 471.701 471.701"
//                                 >
//                                     <g fill="#FFFFFF">
//                                         <path
//                                             d="M433.601,67.001c-24.7-24.7-57.4-38.2-92.3-38.2s-67.7,13.6-92.4,38.3l-12.9,12.9l-13.1-13.1
//                                     c-24.7-24.7-57.6-38.4-92.5-38.4c-34.8,0-67.6,13.6-92.2,38.2c-24.7,24.7-38.3,57.5-38.2,92.4c0,34.9,13.7,67.6,38.4,92.3
//                                     l187.8,187.8c2.6,2.6,6.1,4,9.5,4c3.4,0,6.9-1.3,9.5-3.9l188.2-187.5c24.7-24.7,38.3-57.5,38.3-92.4
//                                     C471.801,124.501,458.301,91.701,433.601,67.001z M414.401,232.701l-178.7,178l-178.3-178.3c-19.6-19.6-30.4-45.6-30.4-73.3
//                                     s10.7-53.7,30.3-73.2c19.5-19.5,45.5-30.3,73.1-30.3c27.7,0,53.8,10.8,73.4,30.4l22.6,22.6c5.3,5.3,13.8,5.3,19.1,0l22.4-22.4
//                                     c19.6-19.6,45.7-30.4,73.3-30.4c27.6,0,53.6,10.8,73.2,30.3c19.6,19.6,30.3,45.6,30.3,73.3
//                                     C444.801,187.101,434.001,213.101,414.401,232.701z"
//                                         />
//                                     </g>
//                                 </svg>
//                             </div>
//                         </li>

//                         <div className={style.quantityContainer}>
//                             <label htmlFor={`quantity-${product.id}`}>
//                                 Hoeveelheid:{" "}
//                             </label>
//                             <input
//                                 id={`quantity-${product.id}`}
//                                 type="number"
//                                 min="1"
//                                 value={quantities[product.id]}
//                                 onChange={(e) =>
//                                     handleQuantityChange(
//                                         product.id,
//                                         parseInt(e.target.value)
//                                     )
//                                 }
//                             />
//                         </div>
//                     </div>
//                 ))}
//             </ul>
//             <div className={style.totalPrice}>
//                 <p>
//                     Totaal: €
//                     {Math.round(
//                         cartProducts.reduce(
//                             (total, product) =>
//                                 total + product.price * quantities[product.id],
//                             0
//                         ) * 100
//                     ) / 100}
//                 </p>
//             </div>
//             {showPopup && (
//                 <div className={style.popup}>
//                     Product toegevoegd aan favorieten
//                 </div>
//             )}
//         </div>
//     );
// };

// export default Shoppingcart;

import React, { useEffect, useState } from "react";
import { useShop } from "../../context/ShopContext";
import style from "./Shoppingcart.module.css";
import { Navigate, Route } from "react-router-dom";
import ROUTES from "../../consts/Routes";

const Shoppingcart = () => {
    const { user, productService } = useShop();
    const [cartProducts, setCartProducts] = useState([]);
    const [quantities, setQuantities] = useState({});
    const [showPopup, setShowPopup] = useState(false);
    const [popupContent, setPopupContent] = useState("");
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        async function fetchCartProducts() {
            if (user && typeof user.shoppingcart === "object") {
                const foundCartProducts = [];
                const quantities = {};
                for (const productId in user.shoppingcart) {
                    if (user.shoppingcart[productId]) {
                        const cartProduct = await productService.getProductById(
                            productId
                        );
                        if (cartProduct) {
                            foundCartProducts.push(cartProduct);
                            quantities[productId] =
                                user.shoppingcart[productId].quantity || 1;
                        }
                    }
                }
                setCartProducts(foundCartProducts);
                setQuantities(quantities);
            }
        }
        fetchCartProducts();
    }, [user, productService]);

    const handleQuantityChange = (productId, newQuantity) => {
        const updatedQuantities = {
            ...quantities,
            [productId]: newQuantity,
        };
        setQuantities(updatedQuantities);
        const updatedShoppingCart = {
            ...user.shoppingcart,
            [productId]: {
                ...user.shoppingcart[productId],
                quantity: newQuantity,
            },
        };
        productService.updateCart(user.id, updatedShoppingCart);
    };

    const removeCart = async (productId) => {
        const updatedShoppingCart = { ...user.shoppingcart };
        delete updatedShoppingCart[productId];
        await productService.removeFromCart(productId, user.id);
        setCartProducts(
            cartProducts.filter((product) => product.id !== productId)
        );
        setQuantities((prevQuantities) => {
            const newQuantities = { ...prevQuantities };
            delete newQuantities[productId];
            return newQuantities;
        });
        productService.updateCart(user.id, updatedShoppingCart);
    };

    const handleLike = async (productId) => {
        productService.addFavorite(productId, user.id);
        setPopupContent("Product toegevoegd aan favorieten");
        setShowPopup(true);
        setTimeout(() => setShowPopup(false), 3000);
    };

    const handlePay = async () => {
        setShowForm(false);
        setPopupContent("Bedankt voor uw bestelling");
        setShowPopup(true);
        setTimeout(() => setShowPopup(false), 3000);

        const updatedShoppingCart = {};
        await productService.updateCart(user.id, updatedShoppingCart);

        window.location.href = ROUTES.home;
    };

    const toggleForm = () => {
        setShowForm(!showForm);
    };

    if (!user.shoppingcart || Object.keys(user.shoppingcart).length === 0) {
        return (
            <div className={style.container_empty}>
                Je hebt nog geen producten in je winkelmandje
            </div>
        );
    }

    return (
        <div className={style.container}>
            <h2 className={style.header}>Mijn winkelmandje</h2>
            <ul className={style.productList}>
                {cartProducts.map((product) => (
                    <div className={style.productWrapper} key={product.id}>
                        <li className={style.productItem}>
                            <a href={`/detail/${product.id}`}>
                                <div className={style.imageContainer}>
                                    {product.images ? (
                                        product.images.map(
                                            (imageSrc, index) => (
                                                <img
                                                    key={index}
                                                    src={imageSrc}
                                                    alt={`Product afbeelding ${
                                                        index + 1
                                                    }`}
                                                    className={
                                                        style.productImage
                                                    }
                                                />
                                            )
                                        )
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
                                    viewBox="0 0 508 508"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className={style.icon}
                                    onClick={() => removeCart(product.id)}
                                >
                                    <g fill="#ffffff">
                                        <g>
                                            <path d="M204.5,408.2l-18.9-250.5c-0.6-7.8-7.4-13.6-15.1-13c-7.8,0.6-13.6,7.4-13,15.1l18.9,250.5c0.6,7.4,6.3,13.7,15.1,13 C199.3,422.7,205.1,415.9,204.5,408.2z" />
                                        </g>
                                    </g>
                                    <g fill="#ffffff">
                                        <g>
                                            <path d="M337.5,144.7c-7.8-0.6-14.5,5.2-15.1,13l-18.9,250.5c-0.6,7.7,5.2,14.5,13,15.1c8.9,0.7,14.6-5.6,15.1-13l18.9-250.5 C351.1,152,345.3,145.3,337.5,144.7z" />
                                        </g>
                                    </g>
                                    <g fill="#ffffff">
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
                                <svg
                                    className={style.icon}
                                    onClick={() => handleLike(product.id)}
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 471.701 471.701"
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
                            </div>
                        </li>
                        <div className={style.quantityContainer}>
                            <label htmlFor={`quantity-${product.id}`}>
                                Hoeveelheid:{" "}
                            </label>
                            <input
                                id={`quantity-${product.id}`}
                                type="number"
                                min="1"
                                value={quantities[product.id]}
                                onChange={(e) =>
                                    handleQuantityChange(
                                        product.id,
                                        parseInt(e.target.value)
                                    )
                                }
                            />
                        </div>
                    </div>
                ))}
            </ul>
            <div className={style.totalPrice}>
                <p>
                    Totaal: €
                    {Math.round(
                        cartProducts.reduce(
                            (total, product) =>
                                total + product.price * quantities[product.id],
                            0
                        ) * 100
                    ) / 100}
                </p>
                <button onClick={toggleForm} className={style.order_btn}>
                    Bestellen
                </button>
            </div>
            {showForm && (
                <form className={style.order} onSubmit={handlePay}>
                    <div className={style.order_info}>
                        <label>Voornaam:</label>
                        <input
                            type="text"
                            name="name"
                            defaultValue={user.name}
                        />
                    </div>
                    <div className={style.order_info}>
                        <label>Achternaam:</label>
                        <input
                            type="text"
                            name="lastName"
                            defaultValue={user.lastName}
                        />
                    </div>
                    <div className={style.order_info}>
                        <label>Straat:</label>
                        <input
                            type="text"
                            name="street"
                            defaultValue={user.street}
                        />
                    </div>
                    <div className={style.order_info}>
                        <label>Nummer:</label>
                        <input
                            type="text"
                            name="number"
                            defaultValue={user.number}
                        />
                    </div>
                    <div className={style.order_info}>
                        <label>Bus:</label>
                        <input type="text" name="bus" defaultValue={user.bus} />
                    </div>
                    <div className={style.order_info}>
                        <label>Postcode:</label>
                        <input
                            type="text"
                            name="postalCode"
                            defaultValue={user.postalCode}
                        />
                    </div>
                    <div className={style.order_info}>
                        <label>Woonplaats:</label>
                        <input
                            type="text"
                            name="city"
                            defaultValue={user.city}
                        />
                    </div>
                    <div className={style.order_info}>
                        <label>Land:</label>
                        <input
                            type="text"
                            name="country"
                            defaultValue={user.country}
                        />
                    </div>
                    <button type="submit" className={style.order_btn}>
                        Betalen
                    </button>
                </form>
            )}
            {showPopup && <div className={style.popup}>{popupContent}</div>}
        </div>
    );
};

export default Shoppingcart;
