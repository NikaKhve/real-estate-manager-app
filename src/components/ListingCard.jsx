import PropTypes from "prop-types";

import PinIcon from "./icons/PinIcon";
import BedIcon from "./icons/BedIcon";
import SizeIcon from "./icons/SizeIcon";
import PostalIcon from "./icons/PostalIcon";
import classes from "./ListingCard.module.scss";

const ListingCard = ({
  onClick,
  price,
  address,
  area,
  bedrooms,
  city,
  zipCode,
  image,
  isRental,
}) => {
  return (
    <div className={classes.container} onClick={() => onClick()}>
      <section>
        <span className={classes.badge}>
          <p>{isRental ? "ქირავდება" : "იყიდება"}</p>
        </span>
        <img className={classes.image} height="307" src={image} />
      </section>
      <section className={classes.description}>
        <p>{price} ₾</p>
        <p>
          <PinIcon />
          {city}, {address}
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
  isRental: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ListingCard;
