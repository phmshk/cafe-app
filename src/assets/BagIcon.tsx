import { FC } from "react";

interface BagIconProps {
  className: string;
  type: string;
}

const BagIcon: FC<BagIconProps> = ({ className, type }) => (
  <svg
    className={className}
    width="64"
    height="64"
    viewBox="0 0 200 200"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="200" height="200" fill="none" />
    <g>
      <rect
        x="50"
        y="60"
        width="100"
        height="100"
        rx="10"
        fill="#B0B0B0"
        className="fill-gray-400"
      />
      <path
        d="M65 60 C65 40, 85 40, 85 60"
        stroke="#888"
        strokeWidth="4"
        fill="none"
      />
      <path
        d="M135 60 C135 40, 115 40, 115 60"
        stroke="#888"
        strokeWidth="4"
        fill="none"
      />
      <circle cx="80" cy="100" r="5" fill="#333" />
      <circle cx="120" cy="100" r="5" fill="#333" />
      <path
        d={`M85 125 Q100 ${type === "sad" ? 115 : 135}, 115 125`}
        stroke="#333"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />
    </g>
  </svg>
);

export default BagIcon;
