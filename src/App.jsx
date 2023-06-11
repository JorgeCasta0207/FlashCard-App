import React, { useState } from 'react';
import Header from './componets/header-component';
import Container from './componets/container-component';
import './App.css';

const App = () => {
  const [flashcards, setFlashcards] = useState([]);

  return (
    <>
      <Header setFlashcards={setFlashcards} />
      <Container flashcards={flashcards} />
    </>
  );
};

export default App;
