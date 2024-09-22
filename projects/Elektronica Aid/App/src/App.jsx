import "./App.css";
import Error from "./components/Error/Error";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import ShopProvider from "./context/ShopContext";
import Authentication from "./pages/Authentication/Authentication";


function App() {

    return (
        <>
            <ShopProvider>
                <Header />
                <Error/>
                <Authentication />
                <Footer />
            </ShopProvider>
        </>
    );
}

export default App;
