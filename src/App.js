import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import JobList from "./pages/JobList";
import JobDetails from "./pages/JobDetails";
import MyApplications from "./pages/MyApplications";
import AdminPostJob from "./pages/AdminPostJob";
import PreparationTools from "./pages/prep/PreparationTools";
import ResumeBuilder from "./pages/prep/ResumeBuilder";
import CoverLetter from "./pages/prep/CoverLetter";
import Portfolio from "./pages/prep/Portfolio";
import QuestionBank from "./pages/prep/QuestionBank";
import GDTopics from "./pages/prep/GDTopics";
import MockInterview from "./pages/prep/MockInterview";
import SalaryInsights from "./pages/prep/SalaryInsights";
import Reviews from "./pages/prep/Reviews";
import OfferEvaluator from "./pages/prep/OfferEvaluator";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/jobs" element={<JobList />} />
        <Route path="/job/:id" element={<JobDetails />} />
        <Route path="/applications" element={<MyApplications />} />
        <Route path="/post-job" element={<AdminPostJob />} />
        <Route path="/prep" element={<PreparationTools />} />
        <Route path="/resume" element={<ResumeBuilder />} />
        <Route path="/cover-letter" element={<CoverLetter />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/gd" element={<GDTopics />} /> 
        <Route path="/mock" element={<MockInterview />} />
        <Route path="/salary" element={<SalaryInsights />} />
        <Route path="/questions" element={<QuestionBank />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/offer" element={<OfferEvaluator />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

