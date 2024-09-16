import BaseButton from "./ui/BaseButton";
import classes from "./HeaderFilters.module.scss";

const HeaderFilters = () => {
  return (
    <div className={classes.container}>
      <section className={classes.filtersWrapper}>11</section>
      <section className={classes.buttonsWrapper}>
        <BaseButton
          label="ლისტინგის დამატება"
          textColor="#FFFFFF"
          backgroundColor="#F93B1D"
        />
        <BaseButton
          label="აგენტის დამატება"
          textColor="#F93B1D"
          backgroundColor="#FFFFFF"
        />
      </section>
      <section>BOXES</section>
    </div>
  );
};

export default HeaderFilters;
