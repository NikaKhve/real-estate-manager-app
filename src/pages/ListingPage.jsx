import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Loader, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import useRealEstates from "@/hooks/useRealEstates";
import HeaderFilters from "@/components/HeaderFilters";
import ListingCard from "@/components/ListingCard";
import classes from "./ListingPage.module.scss";

const ListingPage = () => {
  const [opened, { open, close }] = useDisclosure(false);

  const navigate = useNavigate();

  const { realEstates, loading, error } = useRealEstates();

  const handleOnClick = (id) => {
    navigate(`${id}`);
  };

  useEffect(() => {
    console.log(realEstates, "ESTATES");
  }, [realEstates]);

  return (
    <div className={classes.container}>
      <Modal
        centered
        size="xl"
        opened={opened}
        onClose={close}
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
      >
        <div className={classes.modalContainer}>
          <p>adas</p>
        </div>
      </Modal>
      <HeaderFilters onClick={open} />
      <section className={classes.listingWrapper}>
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
          realEstates.map((item) => (
            <ListingCard
              onClick={() => handleOnClick(item.id)}
              key={item.id}
              price={item.price}
              city={item.city.name}
              address={item.address}
              bedrooms={item.bedrooms}
              zipCode={item.zip_code}
              area={item.area}
              image={item.image}
              isRental={item.is_rental}
            />
          ))
        )}
      </section>
    </div>
  );
};

export default ListingPage;
