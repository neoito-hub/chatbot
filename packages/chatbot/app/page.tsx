"use client";
import { useState, useRef, useEffect } from "react";
import { Message } from "@/types/message";
import Image from "next/image";
import AbChatLogo from "./assets/img/chat-ab-logo.png";
import Send from "./assets/img/icons/send-icon.svg";
import ChatBubble from "./chat-bubble";

import "./index.scss";

function FormatChatHistory(
  human: string,
  ai: string,
  previousChatHistory?: string
) {
  const newInteraction = `Human: ${human}\nAI: ${ai}`;
  if (!previousChatHistory) {
    return newInteraction;
  }
  return `${previousChatHistory}\n\n${newInteraction}`;
}

export default function Home() {
  const chatTxtarea: any = useRef();

  const mainScrollArea: any = useRef();

  const autoGrowTxtarea = (e: any) => {
    chatTxtarea.current.style.height = "24px";
    chatTxtarea.current.style.height = `${e.currentTarget.scrollHeight}px`;
  };
  const resetTxtareaHt = () => {
    chatTxtarea.current.style.height = "24px";
  };

  const [message, setMessage] = useState<string>("");
  const [chatHistory, setChatHistory] = useState<string>("");
  const [history, setHistory] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hello! Ask me questions about Appblocks ",
    },
  ]);
  const lastMessageRef = useRef<HTMLDivElement | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  let tempMessage = "";
  const handleClick = () => {


    if (message == "") return;
    tempMessage = message;
    setHistory((oldHistory) => [
      ...oldHistory,
      { role: "user", content: message },
    ]);
    setMessage("");
    resetTxtareaHt();
    setLoading(true);
    setTimeout(() => {
      mainScrollArea.current.scrollTop = mainScrollArea.current.scrollHeight;
    }, 10);
    fetch(`/api/chat?project_id=${process.env.NEXT_PUBLIC_PROJECT_ID}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: tempMessage, history: chatHistory }),
    })
      .then(async (res) => {
        const r = await res.json();

        setChatHistory((oldChatHistory) => {
          // return oldChatHistory
          return FormatChatHistory(tempMessage, r.content, oldChatHistory);
        });
        setHistory((oldHistory) => [...oldHistory, r]);
        setLoading(false);
        tempMessage = "";
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
    <div className="flex flex-col gap-6 w-full items-center max-w-[748px] flex-grow max-h-full">
      <div className="breadcrumb mt-3 flex w-full flex-wrap text-sm text-black/50 items-center">
        <a className="cursor-pointer">Chatbots</a>
        <a className="cursor-pointer">Project Details</a>
        <a className="text-black/80">Preview</a>
      </div>
      <form
        className="rounded-xl w-full flex-grow flex flex-col shadow-[0px_0px_16px_rgba(0,0,0,0.2)] max-h-full overflow-clip bg-[#FCFCFC]"
        onSubmit={(e) => {
          e.preventDefault();
          handleClick();
        }}
      >
        <div className="flex bg-primary p-4">
          <Image src={AbChatLogo} alt="" />
        </div>
        <div
          className="custom-scroll-bar overflow-y-auto flex flex-col gap-5 py-4 px-7 h-full"
          ref={mainScrollArea}
        >
          {history.map((message: Message, idx) => {
            const isLastMessage = idx === history.length - 1;
            switch (message.role) {
              case "assistant":
                return (
                  <ChatBubble
                    key={idx}
                    message={message.content}
                    isUser={false}
                    chatRef={isLastMessage ? lastMessageRef : null}
                  />
                );
              case "user":
                return (
                  <ChatBubble
                    key={idx}
                    message={message.content}
                    isUser={true}
                    chatRef={isLastMessage ? lastMessageRef : null}
                  />
                );
            }
          })}
        </div>
        {loading && (
          <div
            ref={lastMessageRef}
            className="px-6 py-2 text-black/50 text-xs flex items-center gap-x-1"
          >
            <span>Appblocks bot evaluating</span>
            <div className="typing typing-xs mt-0.5">
              <span className="typing-dot"></span>
              <span className="typing-dot"></span>
              <span className="typing-dot"></span>
            </div>
          </div>
        )}
        {/* input area */}
        <div className="flex sticky bottom-0 w-full px-4 pb-4">
          <div className="w-full relative">
            <div className="flex rounded w-full h-full border bg-white px-4 py-3 pr-16 text-base border-[#E5E5E5] focus-within:border-primary">
              <textarea
                ref={chatTxtarea}
                aria-label="chat input"
                value={message}
                onChange={(e) => {
                  console.log(message);
                  setMessage(e.target.value);
                  autoGrowTxtarea(e);
                }}
                placeholder="Ask anything"
                className="w-full focus:outline-none resize-none text-[15px] max-h-[60px] overflow-y-auto"
                style={{ height: "24px" }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleClick();
                  }
                }}
              />
            </div>
            <button
              onClick={(e) => {
                e.preventDefault();
                handleClick();
              }}
              className="absolute right-2.5 top-1/2 transform -translate-y-1/2 cursor-pointer hover:bg-primary/5 focus:bg-primary/10 p-2 rounded-full"
              type="submit"
              aria-label="Send"
              disabled={!message || loading}
            >
              <Image className="max-w-[48px]" src={Send} alt="" />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
