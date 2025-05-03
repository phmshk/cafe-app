import { FC, ReactNode } from "react";

interface WrapperProps {
  children: ReactNode;
}

const Wrapper: FC<WrapperProps> = ({ children }) => {
  return <div className="mx-auto max-w-7xl px-4">{children}</div>;
};

export default Wrapper;
