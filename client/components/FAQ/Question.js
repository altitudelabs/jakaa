import React, { PropTypes } from 'react';

const Question = (props) => {
  const {
    question,
  } = props;

  return (
    <div className={'question'}>
      <h4>
        {question.question}
      </h4>
      <div className={'answer'}>
        <span>
          {question.answer}
        </span>
      </div>
    </div>
  );
};

Question.defaultProps = {
};

Question.propTypes = {
  question: PropTypes.object,
};

export default Question;
