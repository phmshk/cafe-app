import Header from "./components/Header";
import Footer from "./components/Footer";
import Order from "./pages/Order";
function App() {
  return (
    <>
      <Header />
      <Order mealsOrigin={"Italian"} />
      <Footer />
    </>
  );
}

export default App;
