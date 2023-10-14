"use client";

import React from "react";
import useGlobals from "@/hooks/query/useGlobals";
import Link from "next/link";
import { Button } from "@nextui-org/button";
import { useThemeContext } from "@/context/themeContext";
import GlobalsInfo from "./GlobalsInfo";
import { IoSunny, IoMoon, IoContrast, IoCogSharp } from "react-icons/io5";
import {
  Divider,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";
import { THEME_OPTIONS, ThemeOption } from "@/utils/constants";
import { disableScroll } from "@/utils/common";

const themeIcons: Record<ThemeOption, React.JSX.Element> = {
  light: <IoSunny />,
  dark: <IoMoon />,
  system: <IoCogSharp />,
};

function Header() {
  const { data: globals } = useGlobals();
  const { theme, themeOption, setTheme } = useThemeContext();
  const [isOpenThemePicker, setIsOpenThemePicker] = React.useState(false);

  function handleThemePicker(option: ThemeOption) {
    setTheme(option);
    setIsOpenThemePicker(false);
    disableScroll(false);
  }

  function onOpenChange(open: boolean) {
    setIsOpenThemePicker(open);
    disableScroll(open);
  }

  return (
    <header className="p-4 flex flex-wrap items-center justify-between backdrop-blur-lg gap-4 z-30">
      {globals?.data && <GlobalsInfo globals={globals} />}
      <Divider className="w-full bg-foreground/5" />

      <nav>
        <Link href={"/"}>
          Coinland{" "}
          <span className="text-primary p-1 bg-primary-100/50 rounded-md">
            v2
          </span>
        </Link>
      </nav>

      <Popover
        placement="bottom-end"
        onOpenChange={onOpenChange}
        // backdrop="blur"
        isOpen={isOpenThemePicker}
      >
        <PopoverTrigger>
          <Button
            isIconOnly
            variant="light"
            className="text-2xl"
            aria-label="Select a theme"
          >
            {themeIcons[theme]}
          </Button>
        </PopoverTrigger>

        <PopoverContent>
          <div className="flex flex-col gap-4 text-start py-4">
            {THEME_OPTIONS.map((option) => (
              <Button
                className="capitalize flex-grow bg-transparent justify-start"
                key={option}
                aria-label={`Switch the theme`}
                onClick={() => handleThemePicker(option)}
                variant={themeOption === option ? "shadow" : "flat"}
              >
                {themeIcons[option]} {option}
              </Button>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </header>
  );
}

export default Header;
