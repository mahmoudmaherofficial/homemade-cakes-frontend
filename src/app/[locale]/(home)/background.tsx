"use client";
import Image from "next/image";
import { motion } from "framer-motion";

const Background = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1 }}
      className="
        absolute
        bottom-15 right-1/2 translate-x-1/2
        w-[350px] h-[350px] sm:w-[350px] sm:h-[350px] lg:w-[450px] lg:h-[450px]
        -z-10
      ">
      <Image src="/images/blob.svg" alt="blob" width={400} height={400} className="object-contain w-full h-full" />
    </motion.div>
  );
};

export default Background;
