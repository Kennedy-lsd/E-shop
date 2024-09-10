import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { StarRating } from "../components/StarRating";

export function Products({ product }) {
  const navigate = useNavigate();

  const handleClick = () => {
    // Navigate to the product details page with product ID
    navigate(`/shop/main/details/${product._id}`);
  };

  return (
    <div
      className="card-body text-center p-2"
      onClick={handleClick} // Add click handler
      style={{ cursor: "pointer" }} // Make it look clickable
    >
      <img
        src={`http://localhost:8000/${product.image}`}
        alt={product.title}
        className="img-fluid"
        style={{ width: "150px", height: "150px", objectFit: "cover" }} 
      />
      <h6 className="card-title mt-2">{product.title}</h6>
      <p className="card-text text-muted" style={{ fontSize: "0.85rem" }}>
        {product.colorway}
      </p>
      <div className="card-text text-muted" style={{ fontSize: "0.85rem" }}>
        Rating: <StarRating rating={product.rating} />
      </div>
    </div>
  );
}

Products.propTypes = {
  product: PropTypes.object.isRequired,
};
