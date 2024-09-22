const ROUTES = {
    home: "/home",
    about: "/about",
    detail: { path: "detail/:name", to: "/detail/" },
    notFound: "*",
};

export default ROUTES;
