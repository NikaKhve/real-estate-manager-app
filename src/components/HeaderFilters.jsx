import { useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

import ChevronIcon from "./icons/ChevronIcon";
import BaseButton from "./ui/BaseButton";
import classes from "./HeaderFilters.module.scss";

const HeaderFilters = ({ onClick }) => {
  const [activeFilter, setActiveFilter] = useState(null);
  const navigate = useNavigate();

  const handleOnAddNewListing = () => {
    navigate("/add-new-listing");
  };

  const handleFilterClick = (filter) => {
    if (activeFilter === filter) {
      setActiveFilter(null);
    } else {
      setActiveFilter(filter);
    }
  };

  const renderDropdown = () => {
    return (
      <div className={classes.dropdown}>
        <p>Dropdown content</p>
      </div>
    );
  };

  return (
    <div className={classes.container}>
      <div className={classes.topNav}>
        <section className={classes.filtersWrapper}>
          <div
            className={`${classes.filterBox} ${
              activeFilter === "region" ? classes.active : ""
            }`}
            onClick={() => handleFilterClick("region")}
          >
            <p>რეგიონი</p>
            <ChevronIcon />
            {activeFilter === "region" && renderDropdown()}
          </div>
          <div
            className={`${classes.filterBox} ${
              activeFilter === "price" ? classes.active : ""
            }`}
            onClick={() => handleFilterClick("price")}
          >
            <p>საფასო კატეგორია</p>
            <ChevronIcon />
            {activeFilter === "price" && renderDropdown()}
          </div>
          <div
            className={`${classes.filterBox} ${
              activeFilter === "area" ? classes.active : ""
            }`}
            onClick={() => handleFilterClick("area")}
          >
            <p>ფართობი</p>
            <ChevronIcon />
            {activeFilter === "area" && renderDropdown()}
          </div>
          <div
            className={`${classes.filterBox} ${
              activeFilter === "bedrooms" ? classes.active : ""
            }`}
            onClick={() => handleFilterClick("bedrooms")}
          >
            <p>საძინებლების რაოდენობა</p>
            <ChevronIcon />
            {activeFilter === "bedrooms" && renderDropdown()}
          </div>
        </section>
        <section className={classes.buttonsWrapper}>
          <BaseButton
            onClick={() => handleOnAddNewListing()}
            label="ლისტინგის დამატება"
            textColor="#FFFFFF"
            backgroundColor="#F93B1D"
          />
          <BaseButton
            onClick={() => onClick()}
            label="აგენტის დამატება"
            textColor="#F93B1D"
            backgroundColor="#FFFFFF"
          />
        </section>
      </div>

      <section>BOXES</section>
    </div>
  );
};

HeaderFilters.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default HeaderFilters;
