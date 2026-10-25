import { motion } from "framer-motion";
import { Image } from "@/components/ui/image";

// The little flower-headed friend, drawn by the builder.
const MASCOT_SRC = "https://media.base44.com/images/public/6ade29326d444f4a385780c2/746de8835_Image_20260916_184519_053.jpeg";

export default function Mascot({ className = "h-10 w-10" }) {
  return (
    <motion.span
      animate={{ y: [0, -3, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      className={`flex shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-card ring-1 ring-rose-100 ${className}`}
    >
      <Image src={MASCOT_SRC} alt="timewise mascot" fittingType="fill" className="h-full w-full" />
    </motion.span>
  );
}