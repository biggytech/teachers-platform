import { forwardRef } from "react";
import classNames from "classnames";

export interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  text?: string;
  icon?: React.ReactNode;
  color?: "green";
  className?: string;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (props: ButtonProps, ref) => {
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
        {text ? <span>{text}</span> : null}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
