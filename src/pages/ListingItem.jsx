import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Loader } from "@mantine/core";

import useRealEstate from "@/hooks/useRealEstate";
import ArrowIcon from "@/components/icons/ArrowIcon";
import classes from "./ListingItem.module.scss";

const ListingItem = () => {
  let { id } = useParams();

  const { realEstate, loading, error } = useRealEstate(id);

  useEffect(() => {
    console.log(realEstate);
  }, [realEstate]);

  return (
    <>
      {loading ? (
        <Loader
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
          color="red"
          size="xl"
        />
      ) : (
        <div className={classes.container}>
          <ArrowIcon />
          <section className={classes.description}>
            <div>photo</div>
            <div>descr</div>
          </section>
          <section className={classes.similarLocations}>2</section>
          <section className={classes.carouselWrapper}>3</section>
        </div>
      )}
    </>
  );
};

export default ListingItem;
