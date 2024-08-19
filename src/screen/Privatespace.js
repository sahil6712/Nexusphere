import React, { useState } from "react";

export default function Privatespace() {
  const [examid, setExamid] = useState("");
  const [questions, setQuestions] = useState([""]);
  const [options, setOptions] = useState([[{ text: "", isCorrect: false }]]);

  const addOptions = (questionIndex) => {
    const newOptions = [...options];
    newOptions[questionIndex] = [...newOptions[questionIndex], { text: "", isCorrect: false }];
    setOptions(newOptions);
  };

  const optionChange = (questionIndex, optionIndex, value) => {
    const newOptions = [...options];
    newOptions[questionIndex][optionIndex].text = value;
    setOptions(newOptions);
  };

  const toggleCorrectOption = (questionIndex, optionIndex) => {
    const newOptions = [...options];
    newOptions[questionIndex][optionIndex].isCorrect = !newOptions[questionIndex][optionIndex].isCorrect;
    setOptions(newOptions);
  };

  const addQuestion = () => {
    setQuestions([...questions, ""]);
    setOptions([...options, [{ text: "", isCorrect: false }]]);
  };

  const handleChange = (event) => {
    setExamid(event.target.value);
  };

  const handleQuestionChange = (questionIndex, value) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex] = value;
    setQuestions(newQuestions);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = {
      examid,
      questions: questions.map((question, index) => ({
        question,
        options: options[index],
      })),
    };
  
    fetch("http://localhost:5000/api/createexam", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((errData) => {
            throw new Error(
              `Network response was not ok: ${response.statusText}. Error: ${errData.message}`
            );
          });
        }
        return response.json();
      })
      .then((data) => {
        console.log("Data posted successfully:", data);
        setExamid("");
        setQuestions([""]);
        setOptions([[{ text: "", isCorrect: false }]]);
      })
      .catch((error) => {
        console.error("There was a problem posting the data:", error);
        alert(`There was a problem posting the data: ${error.message}`);
      });
  };
  

  return (
    <div
      className="container"
      style={{
        maxWidth: "500px",
        margin: "0 auto",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "5px",
        boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
      }}
    >
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={examid}
          onChange={handleChange}
          placeholder="Enter Exam ID"
          style={{
            width: "100%",
            padding: "8px",
            marginBottom: "10px",
            border: "1px solid #ccc",
            borderRadius: "3px",
          }}
        />

        {questions.map((question, questionIndex) => (
          <div key={questionIndex}>
            <label style={{ marginBottom: "5px" }}>
              Question {questionIndex + 1}:
            </label>
            <input
              type="text"
              value={question}
              style={{
                width: "100%",
                padding: "8px",
                marginBottom: "10px",
                border: "1px solid #ccc",
                borderRadius: "3px",
              }}
              onChange={(e) => handleQuestionChange(questionIndex, e.target.value)}
            />
            <br />
            {options[questionIndex].map((option, optionIndex) => (
              <div key={optionIndex} style={{ marginBottom: "10px" }}>
                <label style={{ marginBottom: "5px" }}>
                  Option {optionIndex + 1}:
                </label>
                <input
                  type="text"
                  value={option.text}
                  style={{
                    width: "100%",
                    padding: "8px",
                    marginBottom: "10px",
                    border: "1px solid #ccc",
                    borderRadius: "3px",
                  }}
                  onChange={(e) => optionChange(questionIndex, optionIndex, e.target.value)}
                />
                <label style={{ marginLeft: "10px" }}>
                  <input
                    type="checkbox"
                    checked={option.isCorrect}
                    onChange={() => toggleCorrectOption(questionIndex, optionIndex)}
                  />
                  Correct
                </label>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addOptions(questionIndex)}
              style={{
                padding: "10px 20px",
                marginTop: "10px",
                backgroundColor: "#ffc107",
                color: "#fff",
                border: "none",
                borderRadius: "3px",
                cursor: "pointer",
              }}
            >
              Add Option
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addQuestion}
          style={{
            padding: "10px 20px",
            marginTop: "10px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "3px",
            cursor: "pointer",
          }}
        >
          Add Question
        </button>
        <button
          type="submit"
          style={{
            padding: "10px 20px",
            marginTop: "10px",
            backgroundColor: "#28a745",
            color: "#fff",
            border: "none",
            borderRadius: "3px",
            cursor: "pointer",
          }}
        >
          Submit
        </button>
      </form>
    </div>
  );
}
