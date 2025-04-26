import { ButtonHTMLAttributes } from "react";
import { Icon } from "@/components";

type FormButtonProps = {
  label: string;
  loading: boolean;
  disabled: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const FormButton: React.FC<FormButtonProps> = ({
  label,
  loading,
  disabled = false,
  ...rest
}) => {
  return (
    <button
      disabled={loading || disabled}
      className={`bg-white hover:bg-primary hover:text-white transition-all duration-300 w-fit px-5 py-2 text-foreground font-montserratRegular text-2xl self-center rounded-md disabled:cursor-not-allowed disabled:bg-gray-400 cursor-pointer ${
        loading || disabled ? "bg-gray-400" : ""
      }`}
      {...rest}
    >
      {loading ? <Icon name={"loader"} className="animate-spin" /> : label}
    </button>
  );
};
