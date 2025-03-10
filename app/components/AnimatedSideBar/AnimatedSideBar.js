"use client";
import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useMyContext } from "@/app/context/MyContext";
import dynamic from "next/dynamic";
// const MyContextProvider = dynamic(
//   () => import("@/app/context/MyContext").then((mod) => mod.useMyContext),
//   { ssr: false }
// );

const AnimatedSideBar = ({ children,width }) => {
    const {openSideBar}=useMyContext()
  const sidebarVariantsLgDevices = {
    hidden: { x: "-100%" },
    visible: { x: 0 },
    exit: { x: "-100%" },
  };

  const sidebarVariantsSmDevices = {
    hidden: { y: "-100%" },
    visible: { y: 0 },
    exit: { y: "-100%" },
  };
  return (
    <AnimatePresence>
      <motion.div
        initial="hidden"
        animate={`${width>=768?"visible":openSideBar?"visible":"hidden"}`}
        exit="exit"
        variants={width>=768?sidebarVariantsLgDevices:sidebarVariantsSmDevices}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default AnimatedSideBar;
