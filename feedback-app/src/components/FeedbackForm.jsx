import { useContext, useEffect, useState } from "react";
import FeedbackContext from "../context/FeedbackContext";
import RatingSelect from "./RatingSelect";
import Button from "./shared/Button";
import Card from "./shared/Card";

function FeedbackForm() {
  const { addFeedback, editFeedback, setEditFeedback, updateFeedback } =
    useContext(FeedbackContext);

  const [text, setText] = useState("");
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(10);

  useEffect(() => {
    console.log("-- FeedbackForm.jsx:17 --", editFeedback);
    if (editFeedback.isEditing) {
      setBtnDisabled(false);
      setMessage(null);
      setText(editFeedback.feedback.text);
      setRating(editFeedback.feedback.rating);
    }
  }, [editFeedback]);

  const handleTextChange = (e) => {
    if (text === "") {
      setBtnDisabled(true);
      setMessage(null);
    } else if (text !== "" && text.trim().length <= 10) {
      setMessage("Text must be at least 10 characters");
      setBtnDisabled(true);
    } else {
      setMessage(null);
      setBtnDisabled(false);
    }

    setText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim().length > 10) {
      const newFeedback = {
        text,
        rating,
      };

      if (editFeedback.isEditing) {
        updateFeedback({ id: editFeedback.feedback.id, text, rating });
      } else {
        addFeedback(newFeedback);
      }
    }

    setBtnDisabled(true);
    setRating(10);
    setText("");
    setEditFeedback({});
  };

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <h2>how would you rate our service with us?</h2>
        <RatingSelect
          select={(rating) => setRating(rating)}
          selected={rating}
        />

        <div className="input-group">
          <input
            onChange={handleTextChange}
            type="text"
            placeholder="Write a review"
            value={text}
          />
          <Button type="submit" isDisabled={btnDisabled}>
            Send
          </Button>
        </div>

        {message && <div className="message">{message}</div>}
      </form>
    </Card>
  );
}

export default FeedbackForm;
