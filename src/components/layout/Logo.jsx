import { motion } from "framer-motion";

export default function Logo() {
  return (
    <div className="flex items-center gap-2">
      <motion.span
        animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.2, 1] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="text-2xl text-pink-400"
      >
        ★
      </motion.span>
      <span className="font-heading text-2xl font-semibold text-shimmer">Moment</span>
    </div>
  );
}