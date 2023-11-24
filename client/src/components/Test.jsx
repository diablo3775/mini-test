import React, { useState, useEffect } from 'react';

const questions = [
  { id: 1, text: "What is the difference between let, var, and const?" },
  { id: 2, text: "What is debouncing and why is it used?" },
  { id: 3, text: "Explain closures in JavaScript." }
];

const Test = () => {
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds

  useEffect(() => {
    if (timeLeft > 0) {
      setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    } else {
      // Time's up, submit answers
      handleSubmit();
    }
  }, [timeLeft]);

  const handleChange = (id, value) => {
    setAnswers({ ...answers, [id]: value });
  };

  const handleSubmit = async () => {
    try {
        const response = await fetch('http://localhost:3001/submit-answers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(answers)
        });
        const data = await response.json();
        console.log('Score:', data.score);
        // Handle the score (display to user, etc.)
    } catch (error) {
        console.error('Error submitting answers:', error);
    }
};

  return (
    <div>
      <h1>JavaScript Mini-Test</h1>
      <h2>Time Left: {Math.floor(timeLeft / 60)}:{timeLeft % 60}</h2>
      {questions.map(question => (
        <div key={question.id}>
          <p>{question.text}</p>
          <textarea 
            onChange={(e) => handleChange(question.id, e.target.value)}
            disabled={timeLeft === 0}
          />
        </div>
      ))}
      <button onClick={handleSubmit} disabled={timeLeft === 0}>Submit</button>
    </div>
  );
};

export default Test;
