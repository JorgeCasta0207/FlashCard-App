import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './App.css';
import FlashcardList from './FlashcardList';

const App = () => {
  const [flashcards, setFlashcards] = useState([]); // State to store flashcards
  const [categories, setCategories] = useState([]); // State to store trivia categories

  const categoryEl = useRef(); // Reference to the category select element
  const amountEl = useRef(); // Reference to the amount input element

  useEffect(() => {
    // Fetch available trivia categories from API on component mount
    axios
      .get('https://opentdb.com/api_category.php')
      .then(res => {
        setCategories(res.data.trivia_categories);
      })
      .catch(error => {
        console.error('Error fetching trivia categories:', error);
      });
  }, []);

  const decodeString = str => {
    const textArea = document.createElement('textarea');
    textArea.innerHTML = str;
    return textArea.value;
  };

  const handleSubmit = e => {
    e.preventDefault();
    // Fetch flashcards from API based on selected category and amount
    axios
      .get('https://opentdb.com/api.php', {
        params: {
          amount: amountEl.current.value,
          category: categoryEl.current.value,
        },
      })
      .then(res => {
        setFlashcards(
          res.data.results.map((questionItem, index) => {
            const answer = decodeString(questionItem.correct_answer);
            const options = [
              ...questionItem.incorrect_answers.map(a => decodeString(a)),
              answer,
            ];
            return {
              id: `${index}-${Date.now()}`,
              question: decodeString(questionItem.question),
              answer: answer,
              options: options.sort(() => Math.random() - 0.5),
            };
          })
        );
      })
      .catch(error => {
        console.error('Error fetching flashcards:', error);
      });
  };

  return (
    <>
      {/* Form for selecting category and number of questions */}
      <form className='header' onSubmit={handleSubmit}>
        <div className='form-group'>
          <label htmlFor='category'>Category</label>
          <select id='category' ref={categoryEl}>
            {/* Render the available categories as options */}
            {categories.map(category => (
              <option value={category.id} key={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className='form-group'>
          <label htmlFor='amount'>Number of Questions</label>
          <input
            type='number'
            id='amount'
            min='1'
            step='1'
            defaultValue={10}
            ref={amountEl}
          />
        </div>

        <div className='form-group'>
          <button className='btn'>Generate</button>
        </div>
      </form>

      {/* Container for displaying flashcards */}
      <div className='container'>
        <FlashcardList flashcards={flashcards} />
      </div>
    </>
  );
};

export default App;
