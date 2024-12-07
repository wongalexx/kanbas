import { useParams } from "react-router";
import { FaPencil } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { useState } from "react";

export default function QuizDetails({ course }: { course: any }) {
  const { cid, qid } = useParams();
  const { quizzes } = useSelector((state: any) => state.quizReducer);
  const quiz = quizzes.find((quiz: any) => quiz._id === qid);

  const [newQuiz, setNewQuiz] = useState({
    _id: 1,
    title: "New Quiz",
    course: "",
    quizType: "",
    points: 100,
    assignmentGroup: "",
    shuffleAnswers: true,
    timeLimit: 30,
    multipleAttempts: false,
    attemptsAllowed: 1,
    showCorrectAnswers: "",
    accessCode: "",
    oneQuestionAtATime: true,
    webcamRequired: false,
    lockQuestionsAfterAnswering: true,
    availableFromDate: "2024-11-01T00:00:00",
    availableUntilDate: "2024-11-10T23:59:59",
    due: "2024-11-10T23:59:59",
    questions: [],
    published: true,
    ...quiz,
  });

  const formatDate = (newDate: string | number | Date) => {
    const date = new Date(newDate);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  };

  return (
    <div>
      <span className="d-flex justify-content-center align-items-center">
        <button className="btn btn-secondary btn-md me-2">Preview</button>
        <a href={`#/Kanbas/Courses/${cid}/Quizzes/${qid}/${newQuiz.title}`}>
          <button className="btn btn-secondary btn-md">
            <span className="d-flex justify-content-center align-items-center">
              <FaPencil className="me-1" /> Edit
            </span>
          </button>
        </a>
      </span>
      <hr />
      <h1 className="mb-4">
        <b>{newQuiz.title}</b>
      </h1>
      <div className="col-6">
        <div className="row">
          <div className="col-6 text-end">
            <b>Quiz Type</b>
          </div>
          <div className="col-6 text-start">{newQuiz.quizType}</div>
        </div>
        <div className="row">
          <div className="col-6 text-end">
            <b>Points</b>
          </div>
          <div className="col-6 text-start">{newQuiz.points}</div>
        </div>
        <div className="row">
          <div className="col-6 text-end">
            <b>Assignment Group</b>
          </div>
          <div className="col-6 text-start">{newQuiz.assignmentGroup}</div>
        </div>
        <div className="row">
          <div className="col-6 text-end">
            <b>Shuffle Answers</b>
          </div>
          <div className="col-6 text-start">
            {newQuiz.shuffleAnswers ? "Yes" : "No"}
          </div>
        </div>
        <div className="row">
          <div className="col-6 text-end">
            <b>Time Limit</b>
          </div>
          <div className="col-6 text-start">{newQuiz.timeLimit}</div>
        </div>
        <div className="row">
          <div className="col-6 text-end">
            <b>Multiple Attempts</b>
          </div>
          <div className="col-6 text-start">
            {newQuiz.multipleAttempts ? "Yes" : "No"}
          </div>
        </div>
        <div className="row">
          <div className="col-6 text-end">
            <b>View Responses</b>
          </div>
          <div className="col-6 text-start">
            {newQuiz.viewResponses ? "Yes" : "No"}
          </div>
        </div>
        <div className="row">
          <div className="col-6 text-end">
            <b>Show Correct Answers</b>
          </div>
          <div className="col-6 text-start">
            {newQuiz.showCorrectAnswers ? "Yes" : "No"}
          </div>
        </div>
        <div className="row">
          <div className="col-6 text-end">
            <b>One Question at a Time</b>
          </div>
          <div className="col-6 text-start">
            {newQuiz.oneQuestionAtATime ? "Yes" : "No"}
          </div>
        </div>
        <div className="row">
          <div className="col-6 text-end">
            <b>Require Respondus LockDown Browser</b>
          </div>
          <div className="col-6 text-start">
            {newQuiz.respondusLockDownBrowser ? "Yes" : "No"}
          </div>
        </div>
        <div className="row">
          <div className="col-6 text-end">
            <b>Required to View Quiz Results</b>
          </div>
          <div className="col-6 text-start">
            {newQuiz.requiredToViewResults ? "Yes" : "No"}
          </div>
        </div>
        <div className="row">
          <div className="col-6 text-end">
            <b>Webcam Required</b>
          </div>
          <div className="col-6 text-start">
            {newQuiz.webcamRequired ? "Yes" : "No"}
          </div>
        </div>
        <div className="row">
          <div className="col-6 text-end">
            <b>Lock Questions After Answering</b>
          </div>
          <div className="col-6 text-start">
            {newQuiz.lockQuestionsAfterAnswering ? "Yes" : "No"}
          </div>
        </div>
      </div>
      <div className="col text-start">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Due</th>
              <th scope="col">For</th>
              <th scope="col">Available from</th>
              <th scope="col">Until</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{formatDate(newQuiz.due)}</td>
              <td>Everyone</td>
              <td>{formatDate(newQuiz.availableFromDate)}</td>
              <td>{formatDate(newQuiz.availableUntilDate)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
