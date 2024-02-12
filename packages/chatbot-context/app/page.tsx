"use client";
import { useState, useRef, useEffect } from "react";
import { Message } from "@/types/message";
import DataSource from "./data-sourse";

import "./index.scss";

export default function Home() {
  const chatTxtarea: any = useRef();

  const autoGrowTxtarea = (e: any) => {
    chatTxtarea.current.style.height = "24px";
    chatTxtarea.current.style.height = `${e.currentTarget.scrollHeight}px`;
  };
  const resetTxtareaHt = () => {
    chatTxtarea.current.style.height = "24px";
  };

  const [message, setMessage] = useState<string>("");
  const [history, setHistory] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hello! Ask me questions about appblocks ",
    },
  ]);
  const lastMessageRef = useRef<HTMLDivElement | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [subTabActive, setSubTabActive] = useState("data-source");

  const handleClick = () => {
    if (message == "") return;
    setHistory((oldHistory) => [
      ...oldHistory,
      { role: "user", content: message },
    ]);
    setMessage("");
    resetTxtareaHt();
    setLoading(true);
    fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: message, history: history }),
    })
      .then(async (res) => {
        const r = await res.json();
        setHistory((oldHistory) => [...oldHistory, r]);
        setLoading(false);
      })
      .catch((err) => {
        console.log("Error is ", err);
        alert(err);
      });
  };

  //scroll to bottom of chat
  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [history]);

  return (
    <div className="flex flex-col w-full items-center max-w-[748px] flex-grow max-h-full">
      <div className="breadcrumb mt-3 flex w-full flex-wrap text-sm  items-center">
        <a className="cursor-pointer text-black/50">Chatbots</a>
        <a className="cursor-pointer text-black">New Project</a>
      </div>
      <div className="flex w-full flex-wrap items-center text-black text-2xl mt-6">
        {/* Create New Project */}
        Add Data Source
      </div>
      {/* <div className="float-left clear-both flex w-full flex-wrap md:max-w-3xl mt-6">
        <ul className="breadcrumb-triangle float-left mb-7 flex w-full space-x-1">
          <li
            className={`relative flex w-1/3 cursor-pointer flex-col space-y-0.5 rounded bg-[#dfe1ef] py-2.5 px-6 text-xs ${
              subTabActive === "data-source"
                ? "active-breadcrumb"
                : "text-[#3D4EAC]"
            }`}
          >
            <b>Step 1</b>
            <p className="truncate font-medium leading-normal">Basic Info</p>
          </li>
          <li
            className={`relative flex w-1/3 cursor-pointer flex-col space-y-0.5 rounded bg-[#dfe1ef] py-2.5 px-6 pl-10 text-xs ${
              subTabActive === "data-source"
                ? "active-breadcrumb"
                : "text-[#3D4EAC]"
            }`}
          >
            <b>Step 2</b>
            <p className="truncate font-medium leading-normal">
              Add Data Source
            </p>
          </li>
          <li
            className={`relative flex w-1/3 cursor-pointer flex-col space-y-0.5 rounded bg-[#dfe1ef] py-2.5 px-6 pl-10 text-xs ${
              subTabActive === "configure-behaviour"
                ? "active-breadcrumb"
                : "text-[#3D4EAC]"
            }`}
          >
            <b>Step 3</b>
            <p className="truncate font-medium leading-normal">
              Configure Behaviour
            </p>
          </li>
          <li
            // onClick={() => handleTabSwitch(versionsFormikRef, "version", [])}
            className={`relative flex w-1/3 cursor-pointer flex-col space-y-0.5 rounded bg-[#dfe1ef] py-2.5 px-6 pl-10 text-xs ${
              subTabActive === "personalisation"
                ? "active-breadcrumb"
                : "text-[#3D4EAC]"
            }`}
          >
            <b>Step 4</b>
            <p className="truncate font-medium leading-normal">
              Personalisation
            </p>
          </li>
        </ul>
      </div> */}
      <div
        className={`${
          subTabActive !== "data-source" && "hidden"
        } float-left clear-both flex w-full md-lt:flex-wrap`}
      >
        <div className="float-left mb-5 flex w-full flex-col md:max-w-3xl">
          <DataSource />
        </div>
      </div>
    </div>
  );
}
