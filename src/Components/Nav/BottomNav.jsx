import { motion } from "framer-motion";
import { useState } from "react";
import {
  HomeIcon,
  UserIcon,
  BellIcon,
  HeartIcon,
  CogIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

export default function BottomNav() {
  const [activeTab, setActiveTab] = useState(0);

  // Tabs matching your top nav
  const tabs = [
    { name: "Home", icon: <HomeIcon className="w-6 h-6" /> },
    { name: "Products", icon: <MagnifyingGlassIcon className="w-6 h-6" /> },
    { name: "Favorites", icon: <HeartIcon className="w-6 h-6" /> },
    { name: "Notifications", icon: <BellIcon className="w-6 h-6" /> },
    { name: "Profile", icon: <UserIcon className="w-6 h-6" /> },
    { name: "Settings", icon: <CogIcon className="w-6 h-6" /> },
  ];

  return (
    <motion.div className="fixed bottom-0 left-0 w-full bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center px-4 py-2 md:px-20 z-50 shadow-md">
      {tabs.map((tab, index) => (
        <button
          key={index}
          onClick={() => setActiveTab(index)}
          className="flex flex-col items-center justify-center text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200"
        >
          {tab.icon}
          <span
            className={`text-xs mt-1 ${
              activeTab === index
                ? "text-purple-600 dark:text-purple-400 font-semibold"
                : ""
            }`}
          >
            {tab.name}
          </span>
          {activeTab === index && (
            <motion.div
              layoutId="underline"
              className="w-full h-[2px] bg-purple-600 rounded-full mt-1"
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          )}
        </button>
      ))}
    </motion.div>
  );
}
