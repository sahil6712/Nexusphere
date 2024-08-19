import React, { useState, useEffect } from "react";

export default function Fetchexam() {
  const [examData, setExamData] = useState(null);
  const [enteredExamId, setEnteredExamId] = useState("");
  const [email, setEmail] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [score, setScore] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchExamData();
  }, []);

  const fetchExamData = () => {
    fetch("http://localhost:5000/api/fetchexam")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Exam data fetched successfully:", data);
        setExamData(data);
      })
      .catch((error) => {
        console.error("There was a problem fetching the data:", error);
        setError("There was a problem fetching the data. Please try again later.");
      });
  };

  const handleExamIdChange = (event) => {
    setEnteredExamId(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleOptionSelect = (questionIndex, optionIndex) => {
    setSelectedOptions((prevSelectedOptions) => {
      const updatedSelectedOptions = [...prevSelectedOptions];
      updatedSelectedOptions[questionIndex] = optionIndex;
      return updatedSelectedOptions;
    });
  };

  const handleSubmit = () => {
    if (!examData) return;

    let newScore = 0;

    const selectedExam = examData.find((exam) => exam.examid === enteredExamId);

    if (!selectedExam) {
      setError("No exam found with the entered ID.");
      return;
    }

    selectedExam.questions.forEach((question, questionIndex) => {
      const selectedOptionIndex = selectedOptions[questionIndex];
      if (selectedOptionIndex !== undefined && question.options[selectedOptionIndex].isCorrect) {
        newScore++;
      }
    });

    setScore(newScore);

    // Save the score, exam ID, and email to the user's database
    saveUserScore(enteredExamId, newScore, email);
  };

  const saveUserScore = (examId, score, email) => {
    fetch("http://localhost:5000/api/Leader", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ examId, score, email }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Score saved successfully:", data);
        // Handle successful score save
      })
      .catch((error) => {
        console.error("There was a problem saving the score:", error);
        setError("There was a problem saving your score. Please try again later.");
      });
  };

  const selectedExam = examData?.find((exam) => exam.examid === enteredExamId);

  return (
    <div style={{ fontFamily: "Arial, sans-serif", color: "#333" }}>
      <h1 style={{ color: "#008080" }}>Exam Questions</h1>
      <div>
        <label htmlFor="examId">Enter Exam ID:</label>
        <input type="text" id="examId" value={enteredExamId} onChange={handleExamIdChange} />
      </div>
      <div>
        <label htmlFor="email">Enter Email:</label>
        <input type="email" id="email" value={email} onChange={handleEmailChange} />
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {selectedExam ? (
        <>
          {selectedExam.questions.map((question, questionIndex) => (
            <div key={questionIndex} style={{ marginBottom: "20px", border: "1px solid #ccc", padding: "10px", borderRadius: "5px", background: "#f9f9f9" }}>
              <h3 style={{ color: "#4CAF50" }}>Question {questionIndex + 1}:</h3>
              <p>{question.question}</p>
              <ul>
                {question.options.map((option, optionIndex) => (
                  <li key={optionIndex}>
                    <label>
                      <input
                        type="radio"
                        name={`question-${questionIndex}`}
                        value={optionIndex}
                        onChange={() => handleOptionSelect(questionIndex, optionIndex)}
                      />
                      {option.text}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <button onClick={handleSubmit}>Submit Answers</button>
        </>
      ) : (
        <p>Loading exam data...</p>
      )}

      <p>Score: {score}</p>
    </div>
  );
}
