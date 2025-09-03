import { AnimatePresence, motion } from "framer-motion";

const FormError = ({ error }: { error: string }) => {
  return (
    <AnimatePresence>
      <motion.p
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="text-error mt-2 text-sm tracking-wider">
        {error}
      </motion.p>
    </AnimatePresence>
  );
};

export default FormError;
