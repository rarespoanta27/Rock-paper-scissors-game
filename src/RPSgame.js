import React, { useState, useEffect } from 'react';
import Confetti from 'react-confetti';
import './App.css';

const RPSGame = () => {
  const [userChoice, setUserChoice] = useState('');
  const [computerChoice, setComputerChoice] = useState('');
  const [result, setResult] = useState('');
  const [userScore, setUserScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [theme, setTheme] = useState('theme-light');
  const [showInstructions, setShowInstructions] = useState(false);

  useEffect(() => {
    document.body.className = theme;

    const cursor = document.createElement('div');
    cursor.className = 'cursor';
    document.body.appendChild(cursor);

    const spiderWeb = document.createElement('div');
    spiderWeb.className = 'spider-web';
    document.body.appendChild(spiderWeb);

    const moveCursor = (e) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
      spiderWeb.style.left = `${e.clientX - 45}px`;
      spiderWeb.style.top = `${e.clientY - 45}px`;
    };

    window.addEventListener('mousemove', moveCursor);

    return () => {
      document.body.removeChild(cursor);
      document.body.removeChild(spiderWeb);
      window.removeEventListener('mousemove', moveCursor);
    };
  }, [theme]);

  const choices = ['Rock', 'Paper', 'Scissors'];

  const playGame = (choice) => {
    setUserChoice(choice);
    const randomChoice = choices[Math.floor(Math.random() * choices.length)];
    setComputerChoice(randomChoice);
    determineWinner(choice, randomChoice);
  };

  const determineWinner = (user, computer) => {
    if (user === computer) {
      setResult('It\'s a tie!');
    } else if (
      (user === 'Rock' && computer === 'Scissors') ||
      (user === 'Paper' && computer === 'Rock') ||
      (user === 'Scissors' && computer === 'Paper')
    ) {
      setResult('You win!');
      setUserScore(userScore + 1);
      triggerConfetti();
    } else {
      setResult('Computer wins!');
      setComputerScore(computerScore + 1);
    }
  };

  const triggerConfetti = () => {
    setShowConfetti(true);
    setTimeout(() => {
      setShowConfetti(false);
    }, 3000); // Confetti will be shown for 3 seconds
  };

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'theme-light' ? 'theme-dark' : 'theme-light'));
  };

  const toggleInstructions = () => {
    setShowInstructions((prevShowInstructions) => !prevShowInstructions);
  };

  return (
    <div className="App">
      {showConfetti && <Confetti />}
      <audio src="/relaxing-sound.mp3" autoPlay loop />
      <h1>Rock, Paper, Scissors</h1>
      <div className="button-container">
        {choices.map((choice) => (
          <button key={choice} onClick={() => playGame(choice)}>
            {choice}
          </button>
        ))}
      </div>
      {userChoice && (
        <div className={`result ${result === 'You win!' ? 'win' : result === 'Computer wins!' ? 'lose' : ''}`}>
          <p>You chose: {userChoice}</p>
          <p>Computer chose: {computerChoice}</p>
          <p>{result}</p>
        </div>
      )}
      <div className="scoreboard">
        <p>User Score: {userScore}</p>
        <p>Computer Score: {computerScore}</p>
      </div>
      <button onClick={toggleTheme} className="theme-toggle">
        Toggle Theme
      </button>
      <button onClick={toggleInstructions} className="instructions-button">
        Instructions
      </button>
      {showInstructions && (
        <div className="instructions-popup">
          <h2>How to Play</h2>
          <p>Select Rock, Paper, or Scissors to play against the computer.</p>
          <p>Rock beats Scissors, Scissors beats Paper, and Paper beats Rock.</p>
          <p>Try to beat the computer and have fun!</p>
        </div>
      )}
    </div>
  );
};

export default RPSGame;
