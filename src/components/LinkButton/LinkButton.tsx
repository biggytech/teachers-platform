import Link from "next/link";

import { Button } from "@components";
import { ButtonProps } from "@components/Button";

interface LinkButtonProps extends ButtonProps {
  link: string;
}

const LinkButton = (props: LinkButtonProps) => {
  const { link, ...otherProps } = props;

  return (
    <Link href={link}>
      <Button {...otherProps} />
    </Link>
  );
};

export default LinkButton;
