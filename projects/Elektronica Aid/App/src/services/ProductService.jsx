import Product from "../models/Products";
import pb from "./PocketbaseService";
import seedData from "./seedData.json";
import Question from "../models/Question";

class ProductService {
    constructor({ user, error, setProducts, setQuestions }) {
        this.db = pb;
        this.user = user;
        this.error = error;
        this.productSetter = setProducts;
        this.questionSetter = setQuestions;

        this.getAllProducts = this.getAllProducts.bind(this);
        this.deleteProduct = this.deleteProduct.bind(this);
        this.updatedProduct = this.updatedProduct.bind(this);
        this.createProduct = this.createProduct.bind(this);
        this.liveUpdate = this.liveUpdate.bind(this);
        this.getProductById = this.getProductById.bind(this);
        this.seedProducts = this.seedProducts.bind(this);
        this.addFavorite = this.addFavorite.bind(this);
        this.removeFavorite = this.removeFavorite.bind(this);
        this.addTocart = this.addTocart.bind(this);
        this.removeFromCart = this.removeFromCart.bind(this);
        this.updateCart = this.updateCart.bind(this);
        this.questionProduct = this.questionProduct.bind(this);
        this.getAllQuestions = this.getAllQuestions.bind(this);
        this.readQuestion = this.readQuestion.bind(this);
    }

    async getAllProducts(loading) {
        loading(true);

        try {
            const products = await this.db
                .collection("products")
                .getFullList()
                .then((response) => {
                    const productsObject = {};
                    response.forEach((product) => {
                        productsObject[product.id] = new Product({
                            id: product.id,
                            ...product,
                            service: this,
                        });
                    });
                    this.productSetter(productsObject);
                    loading(false);
                });
        } catch (e) {
            this.error(e.message);
            loading(false);
        }
    }

    async deleteProduct(product) {
        try {
            const productData = await this.db
                .collection("products")
                .delete(product.id)
                .then((response) => {
                    if (response) {
                        this.db
                            .collection("products")
                            .unsubscribe(`${product.id}`);
                        this.productSetter((prevValues) => {
                            const updatedProducts = { ...prevValues };
                            delete updatedProducts[product.id];
                            return updatedProducts;
                        });
                        return true;
                    } else {
                        this.error("Something went wrong, please try again");
                        return false;
                    }
                });
        } catch (e) {
            this.error(e.message);
        }
    }

    async updatedProduct(updatedProductData) {
        try {
            delete updatedProductData.productService;
            await this.db
                .collection("products")
                .update(updatedProductData.id, updatedProductData, {
                    $autoCancel: false,
                });
            return true;
        } catch (e) {
            this.error(e.message);
        }
    }

    async createProduct(productData) {
        try {
            const product = await this.db
                .collection("products")
                .create(productData);
            if (product) {
                this.db
                    .collection("products")
                    .subscribe(`${product.id}`, (newProduct) => {
                        this.productSetter((prevValues) => {
                            return {
                                ...prevValues,
                                [product.id]: new Product({
                                    ...product,
                                    service: this,
                                }),
                            };
                        });
                    });
                return true;
            } else {
                this.error("Something went wrong, please try again");
                return false;
            }
        } catch (e) {
            this.error(e.message);
        }
    }

    liveUpdate(products) {
        Object.values(products).forEach((product) => {
            this.db
                .collection("products")
                .subscribe(`${product.id}`, (changedProduct) => {
                    if (product[product.id])
                        this.productSetter((prevValues) => {
                            return {
                                ...prevValues,
                                [changedProduct.record.id]: new Product({
                                    ...e.record,
                                    service: this,
                                }),
                            };
                        });
                });
        });
    }

    async getProductById(productId) {
        try {
            const product = await this.db
                .collection("products")
                .getOne(productId, { $autoCancel: false });

            return product;
        } catch (e) {
            this.error(e.message);
        }
    }

    async addFavorite(productId, userId) {
        try {
            console.log("Fetching user record for user ID:", userId);
            const userRecord = await this.db.collection("users").getOne(userId);

            console.log("User record fetched:", userRecord);

            // Haal de huidige favorieten op of initialiseer een leeg object als het niet bestaat
            const favorites = userRecord.favorites || {};
            console.log("Current favorites:", favorites);

            // Voeg het nieuwe product toe aan de favorieten
            favorites[productId] = true;

            console.log("Updating favorites...");
            await this.db.collection("users").update(userId, {
                favorites: favorites,
            });

            console.log(`Product ${productId} toegevoegd aan favorieten.`);
        } catch (error) {
            console.error(
                "Error bij het toevoegen van favoriet product:",
                error
            );
        }
    }

    async addTocart(productId, userId) {
        try {
            console.log("Fetching user record for user ID:", userId);
            const userRecord = await this.db.collection("users").getOne(userId);

            console.log("User record fetched:", userRecord);

            const shoppingcart = userRecord.shoppingcart || {};
            console.log("Current cart:", shoppingcart);

            // Voeg het product toe aan de winkelwagen met hoeveelheid 1 als het nog niet bestaat
            if (!shoppingcart[productId]) {
                shoppingcart[productId] = { quantity: 1 };
            }

            console.log("Updating cart...");
            await this.db.collection("users").update(userId, {
                shoppingcart: shoppingcart,
            });

            console.log(`Product ${productId} toegevoegd aan cart.`);
        } catch (error) {
            console.error("Error bij het toevoegen van cart product:", error);
        }
    }

    async updateCart(userId, updatedCart) {
        try {
            console.log("Updating cart for user ID:", userId);
            await this.db.collection("users").update(userId, {
                shoppingcart: updatedCart,
            });
            console.log("Cart updated successfully.");
        } catch (error) {
            console.error("Error bij het updaten van cart:", error);
        }
    }

    async removeFavorite(productId, userId) {
        try {
            console.log("Fetching user record for user ID:", userId);
            const userRecord = await this.db.collection("users").getOne(userId);

            console.log("User record fetched:", userRecord);

            // Haal de huidige favorieten op of initialiseer een leeg object als het niet bestaat
            const favorites = userRecord.favorites;
            console.log("Current favorites:", favorites);

            // Verwijder het product uit de favorieten
            delete favorites[productId];

            console.log("Updating favorites...");
            await this.db.collection("users").update(userId, {
                favorites: favorites,
            });

            console.log(`Product ${productId} verwijderd uit favorieten.`);
        } catch (error) {
            console.error(
                "Error bij het verwijderen van favoriet product:",
                error
            );
        }
    }

    async removeFromCart(productId, userId) {
        try {
            console.log("Fetching user record for user ID:", userId);
            const userRecord = await this.db.collection("users").getOne(userId);

            console.log("User record fetched:", userRecord);

            // Haal de huidige favorieten op of initialiseer een leeg object als het niet bestaat
            const shoppingcart = userRecord.shoppingcart;
            console.log("Current cart:", shoppingcart);

            // Verwijder het product uit de favorieten
            delete shoppingcart[productId];

            console.log("Updating cart...");
            await this.db.collection("users").update(userId, {
                shoppingcart: shoppingcart,
            });

            console.log(`Product ${productId} verwijderd uit cart.`);
        } catch (error) {
            console.error("Error bij het verwijderen van cart product:", error);
        }
    }

    async questionProduct(questionData, userId, productId, name, email) {
        try {
            // Voeg userId en productId toe aan questionData
            const data = {
                body: questionData,
                userId: userId,
                productId: productId,
                name: name,
                email: email,
            };
            console.log("Sending question:", data);

            const question = await this.db.collection("question").create(data);
            if (question) {
                this.db
                    .collection("question")
                    .subscribe(`${question.id}`, (newQuestion) => {
                        this.questionSetter((prevValues) => {
                            return {
                                ...prevValues,
                                [question.id]: new Question({
                                    ...newQuestion,
                                    service: this,
                                }),
                            };
                        });
                    });
                return true;
            } else {
                this.error("Something went wrong, please try again");
                return false;
            }
        } catch (e) {
            console.error("Error creating question:", e);
            this.error(e.message);
        }
    }

    async getAllQuestions(loading) {
        loading(true);

        try {
            const questions = await this.db
                .collection("question")
                .getFullList({
                    $autoCancel: false,
                    $orderBy: "created",
                    $asc: false,
                });
            const questionsObject = {};
            questions.forEach((question) => {
                questionsObject[question.id] = new Question({
                    id: question.id,
                    ...question,
                    service: this,
                });
            });
            this.questionSetter(questionsObject); // Gebruik de setter voor vragen
            loading(false);
        } catch (e) {
            this.error(e.message);
            loading(false);
        }
    }

    async readQuestion(questionId) {
        try {
            await this.db.collection("question").update(questionId, {
                read: true,
            });
        } catch (e) {
            this.error(e.message);
        }
    }

    seedProducts(userID) {
        console.log(this.user);
        seedData.forEach(async (product) => {
            delete product.productId;
            console.log(product);
            await this.db
                .collection("products")
                .create({ ...product, userID: userID }, { $autoCancel: false });
        });
    }
}

export default ProductService;