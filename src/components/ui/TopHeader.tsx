import React from "react";
import ButtonComp from "../general/ButtonComp";

interface TopHeaderProps {
  className?: string;
  showIcon?: boolean;
  title: string;
  onClick?: () => void;
  text: string;
}

const TopHeader: React.FC<TopHeaderProps> = ({
  className = "",
  title,
  onClick,
  text,
  showIcon = false,
}) => {
  return (
    <aside className={`sm:flex items-center justify-between ${className}`}>
      <p className="font-medium sm:text-lg text-sm text-textShade">{title}</p>
      <ButtonComp
        showIcon={showIcon}
        onClick={onClick}
        text={text}
        className="w-fit mt-1 sm:mt-0"
      />
    </aside>
  );
};

export default TopHeader;
