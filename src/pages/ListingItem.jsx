import { useParams, useNavigate } from "react-router-dom";
import { Loader, Button, Modal } from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import { useDisclosure } from "@mantine/hooks";

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

const ListingItem = () => {
  const [opened, { open, close }] = useDisclosure(false);

  const { id } = useParams();
  const navigate = useNavigate();

  const { realEstate, loading, error } = useRealEstate(id);

  const handleOnConfirmDelete = async () => {
    await deleteListing(id);
    navigate("/listing");
  };

  const handleOnGoBack = () => {
    navigate("/listing");
  };

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
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
              onClick={close}
              showIcon={false}
              label="გაუქმება"
              backgroundColor="#ffff"
              textColor="#F93B1D"
            />
            <BaseButton
              onClick={() => handleOnConfirmDelete()}
              showIcon={false}
              label="დადასტურება"
              backgroundColor="#F93B1D"
              textColor="#ffff"
            />
          </div>
        </div>
      </Modal>
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
