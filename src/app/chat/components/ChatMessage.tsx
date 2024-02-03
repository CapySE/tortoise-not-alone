"use client";
import { type ChatMessageProps } from "./type";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { getClockTime } from "../utils/timediff";
import { cn } from "@/utils/tailwind-merge";

export function ChatMessage(props: ChatMessageProps) {
  const { isMine, isShowTop, isShowBot, imageUrl } = props;

  const clockTime = getClockTime(props.createdAt);
  const messageBg = isMine ? "bg-red-400" : "bg-primary-400";
  const justifyPosition = isMine ? "justify-end" : "justify-start";
  const roundedSide = isMine
    ? "rounded-l-lg rounded-br-lg"
    : "rounded-r-lg rounded-bl-lg";
  const textAlign = isMine ? "text-end" : "text-start";
  return (
    <div className={cn("flex h-fit w-full flex-row gap-2", justifyPosition)}>
      <div className="h-fit w-[52px]">
        <Avatar
          className={cn("h-[52px] w-[52px]", {
            hidden: !isShowTop,
          })}
        >
          {imageUrl && <AvatarImage src={imageUrl} />}
          <AvatarFallback>{props.senderName}</AvatarFallback>
        </Avatar>
      </div>
      <div className="flex flex-col gap-1">
        <div
          className={cn("", {
            hidden: !isShowTop,
          })}
        >
          {props.senderName}
        </div>
        <div className={cn("bg-primary-400  p-2 ", messageBg, roundedSide)}>
          {props.message}
        </div>
        <div className={cn("small  min-h-1 text-medium", textAlign)}>
          {isShowBot ? `${clockTime}` : ""}
        </div>
      </div>{" "}
    </div>
  );
}
