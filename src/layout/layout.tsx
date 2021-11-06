import React, { ReactNode } from "react";
import { Link } from "gatsby";

import IconSettingsGear from "./icon-settings-gear";
import IconBackArrow from "./icon-back-arrow";
import SEO from "./seo";

type Props = {
  children: ReactNode;
  title: string;
  showBack?: boolean;
};

function Layout({ children, title, showBack = false }: Props) {
  return (
    <>
      <SEO title={title} />
      <nav
        style={{ height: "10vh" }}
        className="flex justify-end items-center w-full"
      >
        {showBack && (
          <Link
            to="/"
            aria-label="back"
            className="flex flex-col justify-center items-center h-full p-2 w-24"
          >
            <IconBackArrow />
          </Link>
        )}
        <div className="flex-1" />
        <Link
          to="/settings/"
          aria-label="settings"
          className="flex flex-col justify-center items-center h-full p-2 w-24"
        >
          <IconSettingsGear />
        </Link>
      </nav>
      <main>{children}</main>
    </>
  );
}

export default Layout;