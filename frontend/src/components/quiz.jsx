import React, { useState } from "react";
import questionsAndAnswers from "./../data/quizData";
import faq from "./../assets/faq.mp4";

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(getRandomQuestion());
  const [selectedOption, setSelectedOption] = useState(null);
  const [showResult, setShowResult] = useState(false);

  function getRandomQuestion() {
    if (!questionsAndAnswers || questionsAndAnswers.length === 0) return null;
    return questionsAndAnswers[
      Math.floor(Math.random() * questionsAndAnswers.length)
    ];
  }

  const handleOptionClick = (index) => {
    setSelectedOption(index);
    setShowResult(true);
  };

  const handleNewQuestion = () => {
    setCurrentQuestion(getRandomQuestion());
    setSelectedOption(null);
    setShowResult(false);
  };

  if (!currentQuestion) {
    return <div className="text-white">No questions available</div>;
  }

  return (
    <div className="w-full p-5 md:pl-16 flex flex-col md:flex-row items-center gap-12">
      <div className="md:w-1/2">
        <div className="aspect-w-16 aspect-h-9">
          <video src={faq} autoPlay loop muted className="w-full h-full" />
        </div>
      </div>
      <div className="md:w-1/2 md: pb-16 rounded-2xl flex flex-col gap-12 shadow-lg">
        <div className="text-white text-center">
          <h1 className="text-3xl font-bold p-4 md:py-8 shadow-md shadow-blue-200 mb-8">
            Do you know these facts about your Rubik's Cube?
          </h1>
          <h2 className="text-xl mb-6">{currentQuestion.question}</h2>
          <div className="flex flex-col gap-4 items-center">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleOptionClick(index)}
                className={`w-1/2 py-2 px-4 rounded-md text-white transition duration-300 ${
                  showResult
                    ? index === currentQuestion.correctOptionIndex
                      ? "bg-green-500"
                      : index === selectedOption
                      ? "bg-red-500"
                      : "bg-blue-900"
                    : "bg-blue-900 hover:bg-blue-700"
                }`}
                disabled={showResult}
              >
                {option}
              </button>
            ))}
          </div>
          {showResult && (
            <div className="mt-4 text-lg font-semibold">
              {selectedOption === currentQuestion.correctOptionIndex
                ? "Correct! 🎉"
                : `Wrong! The correct answer is: ${
                    currentQuestion.options[currentQuestion.correctOptionIndex]
                  }`}
            </div>
          )}
          <button
            onClick={handleNewQuestion}
            className="w-3/4 bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700 transition duration-300 mt-5"
          >
            Next Question
          </button>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
