import React from "react";
import MuiButton from '@mui/material/Button';
import Link from "next/link";

export enum ButtonColors {
  primary = 'primary',
  success = 'success',
  error = 'error',
  warning = 'warning'
}

interface ButtonProps {
  color?: ButtonColors;
  text: string;
  link?: string;
  onClick?: (e: React.MouseEvent) => void;
  icon?: React.ReactNode;
  type?: string;
}

const NewButton: React.FC<ButtonProps> = ({ color = ButtonColors.primary, text, link, onClick, icon, type }) => {
  const button = <MuiButton variant="contained" endIcon={icon} onClick={onClick} color={color} type={type}>{text}</MuiButton>

  if (link) {
    return <Link href={link}>
      {button}
    </Link>
  } else {
    return button;
  }
};

export default NewButton;