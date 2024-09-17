import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Loader } from "@mantine/core";

import PinIcon from "@/components/icons/PinIcon";
import SizeIcon from "@/components/icons/SizeIcon";
import PostalIcon from "@/components/icons/PostalIcon";
import BedIcon from "@/components/icons/BedIcon";
import useRealEstate from "@/hooks/useRealEstate";
import ArrowIcon from "@/components/icons/ArrowIcon";
import InfoCard from "@/components/ui/InfoCard";
import classes from "./ListingItem.module.scss";

const ListingItem = () => {
  let { id } = useParams();

  const { realEstate, loading, error } = useRealEstate(id);

  console.log(realEstate, "REA");
  // useEffect(() => {
  //   console.log(realEstate);
  // }, [realEstate]);

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
            <div>
              <img
                className={classes.image}
                src={realEstate.image}
                alt="estate-photo"
                height="670px"
                width="100%"
              />
            </div>
            <div>
              <p className={classes.priceText}>{realEstate.price}</p>

              <span>
                <PinIcon /> {realEstate.city.name}, {realEstate.address}
              </span>
              <span>
                <SizeIcon /> {realEstate.area}
              </span>
              <span>
                <BedIcon /> {realEstate.bedrooms}
              </span>
              <span>
                <PostalIcon /> {realEstate.zip_code}
              </span>

              <p className={classes.descriptionText}>
                {realEstate.description}
              </p>

              <InfoCard
                image={realEstate.agent.avatar}
                name={realEstate.agent.name}
                surname={realEstate.agent.surname}
                email={realEstate.agent.email}
                phone={realEstate.agent.phone}
              />
            </div>
          </section>
          <section className={classes.similarLocations}>
            ბინები მსგავს ლოკაციაზე
          </section>
          <section className={classes.carouselWrapper}>3</section>
        </div>
      )}
    </>
  );
};

export default ListingItem;
