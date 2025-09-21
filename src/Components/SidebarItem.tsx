import type { ReactElement } from "react";

export function SidebarItems({
  text,
  Icon,
  onClick,
}: {
  text: string;
  Icon: ReactElement;
  onClick?: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className="flex text-gray-700 py-2 cursor-pointer hover:bg-gray-300 rounded max-w-48 pl-4"
    >
      <div className="pr-4">{Icon}</div>
      <div>{text}</div>
    </div>
  );
}
