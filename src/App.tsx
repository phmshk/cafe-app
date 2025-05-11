import Header from "./components/Header";
import Footer from "./components/Footer";
import Order from "./pages/Order";
import OrderProvider from "./components/Context/OrderContextProvider";

function App() {
  return (
    <>
      <Header />
      <OrderProvider>
        <Order mealsOrigin={"Italian"} />
      </OrderProvider>
      <Footer />
    </>
  );
}

export default App;
