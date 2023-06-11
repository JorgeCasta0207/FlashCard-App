import React from 'react';
import Flashcard from './Flashcard';

const FlashcardList = ({ flashcards }) => {

    return(
        <div className='card-grid'>
            {/* Render each flashcard in the list */}
            {flashcards.map(flashcard => {
                return(
                    <Flashcard flashcard={flashcard} key={flashcard.id}/>
                )
            })}
        </div>
    )
}

export default FlashcardList;
