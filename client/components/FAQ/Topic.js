import React, { PropTypes } from 'react';
import Questions from './Questions';

const Topic = (props) => {
  const {
    topic,
  } = props;

  return (
    <div className={'topic'}>
      <h2 className={'title'}>{topic.title}</h2>
      <Questions questions={topic.questions} />
    </div>
  );
};

Topic.defaultProps = {
};

Topic.propTypes = {
  topic: PropTypes.object,
};

export default Topic;
