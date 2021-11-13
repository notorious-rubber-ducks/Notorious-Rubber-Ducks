import React, { useEffect, useState } from 'react';
import axios from 'axios';

const StarRatings = ({ id, single }) => {
  const [avgRating, setAvgRating] = useState();

  useEffect(() => {
    axios
      .get(`/reviews/?product_id=${id}`)
      .then(({ data }) => {
        setAvgRating(
          data.results.length === 0 ? setAvgRating(0)
            : (data.results.reduce((a, b) => (a + b.rating), 0)) / data.results.length,
        );
      })
      .catch((err) => err);
  }, [id]);

  return (
    <div className="ratings">
      <div className="empty-stars" />
      {single ? <div className="full-stars" style={{ width: `${(single * 100) / 5}%` }} />
        : <div className="full-stars" style={{ width: `${(avgRating * 100) / 5}%` }} />}

    </div>
  );
};

export default StarRatings;
