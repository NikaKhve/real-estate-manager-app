import { useParams } from "react-router-dom";

import classes from "./ListingItem.module.scss";

const ListingItem = () => {
  let { id } = useParams();
  console.log(id, "LOCATION");

  return <div className={classes.container}>ListingItem</div>;
};

export default ListingItem;
