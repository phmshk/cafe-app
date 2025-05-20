import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import OrderProvider from "../components/Context/OrderContextProvider";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Wrapper from "../components/Wrapper";

export const Route = createRootRoute({
  component: () => (
    <>
      <OrderProvider>
        <Header />
        <main>
          <Wrapper>
            <Outlet />
          </Wrapper>
        </main>
      </OrderProvider>

      <Footer />

      <TanStackRouterDevtools />
    </>
  ),
});
