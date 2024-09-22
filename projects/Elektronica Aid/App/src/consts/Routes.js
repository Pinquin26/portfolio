const ROUTES = {
    home: "/",
    login: "/login",
    register: "/register",
    webshop: "/webshop",
    detail: { path: "/detail/:productId", to: "/detail/" },
    question: { path: "/question/:productId", to: "/question/" },
    questionOverview: "/question-overview",
    favorite: "/favorite",
    shoppingcart: "/shoppingcart",
    account: "/account",
    about: "/about",
    contact: "/contact",
};

export default ROUTES;
