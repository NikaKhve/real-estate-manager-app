import PinIcon from "./icons/PinIcon";
import classes from "./ListingCard.module.scss";

const ListingCard = () => {
  return (
    <div className={classes.container}>
      <section>
        <img
          className={classes.image}
          height="307"
          src="https://api.real-estate-manager.redberryinternship.ge/storage/images/BDPHDbAMQbARPzbBfRx8wWkVTWjQdZUy3S5WuZnX.jpg"
        />
      </section>
      <section className={classes.description}>
        <p>80 000 L</p>
        <p>
          <PinIcon /> თბილისი, ი.ჭავჭავაძის 53
        </p>
      </section>
    </div>
  );
};

export default ListingCard;
