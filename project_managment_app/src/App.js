import './App.css';
import React from 'react';
import { Level1Questions } from './Data/Level1';
import { generalQuestions } from './Data/Level1';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

function App() {
  const [cardIndex, setCardIndex] = React.useState(0)
  return (
    <>
      <BasicCard card={generalQuestions[cardIndex]}
      setCardIndex = {setCardIndex}
      cardIndex = {cardIndex}
      />
    </>
  );
}

function BasicCard(props) {
  const { question, options, correctAnswer } = props.card || { options: [] };

  return <>
    <Card sx={{ minWidth: 275 }}>
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
        <div>
          <strong>Correct Answer:</strong> {correctAnswer}
        </div>
      </CardContent>
      <CardActions>
        <Button onClick={() => {props.setCardIndex(props.cardIndex - 1)}}>Prev Card</Button>
        <Button onClick={() => {props.setCardIndex(props.cardIndex + 1)}}>Next Card</Button>
      </CardActions>
    </Card>
  </>
}

function AllCards() {
  return <>
  {
    generalQuestions.map((x) => {
      return <BasicCard card={x} />
    })
  }
  </>
}

export default App;