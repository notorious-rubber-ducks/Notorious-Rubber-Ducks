import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Helpful({ helpfulness, calledFrom, id }) {
  let apiEndPoint;

  const helpLinkStyling = {
    textDecoration: 'underline',
    color: 'blue',
  };

  let reportLinkStyling;

  const [helpful, setHelpful] = useState(helpfulness);
  const [reported, setReported] = useState('Report');
  const [voted, setVoted] = useState(false);

  if (reported === 'Report') {
    reportLinkStyling = {
      textDecoration: 'underline',
      color: 'blue',
    };
  } else {
    reportLinkStyling = {
      textDecoration: 'none',
      color: 'black',
    };
  }

  if (calledFrom === 'q') {
    apiEndPoint = `qa/questions/${id}`;
  } else if (calledFrom === 'a') {
    apiEndPoint = `qa/answers/${id}`;
  } else if (calledFrom === 'review') {
    apiEndPoint = `reviews/${id}`;
  }

  const fontStyle = {
    fontSize: 12,
  };

  function isHelpful() {
    if (!voted) {
      setHelpful(helpfulness + 1);
      setVoted(true);
      axios.put(`${process.env.NODE_ENV === 'production' ? '/' : 'http://localhost:3000/'}${apiEndPoint}/helpful`);
    }
  }

  function report() {
    if (reported === 'Report') {
      setReported('Reported');
      axios.put(`${process.env.NODE_ENV === 'production' ? '/' : 'http://localhost:3000/'}${apiEndPoint}/report`);
    }
  }

  if (calledFrom === 'q') {
    return (
      <span style={fontStyle} className="qHelpful">
        Helpful?
        {' '}
        <a onClick={isHelpful} style={helpLinkStyling} data-testid="helpful">
          Yes(
          {helpful}
          )
        </a>
        {' '}
        {' | '}
        {' '}
        <a style={reportLinkStyling} onClick={report}>{reported}</a>
        {' | \u00A0'}
        {' '}
        {/* <- non-breaking space */}
      </span>
    );
  }
  return (
    <span style={fontStyle}>
      Helpful?
      {' '}
      <a onClick={isHelpful} style={helpLinkStyling}>
        Yes(
        {helpful}
        )
      </a>
      {' | '}
      {' '}
      {/* <- non-breaking space */}
      <a onClick={report} style={reportLinkStyling}>{reported}</a>
    </span>
  );
}
