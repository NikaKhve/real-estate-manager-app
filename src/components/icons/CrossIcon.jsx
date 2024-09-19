import PropTypes from "prop-types";

import cross from "@/assets/cross.svg";

const CrossIcon = ({ onClick }) => {
  return (
    <img
      onClick={() => onClick()}
      src={cross}
      alt="cross-icon"
      style={{ cursor: "pointer" }}
    />
  );
};

CrossIcon.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default CrossIcon;
