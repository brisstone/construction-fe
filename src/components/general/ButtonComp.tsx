import { PlusIcon } from "@/assets/svgComp/General";
import { Button } from "../ui/button";

interface ButtonCompProps {
    className?: string;
    icon?: React.ReactNode;
    showIcon?: boolean;
    disabled?: boolean;
    text: string;
    onClick?: () => void;
}

const ButtonComp: React.FC<ButtonCompProps> = ({
  className,
  icon = <PlusIcon />,
  showIcon = false,
  disabled = false,
  text,
  onClick,
}) => {
  return (
    <div>
      <Button
        onClick={onClick}
        disabled={disabled}
        className={` rounded-[8px] w-[100px] h-[36px] bg-deepBlue text-sm font-medium text-white ${className}`}
      >
        {showIcon && <div className="mr-1">{icon}</div>}
        {text}
      </Button>
    </div>
  );
};

export default ButtonComp;
