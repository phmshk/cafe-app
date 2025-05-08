import { FC, ReactNode } from "react";

interface SidePanelProps {
  title: string;
  children: ReactNode;
}

const SidePanel: FC<SidePanelProps> = ({ title, children }) => {
  return (
    <div className="bg-base-300 p-4 rounded-2xl w-64 h-[calc(100dvh-5rem)] sticky top-18">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      <div className="text-left">{children}</div>
    </div>
  );
};

export default SidePanel;
