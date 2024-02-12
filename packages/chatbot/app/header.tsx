import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import Image from "next/image";
import Logo from "./assets/img/logo.png";
import LogoTxt from "./assets/img/logo-txt.svg";
import DiscordIcon from "./assets/img/icons/discord-icon.svg";
import dotenv from "dotenv";

dotenv.config();

export default function Header() {
  const [responsiveView, setResponsiveView] = useState(false);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth > 768) {
        setResponsiveView(false);
      }
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <header className="border-ab-gray-medium fixed top-0 left-0 z-[999] w-full border-b bg-white">
      <div className="flex h-16 w-full px-4 md:items-center md:justify-between md:space-x-4 md:px-6 xl:px-12">
        <div className="flex flex-grow items-center py-2">
          <div className="flex w-full items-center">
            <span className="flex flex-shrink-0 items-center focus:outline-none">
              <Image className="max-w-[48px]" src={Logo} alt="" />
              <Image className="lg-lt:hidden ml-3" src={LogoTxt} alt="" />
            </span>
          </div>
        </div>
        <div className="flex flex-shrink-0 items-center">
          <div
            id="navbar-responsive"
            className={`nav-menu-wrapper custom-scroll-primary md-lt:bg-white md-lt:py-1.5 md-lt:shadow-lg ${
              !responsiveView ? "md-lt:-right-64" : "md-lt:right-0"
            }`}
          >
            <ul className="text-ab-black text-ab-sm my-3 flex flex-col items-center md:my-0 md:flex-row md:space-x-4 md-lt:items-start md-lt:space-y-3">
              <li>
                <button
                  type="button"
                  onClick={() => {
                    window.open(process.env.DOCS_PUBLIC_PATH, "_blank");
                  }}
                  className="block hover:underline cursor-pointer font-semibold focus:outline-none"
                >
                  Docs
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    window.open(process.env.APPBLOCKS_DISCORD_URL, "_blank");
                  }}
                  className="text-primary flex items-center cursor-pointer font-semibold focus:outline-none rounded transition-all bg-primary/10 hover:bg-primary/20 px-4 py-2"
                >
                  <Image className="mr-2" src={DiscordIcon} alt="Discord" />
                  Join Discord
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}
