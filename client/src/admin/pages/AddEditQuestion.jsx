import React, { useState, useEffect } from "react";
import axios from "../../axios/config";
import { useNavigate } from "react-router-dom";

const AddEditQuestion = () => {
  const [questions, setQuestions] = useState([]);
  const [text, setText] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [marks, setMarks] = useState(1);
  const [editingQuestionId, setEditingQuestionId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch questions for editing
    axios
      .get("/api/questions")
      .then((response) => setQuestions(response.data.questions))
      .catch((error) => console.error("Error fetching questions:", error));
  }, []);

  const editQuestion = (question) => {
    // Set the form fields with the selected question details
    setEditingQuestionId(question._id);
    setText(question.text);
    setOptions([...question.options]);
    setCorrectAnswer(question.correctAnswer);
    setMarks(question.marks);
  };

  const addOrUpdateQuestion = () => {
    if (editingQuestionId) {
      // Update an existing question
      axios
        .put(`/api/questions/${editingQuestionId}`, {
          text,
          options,
          correctAnswer,
          marks,
        })
        .then((response) => {
          console.log(response.data.message);
          // Reset the form after updating the question
          setEditingQuestionId(null);
          setText("");
          setOptions(["", "", "", ""]);
          setCorrectAnswer("");
          setMarks(1);
        })
        .catch((error) => console.error("Error updating question:", error));
    } else {
      // Add a new question
      axios
        .post("/api/questions", { text, options, correctAnswer, marks })
        .then((response) => {
          console.log(response.data.message);
          // Reset the form after adding the question
          setText("");
          setOptions(["", "", "", ""]);
          setCorrectAnswer("");
          setMarks(1);
        })
        .catch((error) => console.error("Error adding question:", error));
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-semibold mb-6">Add/Edit Question</h2>
      <form>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Question Text
          </label>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-indigo-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Options
          </label>
          {options?.map((option, index) => (
            <input
              key={index}
              type="text"
              value={option}
              onChange={(e) => {
                const newOptions = [...options];
                newOptions[index] = e.target.value;
                setOptions(newOptions);
              }}
              className="w-full px-4 py-2 mb-2 border rounded-md focus:outline-none focus:border-indigo-500"
            />
          ))}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Correct Answer
          </label>
          <input
            type="text"
            value={correctAnswer}
            onChange={(e) => setCorrectAnswer(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-indigo-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Marks
          </label>
          <input
            type="number"
            value={marks}
            onChange={(e) => setMarks(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-indigo-500"
          />
        </div>
        <button
          type="button"
          onClick={addOrUpdateQuestion}
          className="w-full bg-indigo-500 text-white py-2 rounded-md hover:bg-indigo-600 focus:outline-none"
        >
          {editingQuestionId ? "Update Question" : "Add Question"}
        </button>
      </form>

      {/* Display the list of questions for editing */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Questions for Editing</h2>
        <ul>
          {questions?.map((question) => (
            <li key={question._id} className="mb-2">
              <span>{question.text}</span>
              <button
                onClick={() => editQuestion(question)}
                className="ml-2 bg-indigo-500 text-white px-2 py-1 rounded-md hover:bg-indigo-600 focus:outline-none"
              >
                Edit
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AddEditQuestion;
