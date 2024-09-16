import PropTypes from "prop-types";

import classes from "./BaseButton.module.scss";

const BaseButton = ({ label, textColor, backgroundColor }) => {
  return (
    <div
      style={{ backgroundColor: backgroundColor }}
      className={classes.container}
    >
      <p style={{ color: textColor }} className={classes.buttonText}>
        <span>+</span> {label}
      </p>
    </div>
  );
};

BaseButton.propTypes = {
  label: PropTypes.string.isRequired,
  textColor: PropTypes.string.isRequired,
  backgroundColor: PropTypes.string.isRequired,
};

export default BaseButton;
