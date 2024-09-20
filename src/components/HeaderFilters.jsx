import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { Checkbox, NumberInput } from "@mantine/core";

import CrossIcon from "./icons/CrossIcon";
import ChevronIcon from "./icons/ChevronIcon";
import BaseButton from "./ui/BaseButton";
import classes from "./HeaderFilters.module.scss";

const initialFilters = {
  region: [],
  price: { min: null, max: null },
  area: { min: null, max: null },
  bedrooms: null,
};

const HeaderFilters = ({ onClick, regions, onFilterChange }) => {
  const [selectedFilters, setSelectedFilters] = useState(() => {
    const savedFilters = localStorage.getItem("selectedFilters");
    return savedFilters
      ? JSON.parse(savedFilters)
      : {
          region: [],
          price: { min: null, max: null },
          area: { min: null, max: null },
          bedrooms: null,
        };
  });

  const [tempFilters, setTempFilters] = useState({ ...selectedFilters });

  useEffect(() => {
    localStorage.setItem("selectedFilters", JSON.stringify(selectedFilters));
    setTimeout(() => {
      onFilterChange(selectedFilters);
    }, 300);
  }, [selectedFilters, onFilterChange]);

  const [activeFilter, setActiveFilter] = useState(null);
  const [priceError, setPriceError] = useState(null);
  const [areaError, setAreaError] = useState(null);
  const navigate = useNavigate();

  const handleOnAddNewListing = () => {
    navigate("/add-new-listing");
  };

  const handleFilterClick = (filter) => {
    setActiveFilter(activeFilter === filter ? null : filter);
  };

  const handleDropdownClick = (e) => {
    e.stopPropagation();
  };

  const regionOptions = regions?.map((region) => ({
    value: String(region.id),
    label: region.name,
  }));

  const handleCheckboxChange = (type, values) => {
    setTempFilters((prev) => ({
      ...prev,
      [type]: values,
    }));
  };

  const handleRangeChange = (type, field, value) => {
    setTempFilters((prev) => ({
      ...prev,
      [type]: {
        ...prev[type],
        [field]: value,
      },
    }));
  };

  const handleAreaChange = (field, value) => {
    handleRangeChange("area", field, value);
  };

  const handleBedroomsChange = (value) => {
    setTempFilters((prev) => ({
      ...prev,
      bedrooms: value,
    }));
  };

  const handlePriceChange = (field, value) => {
    handleRangeChange("price", field, value);
  };

  const handlePriceBoxClick = (minOrMax, value) => {
    handlePriceChange(minOrMax, value);
  };

  const validatePrice = () => {
    if (tempFilters.price.min >= tempFilters.price.max) {
      setPriceError("მინიმალური მნიშვნელობა არ უნდა იყოს მაქსიმალურზე მეტი");
      return false;
    }
    setPriceError(null);
    return true;
  };

  const validateArea = () => {
    if (tempFilters.area.min >= tempFilters.area.max) {
      setAreaError("მინიმალური მნიშვნელობა არ უნდა იყოს მაქსიმალურზე მეტი");
      return false;
    }
    setAreaError(null);
    return true;
  };

  const handleApplyFilters = () => {
    if (activeFilter === "price" && !validatePrice()) {
      return;
    }
    if (activeFilter === "area" && !validateArea()) {
      return;
    }
    setSelectedFilters(tempFilters);
    onFilterChange(tempFilters);
    setActiveFilter(null);
  };

  const handleChipRemove = (type, value) => {
    if (type === "price" || type === "area") {
      setSelectedFilters((prev) => ({
        ...prev,
        [type]: { min: null, max: null },
      }));
      setTempFilters((prev) => ({
        ...prev,
        [type]: { min: null, max: null },
      }));
      onFilterChange({
        ...selectedFilters,
        [type]: { min: null, max: null },
      });
    } else if (type === "bedrooms") {
      setSelectedFilters((prev) => ({
        ...prev,
        bedrooms: null,
      }));
      setTempFilters((prev) => ({
        ...prev,
        bedrooms: null,
      }));
      onFilterChange({
        ...selectedFilters,
        bedrooms: null,
      });
    } else {
      setSelectedFilters((prev) => ({
        ...prev,
        [type]: prev[type].filter((item) => item !== value),
      }));
      setTempFilters((prev) => ({
        ...prev,
        [type]: prev[type].filter((item) => item !== value),
      }));
      onFilterChange({
        ...selectedFilters,
        [type]: selectedFilters[type].filter((item) => item !== value),
      });
    }
  };

  const handleClearAllFilters = () => {
    setSelectedFilters(initialFilters);
    setTempFilters(initialFilters);
    localStorage.removeItem("selectedFilters");
    onFilterChange(initialFilters);
  };

  const hasActiveFilters = () => {
    return (
      selectedFilters.region.length > 0 ||
      (selectedFilters.price.min && selectedFilters.price.max) ||
      (selectedFilters.area.min && selectedFilters.area.max) ||
      selectedFilters.bedrooms
    );
  };

  const renderDropdown = (filterType) => {
    return (
      <div className={classes.dropdown} onClick={handleDropdownClick}>
        {filterType === "region" && (
          <Checkbox.Group
            value={tempFilters.region}
            onChange={(values) => handleCheckboxChange("region", values)}
          >
            <p className={classes.dropdownHeaderText}>რეგიონის მიხედვით</p>
            <div className={classes.checkboxContainer}>
              {regionOptions.map((region) => (
                <Checkbox
                  color="#45A849"
                  key={region.value}
                  value={region.value}
                  label={region.label}
                />
              ))}
            </div>
          </Checkbox.Group>
        )}
        {filterType === "price" && (
          <div className={classes.priceContainer}>
            <p className={classes.dropdownHeaderText}>ფასის მიხედვით</p>
            <span>
              <NumberInput
                hideControls
                placeholder="დან"
                value={tempFilters.price.min}
                onChange={(value) => handlePriceChange("min", value)}
              />
              <NumberInput
                hideControls
                placeholder="მდე"
                value={tempFilters.price.max}
                onChange={(value) => handlePriceChange("max", value)}
              />
            </span>
            {priceError && <p className={classes.errorText}>{priceError}</p>}
            <span>
              <section className={classes.priceBoxContainer}>
                <p>მინ. ფასი</p>
                {[50, 100, 150, 200, 250, 300].map((price) => (
                  <p
                    key={`max-${price}`}
                    onClick={() => handlePriceBoxClick("min", price)}
                  >
                    {price}
                  </p>
                ))}
              </section>
              <section className={classes.priceBoxContainer}>
                <p>მაქს. ფასი</p>
                {[50, 100, 150, 200, 250, 300].map((price) => (
                  <p
                    key={`min-${price}`}
                    onClick={() => handlePriceBoxClick("max", price)}
                  >
                    {price}
                  </p>
                ))}
              </section>
            </span>
          </div>
        )}
        {filterType === "area" && (
          <div className={classes.priceContainer}>
            <p className={classes.dropdownHeaderText}>ფართობის მიხედვით</p>
            <span>
              <NumberInput
                hideControls
                placeholder="დან"
                value={tempFilters.area.min}
                onChange={(value) => handleAreaChange("min", value)}
              />
              <NumberInput
                hideControls
                placeholder="მდე"
                value={tempFilters.area.max}
                onChange={(value) => handleAreaChange("max", value)}
              />
            </span>
            {areaError && <p className={classes.errorText}>{areaError}</p>}
            <span>
              <section className={classes.priceBoxContainer}>
                <p>მინ. ფართობი</p>
                {[50, 100, 150, 200, 250, 300].map((area) => (
                  <p
                    key={`max-area-${area}`}
                    onClick={() => handleAreaChange("min", area)}
                  >
                    {area}
                  </p>
                ))}
              </section>
              <section className={classes.priceBoxContainer}>
                <p>მაქს. ფართობი</p>
                {[50, 100, 150, 200, 250, 300].map((area) => (
                  <p
                    key={`min-area-${area}`}
                    onClick={() => handleAreaChange("max", area)}
                  >
                    {area}
                  </p>
                ))}
              </section>
            </span>
          </div>
        )}
        {filterType === "bedrooms" && (
          <div className={classes.bedroomsContainer}>
            <p className={classes.dropdownHeaderText}>საძინებლების რაოდენობა</p>
            <NumberInput
              hideControls
              placeholder="რაოდენობა"
              value={tempFilters.bedrooms}
              onChange={(value) => handleBedroomsChange(value)}
            />
          </div>
        )}
        <div className={classes.submitButtonWrapper}>
          <BaseButton
            label="არჩევა"
            showIcon={false}
            backgroundColor="#F93B1D"
            textColor="#ffff"
            onClick={handleApplyFilters}
          />
        </div>
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
            {activeFilter === "region" && renderDropdown("region")}
          </div>
          <div
            className={`${classes.filterBox} ${
              activeFilter === "price" ? classes.active : ""
            }`}
            onClick={() => handleFilterClick("price")}
          >
            <p>საფასო კატეგორია</p>
            <ChevronIcon />
            {activeFilter === "price" && renderDropdown("price")}
          </div>
          <div
            className={`${classes.filterBox} ${
              activeFilter === "area" ? classes.active : ""
            }`}
            onClick={() => handleFilterClick("area")}
          >
            <p>ფართობი</p>
            <ChevronIcon />
            {activeFilter === "area" && renderDropdown("area")}
          </div>
          <div
            className={`${classes.filterBox} ${
              activeFilter === "bedrooms" ? classes.active : ""
            }`}
            onClick={() => handleFilterClick("bedrooms")}
          >
            <p>საძინებლების რაოდენობა</p>
            <ChevronIcon />
            {activeFilter === "bedrooms" && renderDropdown("bedrooms")}
          </div>
        </section>

        <section className={classes.buttonsWrapper}>
          <BaseButton
            onClick={handleOnAddNewListing}
            label="ლისტინგის დამატება"
            textColor="#FFFFFF"
            backgroundColor="#F93B1D"
          />
          <BaseButton
            onClick={onClick}
            label="აგენტის დამატება"
            textColor="#F93B1D"
            backgroundColor="#FFFFFF"
          />
        </section>
      </div>

      <section className={classes.chipContainer}>
        {selectedFilters.region.map((region) => (
          <div key={region} className={classes.chip}>
            <p>{regions.find((r) => r.id === +region)?.name}</p>
            <CrossIcon onClick={() => handleChipRemove("region", region)} />
          </div>
        ))}

        {selectedFilters.price.min && selectedFilters.price.max && (
          <div className={classes.chip}>
            <p>
              {selectedFilters.price.min} - {selectedFilters.price.max} ლარი
            </p>
            <CrossIcon onClick={() => handleChipRemove("price")} />
          </div>
        )}

        {selectedFilters.area.min && selectedFilters.area.max && (
          <div className={classes.chip}>
            <p>
              {selectedFilters.area.min} - {selectedFilters.area.max} მ²
            </p>
            <CrossIcon onClick={() => handleChipRemove("area")} />
          </div>
        )}

        {selectedFilters.bedrooms && (
          <div className={classes.chip}>
            <p>{selectedFilters.bedrooms}</p>
            <CrossIcon onClick={() => handleChipRemove("bedrooms")} />
          </div>
        )}
        {hasActiveFilters() && (
          <p onClick={handleClearAllFilters} className={classes.clearAllButton}>
            გასუფთავება
          </p>
        )}
      </section>
    </div>
  );
};

HeaderFilters.propTypes = {
  onClick: PropTypes.func.isRequired,
  regions: PropTypes.array.isRequired,
  onFilterChange: PropTypes.func.isRequired,
};

export default HeaderFilters;
