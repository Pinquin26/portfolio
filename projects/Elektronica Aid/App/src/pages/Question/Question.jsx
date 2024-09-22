import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useShop } from "../../context/ShopContext";
import style from "./Question.module.css";

const QuestionComponent = () => {
    const [question, setQuestion] = useState("");
    const { productId } = useParams();
    const { productService, user } = useShop();
    const [product, setProduct] = useState(null);
    const [message, setMessage] = useState("");

    useEffect(() => {
        async function fetchProduct() {
            try {
                const product = await productService.getProductById(productId);
                setProduct(product);
            } catch (error) {
                setMessage("Product niet gevonden");
            }
        }
        fetchProduct();
    }, [productId, productService]);

    const handleQuestion = async (e) => {
        e.preventDefault();
        try {
            console.log("Submitting question:", question);
            await productService.questionProduct(question, user.id, productId, user.name, user.email);
            setMessage("Vraag succesvol verzonden! Wij proberen zo snel mogelijk te antwoorden.");
            setQuestion("");
        } catch (error) {
            console.error("Error submitting question:", error);
            setMessage(
                "Er is een fout opgetreden bij het verzenden van uw vraag."
            );
        }
    };

    return (
        <div className={style.container}>
            {product ? (
                <div className={style.question}>
                    <h1>U heeft een vraag over dit product:</h1>
                    <h2>{product.productName}</h2>
                    <form onSubmit={handleQuestion}>
                        <label>
                            <textarea
                                type="text"
                                name="question"
                                value={question}
                                onChange={(e) => setQuestion(e.target.value)}
                            />
                        </label>
                        <button
                            type="submit"
                            className={
                                !question ? style.disabledButton : style.button
                            }
                            disabled={!question}
                        >
                            Verstuur
                        </button>
                    </form>
                    {message && <p>{message}</p>}
                </div >
            ) : (
                "Product " + productId + " niet gevonden"
            )}
        </div>
    );
};

export default QuestionComponent;
