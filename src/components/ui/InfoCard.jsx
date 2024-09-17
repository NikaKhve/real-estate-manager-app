import PropTypes from "prop-types";

import PhoneIcon from "@/components/icons/PhoneIcon";
import EmailIcon from "@/components/icons/EmailIcon";
import classes from "./InfoCard.module.scss";

const InfoCard = ({ image, name, surname, email, phone }) => {
  return (
    <div className={classes.container}>
      <section className={classes.header}>
        <img src={image} alt="avatar" width="72px" height="72px" />
        <div>
          <p className={classes.fullNameText}>
            {name} {surname}
          </p>
          <p className={classes.roleText}>აგენტი</p>
        </div>
      </section>
      <section className={classes.info}>
        <p>
          <EmailIcon /> {email}
        </p>
        <p>
          <PhoneIcon /> {phone}
        </p>
      </section>
    </div>
  );
};

InfoCard.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  surname: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
};

export default InfoCard;
