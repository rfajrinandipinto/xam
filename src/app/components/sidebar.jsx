"use client";

import {
  CalendarIcon,
  FolderIcon,
  HomeIcon,
  InboxIcon,
  UsersIcon,
  PlusIcon as PlusIconOutline,
} from "@heroicons/react/24/outline";
import { usePathname } from "next/navigation";

const navigation = [
  { name: "Dashboard", href: "", icon: HomeIcon },
  { name: "Students", href: "students", icon: UsersIcon },
  { name: "Exams", href: "exams", icon: FolderIcon },
  { name: "Series", href: "series", icon: FolderIcon },
  { name: "Subjects", href: "subjects", icon: FolderIcon },
  { name: "Users", href: "users", icon: CalendarIcon },
  { name: "Transcripts", href: "transcripts", icon: InboxIcon },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Sidebar() {
  const pathname = usePathname().split("/")[1];
  return (
    <div className="flex min-h-0 flex-1 flex-col bg-gray-800">
      <div className="flex justify-center h-16 flex-shrink-0 items-center bg-gray-900 px-4">
        <h1 className="text-4xl font-extrabold italic">XAM</h1>
      </div>
      <div className="flex flex-1 flex-col overflow-y-auto">
        <nav className="flex-1 space-y-1 px-2 py-4">
          {navigation.map((item) => {
            const isCurrent = pathname === item.href;
            return (
              <a
                key={item.name}
                href={`/${item.href}`}
                className={classNames(
                  isCurrent
                    ? "bg-gray-900 text-white"
                    : "text-gray-300 hover:bg-gray-700 hover:text-white",
                  "group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                )}
              >
                <item.icon
                  className={classNames(
                    isCurrent
                      ? "text-gray-300"
                      : "text-gray-400 group-hover:text-gray-300",
                    "mr-3 flex-shrink-0 h-6 w-6"
                  )}
                  aria-hidden="true"
                />
                {item.name}
              </a>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
