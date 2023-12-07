import React, { useState, useEffect } from 'react';
import axios from '../../axios/config';
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [questions, setQuestions] = useState([]);
  const navigate = useNavigate()

  // Fetch users and questions on component mount
  useEffect(() => {
    // Fetch users awaiting approval
    axios.get('/api/users/pending-approval')
      .then(response => setUsers(response.data.users))
      .catch(error => console.error('Error fetching users:', error));

    // Fetch all questions
    axios.get('/api/questions')
      .then(response => setQuestions(response.data.questions))
      .catch(error => console.error('Error fetching questions:', error));
  }, []);

  const approveUser = (userId) => {
    // Admin approves a user
    axios.post('/api/admin/approve-user', { userId })
      .then(response => {
        console.log(response.data.message);
        // Update the users state after approval
        setUsers(users.filter(user => user._id !== userId));
      })
      .catch(error => console.error('Error approving user:', error));
  };

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-semibold mb-6">Admin Dashboard</h2>
        <div>
            <button className='bg-green-600 rounded p-3' onClick={()=>navigate('/admin/add-question')}>Add Questions</button>
        </div>
      {/* Users Awaiting Approval */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Users Awaiting Approval</h3>
        <ul>
          {users?.map(user => (
            <li key={user._id} className="flex items-center justify-between mb-2">
              <span>{user.email}</span>
              <button onClick={() => approveUser(user._id)} className="bg-green-500 text-white px-2 py-1 rounded-md">Approve</button>
            </li>
          ))}
        </ul>
      </div>

      {/* All Questions */}
      <div>
        <h3 className="text-xl font-semibold mb-4">All Questions</h3>
        <ul>
          {questions?.map(question => (
            <li key={question._id} className="mb-4">
              <h4 className="text-lg font-semibold">{question.text}</h4>
              <ul>
                {question.options.map((option, index) => (
                  <li key={index}>{option}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboard;
