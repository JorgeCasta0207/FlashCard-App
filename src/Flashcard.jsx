import React, { useState, useEffect, useRef } from 'react';

const Flashcard = ({ flashcard }) => {
  const [flip, setFlip] = useState(false);
  const [height, setHeight] = useState('initial');

  const frontEl = useRef(); // Reference to the front side of the flashcard
  const backEl = useRef(); // Reference to the back side of the flashcard

  // Calculate and set the maximum height of the flashcard
  function setMaxHeight() {
    const frontHeight = frontEl.current.getBoundingClientRect().height;
    const backHeight = backEl.current.getBoundingClientRect().height;
    setHeight(Math.max(frontHeight, backHeight, 100));
  }

  // Call setMaxHeight when the flashcard data changes
  useEffect(setMaxHeight, [
    flashcard.question,
    flashcard.answer,
    flashcard.options,
  ]);

  // Add event listener for window resize and cleanup on component unmount
  useEffect(() => {
    window.addEventListener('resize', setMaxHeight);
    return () => window.removeEventListener('resize', setMaxHeight);
  }, []);

  return (
    <div
      className={`card ${flip ? 'flip' : ''}`}
      style={{ height: height }}
      onClick={() => setFlip(!flip)}
    >
      <div className='front' ref={frontEl}>
        {/* Display the flashcard question */}
        {flashcard.question}
        <div className='flashcard-options'>
          {/* Display the flashcard options */}
          {flashcard.options.map((option, index) => (
            <div className='flashcard-option' key={index}>
              {option}
            </div>
          ))}
        </div>
      </div>

      <div className='back' ref={backEl}>
        {/* Display the flashcard answer */}
        {flashcard.answer}
      </div>
    </div>
  );
};

export default Flashcard;
