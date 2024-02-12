// ChatBubble.js
import React from "react";

const ChatBubble = ({ message, isUser, chatRef, links = [] }) => {
  return (
    <div
      ref={chatRef}
      className={`flex ${
        !isUser ? "items-start justify-start" : "items-end justify-end"
      }`}
    >
      <div
        className={`relative ${
          !isUser ? "bg-[#E3D9FF] chatBoxAi" : "bg-[#E5E5E5] chatBoxUser"
        }  text-black/90 rounded-lg py-2 px-4 max-w-[80%] shadow-sm`}
      >
        <p className="text-sm font-medium overflow-hidden text-ellipsis">
          {message}
        </p>
        {links.length ? (
          <div className="mt-4 flex flex-col gap-2">
            <p className="text-sm font-medium text-slate-500">Sources:</p>
            {links?.map((link) => {
              return (
                <a
                  key={link}
                  href={link}
                  className="block w-fit px-2 py-1 text-sm text-violet-700 bg-violet-100 rounded"
                >
                  {formatPageName(link)}
                </a>
              );
            })}
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default ChatBubble;
