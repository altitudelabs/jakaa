import React, { PropTypes } from 'react';
import Question from './Question';

const Questions = (props) => {
  const {
    questions,
  } = props;

  return (
    <ul className={'question-list'}>
      {questions.map((question, i) => (
        <li key={i}>
          <Question question={question} />
        </li>
      ))}
    </ul>
  );
};

Questions.defaultProps = {
};

Questions.propTypes = {
  questions: PropTypes.array,
};

export default Questions;
