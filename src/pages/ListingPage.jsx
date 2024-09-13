import { useEffect } from "react";

import useRealEstates from "@/hooks/useRealEstates";
import classes from "./ListingPage.module.scss";

const ListingPage = () => {
  const { realEstates, loading, error } = useRealEstates();

  useEffect(() => {
    console.log(realEstates, "ESTATES");
  }, [realEstates]);

  return <div className={classes.container}>LISTING</div>;
};

export default ListingPage;
