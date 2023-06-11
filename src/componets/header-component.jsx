import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const Header = ({ setFlashcards }) => {
  const [categories, setCategories] = useState([]);

  const categoryEl = useRef();
  const amountEl = useRef();

  useEffect(() => {
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
    <form className='header' onSubmit={handleSubmit}>
      <label className='nav-label'>FlashCards</label>
      <div className='form-group'>
        <label htmlFor='category'>Presets</label>
        <select id='category' ref={categoryEl}>
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

      <div className='form-group'>
        <a  className='btn' href='#'>Sign In</a>
     </div>

    </form>
  );
};

export default Header;
