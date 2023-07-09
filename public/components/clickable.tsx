import { motion } from "framer-motion";

interface Props {
  children: React.ReactNode;
  className?: string
}

const Clickable: React.FC<Props> = ({ children, className }) => {
  return (
    <motion.div
      className={className}
      whileTap={{ scale: 0.92 }}
      whileHover={{ scale: 1.08 }}
    >
      {children}
    </motion.div>
  );
};

export default Clickable;
