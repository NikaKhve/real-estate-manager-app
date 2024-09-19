import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { zodResolver } from "mantine-form-zod-resolver";
import { useForm } from "@mantine/form";

import { createNewAgent } from "@/services/realEstatesService";
import { useAddNewAgentSchema } from "@/schemas/useAddNewAgentSchema";
import useRealEstates from "@/hooks/useRealEstates";
import HeaderFilters from "@/components/HeaderFilters";
import ListingCard from "@/components/ListingCard";
import AddNewAgentModal from "@/components/modals/AddNewAgentModal";
import classes from "./ListingPage.module.scss";

const savedValues = JSON.parse(localStorage.getItem("addNewAgentData")) || {
  name: "",
  surname: "",
  email: "",
  phone: "",
  avatar: "",
};

const ListingPage = () => {
  const [file, setFile] = useState(null);
  const [opened, { open, close }] = useDisclosure(false);

  const navigate = useNavigate();

  const { realEstates, loading, error } = useRealEstates();

  const form = useForm({
    validate: zodResolver(useAddNewAgentSchema),
    initialValues: savedValues,
  });

  const handleOnSubmitAddNewAgent = async (values) => {
    await createNewAgent(values);
    resetForm();
    close();
  };

  const resetForm = () => {
    localStorage.removeItem("addNewAgentData");
    form.values.name = "";
    form.values.surname = "";
    form.values.email = "";
    form.values.phone = "";
    form.values.avatar = "";
    setFile(null);
  };

  const handleOnClick = (id) => {
    navigate(`${id}`);
  };

  useEffect(() => {
    const formData = { ...form.values };
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        formData.avatar = reader.result;
        localStorage.setItem("addNewAgentData", JSON.stringify(formData));
      };
      reader.readAsDataURL(file);
    } else {
      localStorage.setItem("addNewAgentData", JSON.stringify(formData));
    }
  }, [form.values, file]);

  return (
    <div className={classes.container}>
      <AddNewAgentModal
        file={file}
        setFile={setFile}
        handleOnCloseModalClick={close}
        opened={opened}
        close={close}
        form={form}
        handleSubmit={(value) => handleOnSubmitAddNewAgent(value)}
      />
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
