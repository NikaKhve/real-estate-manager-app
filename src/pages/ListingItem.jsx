import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Loader, Button } from "@mantine/core";
import { Carousel } from "@mantine/carousel";

import { formatISODate } from "@/utils/dateFormatter";
import PinIcon from "@/components/icons/PinIcon";
import SizeIcon from "@/components/icons/SizeIcon";
import PostalIcon from "@/components/icons/PostalIcon";
import BedIcon from "@/components/icons/BedIcon";
import useRealEstate from "@/hooks/useRealEstate";
import ArrowIcon from "@/components/icons/ArrowIcon";
import InfoCard from "@/components/ui/InfoCard";
import ListingCard from "@/components/ListingCard";
import classes from "./ListingItem.module.scss";

const ListingItem = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { realEstate, loading, error } = useRealEstate(id);

  const handleOnGoBack = () => {
    navigate("/listing");
  };

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
          <ArrowIcon onClick={() => handleOnGoBack()} />
          <section className={classes.description}>
            <div>
              <img
                className={classes.image}
                src={realEstate.image}
                alt="estate-photo"
                height="670px"
                width="100%"
              />
              <p className={classes.createDate}>
                {formatISODate(realEstate.created_at)}
              </p>
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
              <div>
                <Button
                  classNames={{
                    root: classes.deleteButton,
                    label: classes.deleteButtonText,
                  }}
                  variant="default"
                >
                  ლისტინგის წაშლა
                </Button>
              </div>
            </div>
          </section>
          <section className={classes.similarLocations}>
            <p>ბინები მსგავს ლოკაციაზე</p>
          </section>
          <section className={classes.carouselWrapper}>
            <Carousel
              withIndicators
              height={470}
              slideSize="25%"
              slideGap="md"
              loop
              align="start"
              slidesToScroll={3}
            >
              <Carousel.Slide>
                <ListingCard />
              </Carousel.Slide>
              <Carousel.Slide>
                <ListingCard />
              </Carousel.Slide>
              <Carousel.Slide>
                <ListingCard />
              </Carousel.Slide>
              <Carousel.Slide>
                <ListingCard />
              </Carousel.Slide>
              <Carousel.Slide>
                <ListingCard />
              </Carousel.Slide>
              <Carousel.Slide>
                <ListingCard />
              </Carousel.Slide>
            </Carousel>
          </section>
        </div>
      )}
    </>
  );
};

export default ListingItem;
