import { useEffect } from "react";

import useRealEstates from "@/hooks/useRealEstates";
import HeaderFilters from "@/components/HeaderFilters";
import ListingCard from "@/components/ListingCard";
import classes from "./ListingPage.module.scss";

const ListingPage = () => {
  const { realEstates, loading, error } = useRealEstates();

  console.log("DADSASDA");

  useEffect(() => {
    console.log(realEstates, "ESTATES");
  }, [realEstates]);

  return (
    <div className={classes.container}>
      <HeaderFilters />
      <section className={classes.listingWrapper}>
        <ListingCard />
        <ListingCard />
        <ListingCard />
        <ListingCard />
      </section>
    </div>
  );
};

export default ListingPage;
