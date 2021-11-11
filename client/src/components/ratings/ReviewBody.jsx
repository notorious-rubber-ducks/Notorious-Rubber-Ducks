import React, { useEffect, useState, useContext } from 'react';
import UploadFile from '../sharedComponents/UploadFile.jsx';
import StarRatings from '../sharedComponents/StarRatings.jsx';
import AppContext from '../../hooks/context.js';
import Helpful from '../shared/Helpful.jsx';

const ReviewBody = ({ props }) => {
  const context = useContext(AppContext).defaultItem;
  const [data, setData] = useState();
  const [bodyLength, setBodyLength] = useState();
  const [body, setBody] = useState();
  const [summary, setSummary] = useState();

  const handleClick = () => {
    setBody(data.body);
  };

  const date = () => {
    let today = new Date(data.date);
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
    const yyyy = today.getFullYear();

    today = `${mm}/${dd}/${yyyy}`;
    return today;
  };

  useEffect(() => {
    setData(props);
    setBody(props.body.slice(0, 250));
    setBodyLength(props.body.length);
    setSummary(props.summary.slice(0, 60));
  }, [props]);

  return (
    <div>
      <div style={{
        display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: '2%',
      }}
      >
        <div style={{ fontWeight: 'bold', fontSize: '20px' }}>{data ? data.reviewer_name : null}</div>

        <div style={{ textAlign: 'right', opacity: '.7', fontStyle: 'italic' }}>
          Posted on
          {' '}
          {data ? date() : null}
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <div style={{ marginRight: '2%' }}>
          {' '}
          <StarRatings id={context.id} />
        </div>
        <div
          className="Summary"
          style={{
            fontWeight: 'bold', paddingBottom: '1%', paddingTop: '1%', fontSize: '22px',
          }}
        >
          {summary}
        </div>
      </div>
      <div className="Body" style={{ paddingBottom: '1%', paddingTop: '1%', borderBottom: '1px solid' }}>
        {body}
        <br />
        <br />
        <Helpful helpfulness={props.helpfulness} calledFrom="review" id={context.id} />

        {bodyLength > 250 ? <button type="submit" onClick={handleClick}>Show Full Review</button> : null}
      </div>
    </div>

  );
};

export default ReviewBody;
