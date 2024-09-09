import PropTypes from 'prop-types';

const getStars = (rating) => {
  const fullStar = '★'; 
  const emptyStar = '☆'; 

  return Array(5)
    .fill(fullStar)
    .map((star, index) =>
      index < Math.round(rating) ? star : emptyStar
    )
    .join('');
};

export function StarRating({ rating }) {
  return <div>{getStars(rating)}</div>;
}

StarRating.propTypes = {
  rating: PropTypes.number.isRequired,
};
