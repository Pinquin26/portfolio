import "./App.css";
import Footer from "./components/Footer/Footer.jsx";
import Header from "./components/Header/Header.jsx";
import PokemonProvider from "./contexts/PokemonContext.jsx";
import Authentication from "./pages/Authentication/Authentication.jsx";

function App() {
    return (
        <>
            <PokemonProvider>
                <Header />
                <Authentication />
                <Footer />
            </PokemonProvider>
        </>
    );
}

export default App;
