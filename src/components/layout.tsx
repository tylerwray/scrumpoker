import React, { ReactNode } from "react";
import { Link } from "gatsby";
import "./layout.css";

import IconSettingsGear from "./icon-settings-gear";
import IconBackArrow from "./icon-back-arrow";

interface Props {
  children: ReactNode[] | ReactNode;
  showBack?: boolean;
}

function Layout({ children, showBack = false }: Props) {
  return (
    <>
      <nav
        style={{ height: "10vh" }}
        className="flex justify-end items-center w-full"
      >
        {showBack && (
          <Link
            to="/"
            className="flex flex-col justify-center items-center h-full p-2 w-24"
          >
            <IconBackArrow />
          </Link>
        )}
        <div className="flex-1" />
        <Link
          to="/settings/"
          className="flex flex-col justify-center items-center h-full p-2 w-24"
        >
          <IconSettingsGear />
        </Link>
      </nav>
      <main className="bg-gray-900">{children}</main>
    </>
  );
}

export default Layout;
