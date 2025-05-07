import { FC, ReactNode } from "react";

interface SidePanelProps {
  title: string;
  children: ReactNode;
}

const SidePanel: FC<SidePanelProps> = ({ title, children }) => {
  return (
    <div className="bg-base-300 p-4 rounded-2xl sticky top-4">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      <div className="overflow-y-auto">{children}</div>
    </div>
  );
};

export default SidePanel;
