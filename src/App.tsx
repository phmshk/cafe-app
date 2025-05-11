import Header from "./components/Header";
import Footer from "./components/Footer";
import Order from "./pages/Order";
import OrderProvider from "./components/Context/OrderContextProvider";

function App() {
  return (
    <>
      <header>
        <Header />
      </header>
      <main>
        <OrderProvider>
          <Order mealsOrigin={"Italian"} />
        </OrderProvider>
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}

export default App;
