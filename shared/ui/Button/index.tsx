import React from "react";

type ButtonPropsType = {
  children?: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
};

const Button: React.FC<ButtonPropsType> = ({
  children,
  disabled = false,
  onClick,
}) => {
  return (
    <button onClick={onClick} disabled={disabled}>
      <div>{children}</div>
    </button>
  );
};
export default Button;
