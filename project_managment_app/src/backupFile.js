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
<Test/> 

      {/* <BasicCard card={generalQuestions[cardIndex]}
        setCardIndex={setCardIndex}
        cardIndex={cardIndex}
      />
      <BasicCard card={level2Questions[cardIndex]}
        setCardIndex={setCardIndex}
        cardIndex={cardIndex} />

      <BasicCard card={Level3Questions[cardIndex]}
        setCardIndex={setCardIndex}
        cardIndex={cardIndex} />

      <BasicCard2 card={level1FillInTheBlank[cardIndex]}
        setCardIndex={setCardIndex}
        cardIndex={cardIndex} />

      <BasicCard2 card={level2FillInTheBlank[cardIndex]}
        setCardIndex={setCardIndex}
        cardIndex={cardIndex} />

      <BasicCard2 card={level3FillInTheBlank[cardIndex]}
        setCardIndex={setCardIndex}
        cardIndex={cardIndex} /> */}


    </>
  );
}

function BasicCard(props) {
  const { question, options, correctAnswer } = props.card || { options: [] };
  const [showAnswer, setShowAnswer] = React.useState(false);

  return <>
    <Card sx={{ maxWidth: 650 }}>
      <CardContent>
        {question}
        <div>
          <strong>Options:</strong>
          <ul>
            {options.map((option) => (
              <li key={option.id}>{option.text}</li>
            ))}
          </ul>
        </div>
        {showAnswer && (
          <div>
            <strong>Correct Answer:</strong> {correctAnswer}
          </div>
        )}
      </CardContent>
      <CardActions>
        <Button onClick={() => { setShowAnswer(!showAnswer) }}>
          {showAnswer ? 'Hide Answer' : 'Show Answer'}
        </Button>
      </CardActions>
      <CardActions>
        <Button onClick={() => { props.setCardIndex(props.cardIndex - 1) }}>Prev Card</Button>
        <Button onClick={() => { props.setCardIndex(props.cardIndex + 1) }}>Next Card</Button>
      </CardActions>
    </Card>
  </>
}

function BasicCard2(props) {
  const { question, answer } = props.card || { options: [] };
  const [showAnswer, setShowAnswer] = React.useState(false);

  return <>
    <Card sx={{ maxWidth: 650 }}>
      <CardContent>
        <div>
          <strong>Question:  </strong>
        </div>
        {question}
        <div>
        {showAnswer && (
          <div>
            <strong>Correct Answer:</strong> {answer}
          </div>
        )}
        </div>
      </CardContent>
      <CardActions>
        <Button onClick={() => { setShowAnswer(!showAnswer) }}>
          {showAnswer ? 'Hide Answer' : 'Show Answer'}
        </Button>
      </CardActions>
      <CardActions>
        <Button onClick={() => { props.setCardIndex(props.cardIndex - 1) }}>Prev Card</Button>
        <Button onClick={() => { props.setCardIndex(props.cardIndex + 1) }}>Next Card</Button>
      </CardActions>
    </Card>
  </>
}


function Test() {
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
  const [showAnswer, setShowAnswer] = React.useState(false);

  return (
    <Card sx={{ maxWidth: 650 }}>
      <CardContent>
        {question}
        <div>
          <strong>Options:</strong>
          <ul>
            {options.map((option) => (
              <li key={option.id}>{option.text}</li>
            ))}
          </ul>
        </div>
        <CardActions>
          <Button onClick={() => setShowAnswer(!showAnswer)}>
            {showAnswer ? 'Hide Answer' : 'Show Answer'}
          </Button>
        </CardActions>
        {showAnswer && (
          <div>
            <strong>Correct Answer:</strong> {correctAnswer}
          </div>
        )}
      </CardContent>
    </Card>
  );
}



export default App;