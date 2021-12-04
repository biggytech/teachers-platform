import { forwardRef } from "react";
import classNames from "classnames";

export interface ButtonProps extends React.HTMLProps<HTMLButtonElement> {
  text: string;
  icon?: string;
  color?: "green";
  className?: string;
}

const Button = forwardRef((props: ButtonProps, ref) => {
  const {
    text,
    className,
    icon = null,
    color = "green",
    ...otherProps
  } = props;

  return (
    <button
      ref={ref}
      className={classNames(
        `m-1 cursor-pointer 
      bg-${color}-500 hover:bg-${color}-400 text-white py-2 px-4 rounded 
      inline-flex items-center`,
        className
      )}
      {...otherProps}
    >
      {icon}
      <span>{text}</span>
    </button>
  );
});

export default Button;
