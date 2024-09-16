import PropTypes from "prop-types";

import PinIcon from "./icons/PinIcon";
import BedIcon from "./icons/BedIcon";
import SizeIcon from "./icons/SizeIcon";
import PostalIcon from "./icons/PostalIcon";
import classes from "./ListingCard.module.scss";

const ListingCard = ({
  price,
  address,
  area,
  bedrooms,
  city,
  zipCode,
  image,
}) => {
  return (
    <div className={classes.container}>
      <section>
        <img className={classes.image} height="307" src={image} />
      </section>
      <section className={classes.description}>
        <p>{price} L</p>
        <p>
          <PinIcon /> {address}
        </p>
        <section>
          <span>
            <BedIcon /> <p>{bedrooms}</p>
          </span>
          <span>
            <SizeIcon />
            <p>
              {area} მ<sup>2</sup>
            </p>
          </span>
          <span>
            <PostalIcon /> <p>{zipCode}</p>
          </span>
        </section>
      </section>
    </div>
  );
};

ListingCard.propTypes = {
  price: PropTypes.number.isRequired,
  address: PropTypes.string.isRequired,
  area: PropTypes.number.isRequired,
  bedrooms: PropTypes.number.isRequired,
  zipCode: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};

export default ListingCard;
