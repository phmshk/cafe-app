import Header from "./components/Header";
import Footer from "./components/Footer";
import Order from "./pages/Order";
import OrderProvider from "./components/Context/OrderContextProvider";

function App() {
  return (
    <>
      <OrderProvider>
        <header>
          <Header />
        </header>
        <main>
          <Order mealsOrigin={"American"} />
        </main>
      </OrderProvider>

      <footer>
        <Footer />
      </footer>
    </>
  );
}

export default App;
