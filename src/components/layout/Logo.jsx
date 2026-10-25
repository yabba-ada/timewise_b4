import { motion } from "framer-motion";
import { Heart } from "lucide-react";

export default function Logo() {
  return (
    <div className="flex items-center gap-2">
      <motion.span
        animate={{ scale: [1, 1.18, 1] }}
        transition={{ duration: 3.5, repeat: Infinity }}
        className="text-rose-300"
      >
        <Heart className="h-5 w-5" fill="currentColor" />
      </motion.span>
      <span className="font-heading text-2xl font-semibold tracking-wide text-shimmer">timewise</span>
    </div>
  );
}