import './App.css';
import React from 'react';
import { generalQuestions, level1FillInTheBlank } from './Data/Level1';
import { level2Questions, level2FillInTheBlank } from "./Data/Level2"
import { level3Questions, level3FillInTheBlank } from './Data/Level3';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';

function App() {
  const [cardIndex, setCardIndex] = React.useState(0)
  return (
    <>
<CardLevel/> 

    </>
  );
}



function CardLevel() {
  const [currentLevel, setCurrentLevel] = React.useState('level1');
  const [cardIndex, setCardIndex] = React.useState(0);

  const handlePrevCard = () => {
    setCardIndex(Math.max(0, cardIndex - 1));
  };

  const handleNextCard = () => {
    const currentQuestions =
      currentLevel === 'level1'
        ? generalQuestions
        : currentLevel === 'level2'
        ? level2Questions
        : level3Questions;

    setCardIndex(Math.min(currentQuestions.length - 1, cardIndex + 1));
  };

  const handleSelectLevel = (level) => {
    setCurrentLevel(level);
    setCardIndex(0);
  };

  return (
    <>
      <CardView card={getCurrentQuestions()[cardIndex]} />
      <CardActions>
        <Button onClick={handlePrevCard}>Prev Card</Button>
        <Button onClick={handleNextCard}>Next Card</Button>
      </CardActions>
      <div>
        <Button onClick={() => handleSelectLevel('level1')}>Level 1</Button>
        <Button onClick={() => handleSelectLevel('level2')}>Level 2</Button>
        <Button onClick={() => handleSelectLevel('level3')}>Level 3</Button>
      </div>
    </>
  );

  function getCurrentQuestions() {
    return currentLevel === 'level1'
      ? generalQuestions
      : currentLevel === 'level2'
      ? level2Questions
      : level3Questions;
  }
}

function CardView({ card }) {
  const { question, options, correctAnswer } = card || { options: [] };
  const [selectedOption, setSelectedOption] = React.useState(null);
  const [showAnswer, setShowAnswer] = React.useState(false);

  const handleOptionChange = (id) => {
    setSelectedOption(id);
    setShowAnswer(false); // Reset showAnswer when selecting a new option
  };

  const handleCheckAnswer = () => {
    setShowAnswer(true);
  };

  const selectedOptionObject = options.find((option) => option.id === selectedOption);

  return (
    <Card sx={{ maxWidth: 650 }}>
      <CardContent>
        {question}
        <div>
          <strong>Options:</strong>
          <ul>
            {options.map((option) => (
              <li key={option.id}>
                <label>
                  <input
                    type="radio"
                    name="options"
                    value={option.id}
                    checked={selectedOption === option.id}
                    onChange={() => handleOptionChange(option.id)}
                  />
                  {option.text}
                </label>
              </li>
            ))}
          </ul>
        </div>
        <CardActions>
          <Button onClick={handleCheckAnswer} disabled={!selectedOption}>
            Check Answer
          </Button>
        </CardActions>
        {showAnswer && (
  <div>
    {selectedOption === correctAnswer ? (
      <strong>Correct Answer!</strong>
    ) : (
      <strong>Incorrect Answer. The correct answer is: {options.find(option => option.id === correctAnswer).text}</strong>
    )}
  </div>
)}

      </CardContent>
    </Card>
  );
}







export default App;