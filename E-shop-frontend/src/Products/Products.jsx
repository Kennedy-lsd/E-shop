import PropTypes from "prop-types";
import { StarRating } from "../components/StarRating";

export function Products({ product }) {
  return (
    <div className="card-body text-center p-2">
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
        Rating: <StarRating rating={product.rating}/>
      </div>
    </div>
  );
}

Products.propTypes = {
  product: PropTypes.object.isRequired,
};
