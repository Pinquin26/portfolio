import React, { useEffect, useState } from "react";
import style from "./QuestionOverview.module.css";
import { useShop } from "../../context/ShopContext";

const QuestionOverview = () => {
    const { questions, productService } = useShop();
    const [isLoading, setIsLoading] = useState(false);
    const [questionProducts, setQuestionProducts] = useState({});

    useEffect(() => {
        async function fetchQuestionProducts() {
            const foundQuestionProducts = {};
            for (const questionId in questions) {
                const question = questions[questionId];
                const questionProduct = await productService.getProductById(
                    question.productId
                );
                if (questionProduct) {
                    foundQuestionProducts[questionId] = questionProduct;
                }
            }
            setQuestionProducts(foundQuestionProducts);
        }
        fetchQuestionProducts();
    }, [questions, productService]);

    const markAsRead = async (questionId) => {
        await productService.readQuestion(questionId);
        setIsLoading(true);
        await productService.getAllQuestions(setIsLoading);
        setIsLoading(false);
    };

    // Helper function to sort questions by created date
    const sortQuestionsByDate = (questions) => {
        return Object.keys(questions).sort((a, b) => {
            return (
                new Date(questions[b].created) - new Date(questions[a].created)
            );
        });
    };

    return (
        <div className={style.questionOverview}>
            <h1>Question Overview</h1>
            <div className={style.questionList}>
                {sortQuestionsByDate(questions).map((questionId) => {
                    const question = questions[questionId];
                    const product = questionProducts[questionId];
                    return (
                        <div
                            key={questionId}
                            className={`${style.questionCard} ${
                                question.read ? style.read : ""
                            }`}
                        >
                            <div className={style.questionHeader}>
                                <h2>{question.title}</h2>
                                <p>Name: {question.name}</p>
                                <p>Email: {question.email}</p>
                                {product && (
                                    <p>
                                        Product:{" "}
                                        <a href={`/detail/${product.id}`}>
                                            {product.productName}
                                        </a>
                                    </p>
                                )}
                            </div>
                            <div className={style.questionBody}>
                                <p>{question.body}</p>
                            </div>
                            <div className={style.actions}>
                                <button
                                    onClick={() => markAsRead(questionId)}
                                    disabled={question.read}
                                >
                                    Mark as Read
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default QuestionOverview;
