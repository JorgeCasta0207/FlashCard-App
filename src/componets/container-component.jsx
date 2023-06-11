import React from 'react';
import FlashcardList from '../FlashcardList';

const Container = ({ flashcards }) => {
  return (
    <div className='container'>
      <FlashcardList flashcards={flashcards} />
    </div>
  );
};

export default Container;
