import { createContext, useEffect, useState } from "react";

const FeedbackContext = createContext();

export const FeedbackProvider = ({children}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [feedback, setFeedback] = useState([]);
    const [editFeedback, setEditFeedback] = useState({});

    useEffect(() => {
        fetchFeedback();
    }, [])

    const fetchFeedback = async () => {
        const response = await fetch('/feedback?_sort=rating&_order=desc');

        const data = await response.json();

        setFeedback(data)
        setIsLoading(false)
    }
    const deleteFeedback = async (id) => {
        if(window.confirm('really want to delete?')) {
            await fetch(`/feedback/${id}`, {
                method: 'DELETE'
            })

            setFeedback(feedback.filter((item) => item.id !== id))
        }
    }

    const addFeedback = async (newFeedback) => {
        const response = await fetch('/feedback', {
            method: 'POST',
            'headers': {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newFeedback)
        });

        const data = await response.json()

        setFeedback([data,...feedback])
    }

    const updateFeedback = async (updatedFeedback) => {
        const response = await fetch(`/feedback/${updatedFeedback.id}`, {
            method: 'PUT',
            'headers': {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedFeedback)
        })

        const data = await response.json();

        setFeedback(feedback.map((item) => item.id === data.id ? data : item));
    }

    return <FeedbackContext.Provider value={{
        addFeedback,
        deleteFeedback,
        editFeedback,
        setEditFeedback,
        updateFeedback,
        feedback,
        isLoading
    }}>
        {children}
    </FeedbackContext.Provider>
}

export default FeedbackContext;
