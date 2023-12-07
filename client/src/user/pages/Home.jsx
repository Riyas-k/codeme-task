import React, { useState, useEffect } from 'react';
import axios from '../../axios/config';

const UserHome = () => {
  const [questions, setQuestions] = useState([]);

  // Fetch all questions on component mount
  useEffect(() => {
    axios.get('/api/questions')
      .then(response => setQuestions(response.data.questions))
      .catch(error => console.error('Error fetching questions:', error));
  }, []);

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-semibold mb-6">User Home</h2>
      <ul>
        {questions.map(question => (
          <li key={question._id} className="mb-4">
            <h3 className="text-lg font-semibold">{question.text}</h3>
            <ul>
              {question.options.map((option, index) => (
                <li key={index}>{option}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserHome;
