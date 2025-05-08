import Header from "./components/Header";
import Footer from "./Footer";
import Order from "./pages/Order";
function App() {
  return (
    <>
      <Header />
      <Order mealsOrigin={"Canadian"} />
      <Footer />
    </>
  );
}

export default App;
