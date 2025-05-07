import Header from "./components/Header";
import Order from "./pages/Order";
function App() {
  return (
    <>
      <Header />
      <Order mealsOrigin={"Canadian"} />
    </>
  );
}

export default App;
