import PropTypes from "prop-types";

import right from "@/assets/right.svg";

const ArrowIcon = ({ onClick }) => {
  return (
    <img
      onClick={() => onClick()}
      src={right}
      height="28px"
      alt="right-icon"
      style={{ cursor: "pointer" }}
    />
  );
};

ArrowIcon.propTypes = {
  onClick: PropTypes.func,
};

export default ArrowIcon;
