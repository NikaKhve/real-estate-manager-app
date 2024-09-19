import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Loader, Button, Modal } from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import { useDisclosure } from "@mantine/hooks";

import useRealEstates from "@/hooks/useRealEstates";
import { formatISODate } from "@/utils/dateFormatter";
import { deleteListing } from "@/services/realEstatesService";
import PinIcon from "@/components/icons/PinIcon";
import BaseButton from "@/components/ui/BaseButton";
import SizeIcon from "@/components/icons/SizeIcon";
import PostalIcon from "@/components/icons/PostalIcon";
import BedIcon from "@/components/icons/BedIcon";
import useRealEstate from "@/hooks/useRealEstate";
import ArrowIcon from "@/components/icons/ArrowIcon";
import InfoCard from "@/components/ui/InfoCard";
import ListingCard from "@/components/ListingCard";
import classes from "./ListingItem.module.scss";

const DeleteModal = ({ opened, onClose, onConfirm }) => (
  <Modal
    opened={opened}
    onClose={onClose}
    radius="lg"
    size="lg"
    centered
    overlayProps={{
      backgroundOpacity: 0.55,
      blur: 3,
    }}
  >
    <div className={classes.modalInnerContainer}>
      <p>გსურთ წაშალოთ ლისტინგი?</p>
      <div className={classes.buttonsWrapper}>
        <BaseButton
          onClick={onClose}
          showIcon={false}
          label="გაუქმება"
          backgroundColor="#ffff"
          textColor="#F93B1D"
        />
        <BaseButton
          onClick={onConfirm}
          showIcon={false}
          label="დადასტურება"
          backgroundColor="#F93B1D"
          textColor="#ffff"
        />
      </div>
    </div>
  </Modal>
);

const ListingItem = () => {
  const [similarRegionRealEstates, setSimilarRegionRealEstates] = useState([]);
  const [opened, { open, close }] = useDisclosure(false);

  const { id } = useParams();
  const navigate = useNavigate();

  const { realEstate, loading, error } = useRealEstate(id);
  const { realEstates, loading: realEstatesLoading } = useRealEstates();

  const handleOnConfirmDelete = async () => {
    await deleteListing(id);
    navigate("/listing");
  };

  useEffect(() => {
    if (realEstates.length > 0 && realEstate) {
      const filteredListings = realEstates.filter(
        (item) =>
          item.city?.region_id === realEstate?.city?.region_id &&
          item.id !== realEstate.id
      );
      setSimilarRegionRealEstates(filteredListings);
    }
  }, [realEstates, realEstate]);

  if (loading) {
    return (
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
    );
  }

  if (error || !realEstate) {
    return <p>შეცდომა ჩატვირთვისას</p>;
  }

  return (
    <div className={classes.container}>
      <ArrowIcon onClick={() => navigate("/listing")} />

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
          <p className={classes.priceText}>{realEstate.price} ₾</p>
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
          <p className={classes.descriptionText}>{realEstate.description}</p>
          <InfoCard
            image={realEstate.agent.avatar}
            name={realEstate.agent.name}
            surname={realEstate.agent.surname}
            email={realEstate.agent.email}
            phone={realEstate.agent.phone}
          />
          <Button
            onClick={open}
            classNames={{
              root: classes.deleteButton,
              label: classes.deleteButtonText,
            }}
            variant="default"
          >
            ლისტინგის წაშლა
          </Button>
        </div>
      </section>

      <p className={classes.similarLocationsText}>ბინები მსგავს ლოკაციაზე</p>
      <section className={classes.similarLocations}>
        {realEstatesLoading ? (
          <Loader />
        ) : similarRegionRealEstates.length > 0 ? (
          <Carousel
            withIndicators
            height={470}
            slideSize="25%"
            slideGap="md"
            loop
            align="start"
            slidesToScroll={3}
          >
            {similarRegionRealEstates.map((item) => (
              <Carousel.Slide key={item.id}>
                <ListingCard
                  price={item.price}
                  address={item.address}
                  area={item.area}
                  city={item.city.name}
                  bedrooms={item.bedrooms}
                  zipCode={item.zip_code}
                  image={item.image}
                  isRental={item.is_rental}
                  onClick={() => {
                    navigate(`/listing/${item.id}`);
                    window.scrollTo(0, 0);
                  }}
                />
              </Carousel.Slide>
            ))}
          </Carousel>
        ) : (
          <p>მსგავსი ლოკაციის ბინები არ მოიძებნა</p>
        )}
      </section>
      <DeleteModal
        opened={opened}
        onClose={close}
        onConfirm={handleOnConfirmDelete}
      />
    </div>
  );
};

export default ListingItem;
