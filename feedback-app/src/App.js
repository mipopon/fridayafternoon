import { BrowserRouter, Route, Routes } from "react-router-dom";
import AboutIconLink from "./components/AboutIconLink";
import FeedbackForm from "./components/FeedbackForm";
import FeedbackList from "./components/FeedbackList";
import FeedbackStats from "./components/FeedbackStats";
import Header from "./components/Header"
import AboutPage from "./components/pages/AboutPage";
import { FeedbackProvider } from "./context/FeedbackContext";

function App() {
    return (
        <FeedbackProvider>
        <BrowserRouter>
        <Header />
        <div className="container">
            <Routes>
            <Route path="/" element={
                <>
                    <FeedbackForm />
                    <FeedbackStats/>
                    <FeedbackList />
                    <AboutIconLink />
                </>
            }>
            </Route>

            <Route path='/about' element={<AboutPage />}/>
            </Routes>

        </div>
        </BrowserRouter>
        </FeedbackProvider>
    )
}

export default App
