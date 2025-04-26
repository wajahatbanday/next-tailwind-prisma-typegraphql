import { Icon, IconProps } from "../Icon";

type LoadingProps = Omit<IconProps, "name" | "className"> & {
  className?: string;
  center?: boolean;
};

export const Loading: React.FC<LoadingProps> = ({
  className,
  center,
  ...props
}) => {
  if (center) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <Icon
          name="loader"
          className={`animate-spin ${className}`}
          {...props}
        />
      </div>
    );
  }

  return (
    <Icon name="loader" className={`animate-spin ${className}`} {...props} />
  );
};
