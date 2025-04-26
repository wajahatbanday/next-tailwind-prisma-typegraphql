import { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: React.FC<ButtonProps> = ({
  children,
  className = "",
  ...props
}) => {
  return (
    <button
      className={`${className} hover:bg-gray-400 transition-all duration-300 text-white font-montserratRegular w-fit px-5 py-2 text-2xl self-center rounded-md disabled:cursor-not-allowed disabled:bg-gray-400`}
      {...props}
    >
      {children}
    </button>
  );
};
