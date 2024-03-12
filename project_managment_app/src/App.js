import './App.css';
import React from 'react';
import { generalQuestions, level1FillInTheBlank } from './Data/Level1';
import { level2Questions, level2FillInTheBlank } from "./Data/Level2"
import { level3Questions, level3FillInTheBlank } from './Data/Level3';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

function App() {
  return (
    <>
      <CardLevel />
    </>
  );
}

function CardLevel() {
  const [currentLevel, setCurrentLevel] = React.useState('level1');
  const [cardIndex, setCardIndex] = React.useState(0);
  const [showAnswer, setShowAnswer] = React.useState(false);
  const [selectedOption, setSelectedOption] = React.useState(null); // New state for selected option
  const [userAnswer, setUserAnswer] = React.useState(''); // New state for user's answer

  const handlePrevCard = () => {
    setCardIndex(Math.max(0, cardIndex - 1));
    setShowAnswer(false);
    setSelectedOption(null); // Reset selected option
    setUserAnswer(''); // Reset user's answer when moving to the next card
  };

  const handleNextCard = () => {
    const currentQuestions = isFillInTheBlank(currentLevel)
      ? getFillInTheBlankQuestions()
      : getCurrentQuestions();

    // Update the index to cycle back to the first card if the last card is reached
    setCardIndex((cardIndex + 1) % currentQuestions.length);
    setShowAnswer(false);
    setSelectedOption(null); // Reset selected option
    setUserAnswer(''); // Reset user's answer when moving to the next card
  };

  const handleSelectLevel = (level) => {
    setCurrentLevel(level);
    setCardIndex(0);
    setSelectedOption(null);
    setUserAnswer('');
    setShowAnswer(false);
  };

  const handleFillInTheBlank = () => {
    setCurrentLevel(getFillInTheBlankLevel(currentLevel));
    setCardIndex(0);
    setSelectedOption(null);
    setUserAnswer('');
    setShowAnswer(false);
  };

  const handleOptionChange = (id) => {
    setSelectedOption(id);
    setShowAnswer(false);
  };

  return (
    <>
      <Container maxWidth="md" style={{ minHeight: '100vh' }}>
        <Grid container spacing={2} direction="column" justifyContent="center" alignItems="center">
          <Grid item xs={12}>
            <CardMedia
              component="img"
              sx={{ height: 300 }}
              image="/pm.jpg"
              title="Project Managment photo"
            />
            {isFillInTheBlank(currentLevel) ? (
              <FillInTheBlankCardView
                card={getFillInTheBlankQuestions()[cardIndex]}
                showAnswer={showAnswer}
                setShowAnswer={setShowAnswer}
                userAnswer={userAnswer}
                setUserAnswer={setUserAnswer}
              />
            ) : (
              <CardView
                card={getCurrentQuestions()[cardIndex]}
                showAnswer={showAnswer}
                setShowAnswer={setShowAnswer}
                selectedOption={selectedOption}
                handleOptionChange={handleOptionChange}
              />
            )}
          </Grid>
          <Grid item xs={12} container justifyContent="center">
            <CardActions>
              <Button variant='outlined' onClick={handlePrevCard}>Prev Card</Button>
              <Button variant='contained' onClick={handleNextCard}>Next Card</Button>
            </CardActions>
          </Grid>
          <Grid item xs={12} container justifyContent="center">
            <div>
              <Button variant='outlined' sx={{ color: 'green', marginRight: '8px'  }} onClick={() => handleSelectLevel('level1')}>Level 1</Button>
              <Button variant='outlined' sx={{ backgroundColor: 'yellow', color: 'black' }} onClick={() => handleSelectLevel('level2')}>Level 2</Button>
              <Button variant='outlined' sx={{ color: 'red', marginLeft: '8px', marginRight: '8px'   }} onClick={() => handleSelectLevel('level3')}>Level 3</Button>
              <Button variant='outlined'  onClick={handleFillInTheBlank}>Fill in the Blank</Button>
            </div>
          </Grid>
        </Grid>
      </Container>
    </>
  );

  function getCurrentQuestions() {
    return currentLevel === 'level1'
      ? generalQuestions
      : currentLevel === 'level2'
        ? level2Questions
        : level3Questions;
  }

  function getFillInTheBlankQuestions() {
    const allFillInTheBlankQuestions = [
      ...level1FillInTheBlank,
      ...level2FillInTheBlank,
      ...level3FillInTheBlank,
    ];

    return allFillInTheBlankQuestions;
  }

  function isFillInTheBlank(level) {
    return level.toLowerCase().includes('fillintheblank');
  }

  function getFillInTheBlankLevel(level) {
    return level + 'FillInTheBlank';
  }
}



function CardView({ card, showAnswer, setShowAnswer, selectedOption, handleOptionChange }) {
  const { question, options, correctAnswer } = card || { options: [] };

  const handleCheckAnswer = () => {
    setShowAnswer(true);
  };

  const isCorrect = selectedOption === correctAnswer;

  return (
    <Card style={{ width: 650, marginBottom: '10px' }}>
      <CardContent>
        {question}
        <div style={{ marginTop: '20px' }}>
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
        <CardActions sx={{ marginTop: '10px' }}>
          <Button variant='outlined' onClick={handleCheckAnswer} disabled={!selectedOption}>
            Check Answer
          </Button>
        </CardActions>
        {showAnswer && (
          <div sx={{ marginTop: '10px' }}>
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

function FillInTheBlankCardView({ card, showAnswer, setShowAnswer, userAnswer, setUserAnswer }) {
  const { question, answer } = card || {};

  const handleCheckAnswer = () => {
    setShowAnswer(true);
  };

  return (
    <Card sx={{ width: 650 }}>
      <CardContent>
        <div style={{ marginTop: '20px' }}>
          <strong>Question:</strong> {question}
        </div>
        <div style={{ marginTop: '20px' }}>
          <label>
            <strong>Your Answer: </strong>
            <input type="text" value={userAnswer} onChange={(e) => setUserAnswer(e.target.value)} />
          </label>
        </div>
        <CardActions>
          <Button onClick={handleCheckAnswer}>Check Answer</Button>
        </CardActions>
        {showAnswer && (
          <div>
            {userAnswer.toLowerCase() === answer.toLowerCase() ? (
              <strong>Correct Answer!</strong>
            ) : (
              <strong>Incorrect Answer. The correct answer is: {answer}</strong>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}


export default App;
