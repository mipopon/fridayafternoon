import { AnimatePresence, motion } from "framer-motion";
import { useContext } from "react";
import FeedbackContext from "../context/FeedbackContext";
import FeedbackItem from "./FeedbackItem";
import Loader from "./shared/Loader";

function FeedbackList() {
  const { feedback, isLoading } = useContext(FeedbackContext);
  return isLoading ? (
    <Loader />
  ) : (
    <div className="feedback-list">
      <AnimatePresence>
        {feedback.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <FeedbackItem key={item.id} item={item} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

export default FeedbackList;