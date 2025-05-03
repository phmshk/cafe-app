import { FC } from "react";
import Menu from "../components/Menu";
import SidePanel from "../components/SidePanel";
import Wrapper from "../components/Wrapper";

const Order: FC = () => {
  const mealsOrigin = "Italian";
  return (
    <Wrapper>
      <div className="grid grid-cols-[1fr_2fr_1fr] gap-4 min-h-screen py-4">
        <SidePanel title="Categories">
          <div></div>
        </SidePanel>
        <Menu mealsOrigin={mealsOrigin} />
        <SidePanel title="Cart">
          <div></div>
        </SidePanel>
      </div>
    </Wrapper>
  );
};

export default Order;
