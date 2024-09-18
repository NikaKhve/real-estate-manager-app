import PropTypes from "prop-types";

import classes from "./BaseButton.module.scss";

const BaseButton = ({
  label,
  textColor,
  backgroundColor,
  onClick,
  type,
  showIcon = true,
}) => {
  return (
    <button
      type={type}
      onClick={() => onClick && onClick()}
      style={{ backgroundColor: backgroundColor }}
      className={classes.container}
    >
      <p style={{ color: textColor }} className={classes.buttonText}>
        {showIcon && <span>+</span>} {label}
      </p>
    </button>
  );
};

BaseButton.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  onClick: PropTypes.func,
  textColor: PropTypes.string.isRequired,
  showIcon: PropTypes.bool,
  backgroundColor: PropTypes.string.isRequired,
};

export default BaseButton;
