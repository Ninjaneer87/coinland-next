import { Divider } from "@nextui-org/react";
import React, { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

type Props = ComponentProps<typeof Divider>;

function GradientDivider({ className, ...rest }: Props) {
  return (
    <Divider
      className={twMerge(
        className,
        "w-full bg-gradient-to-r from-primary  to-transparent bg-transparent relative"
      )}
      {...rest}
    />
  );
}

export default GradientDivider;
