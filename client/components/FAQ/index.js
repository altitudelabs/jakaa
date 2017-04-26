import './style.scss';
import React, { PropTypes, Component } from 'react';
import classNames from 'classnames';
import { whyDidYouUpdateWrapper } from '../../utils/why-did-you-update';
import Touchable from '../../composeComponents/Ripple/Touch';
import { Link } from 'react-router';
import Topics from './Topics';

class FAQ extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className={classNames('FAQ')}>
        <h1 className={'title'}>
          Freqently asked questions
        </h1>
        <div className={'contact-us'}>
          <span>
            {'Can’t find it here? '}
            <Link to={'/contact-us'} className={'link'}>
              Contact us
            </Link>
            , we are here to help you.
          </span>
        </div>
        <section>
          <Topics
            topics={[
              {
                title: 'account & profile',
                questions: [
                  {
                    question: 'how do i create a profile?',
                    answer: 'Take your ideas to the next level and make something that people use everyday. Something that changes the physical world and does it fast. We still have a long way to go. Hop in and help us get there.'
                  },
                  {
                    question: 'how do i create a profile?',
                    answer: 'Take your ideas to the next level and make something that people use everyday. Something that changes the physical world and does it fast. We still have a long way to go. Hop in and help us get there.'
                  },
                ]
              },
              {
                title: 'renting out items',
                questions: [
                  {
                    question: 'how do i create a listing?',
                    answer: 'Take your ideas to the next level and make something that people use everyday. Something that changes the physical world—and does it fast. We still have a long way to go. Hop in and help us get there.'
                  },
                  {
                    question: 'how do i create a profile?',
                    answer: 'Take your ideas to the next level and make something that people use everyday. Something that changes the physical world and does it fast. We still have a long way to go. Hop in and help us get there.'
                  },
                ]
              },
            ]}
          />
        </section>
      </div>
    );
  }
}

FAQ.defaultProps = {
};

FAQ.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  open: PropTypes.bool,
};

export default whyDidYouUpdateWrapper(FAQ);
