import React, { PropTypes } from 'react';
import Divider from '../../composeComponents/Divider';
import Topic from './Topic';

const Topics = (props) => {
  const {
    topics,
  } = props;

  return (
    <ul className={'topic-list'}>
      {topics.map((topic, i) => (
        <li key={i}>
          {i > 0 ?
            <Divider verticalMargin={0} />
          : null}
          <Topic topic={topic} />
        </li>
      ))}
    </ul>
  );
};

Topics.defaultProps = {
  topics: [],
};

Topics.propTypes = {
  topics: PropTypes.array,
};

export default Topics;
