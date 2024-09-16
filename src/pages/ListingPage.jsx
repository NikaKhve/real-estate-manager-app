import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Loader } from "@mantine/core";

import useRealEstates from "@/hooks/useRealEstates";
import HeaderFilters from "@/components/HeaderFilters";
import ListingCard from "@/components/ListingCard";
import classes from "./ListingPage.module.scss";

const ListingPage = () => {
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
      <HeaderFilters />
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
