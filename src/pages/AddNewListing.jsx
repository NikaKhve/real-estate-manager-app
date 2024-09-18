import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Radio,
  Group,
  TextInput,
  NumberInput,
  Select,
  Textarea,
  Image,
} from "@mantine/core";
import { zodResolver } from "mantine-form-zod-resolver";
import { useForm } from "@mantine/form";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";

import { useAddNewListingSchema } from "@/schemas/useAddNewListingSchema";
import BaseButton from "@/components/ui/BaseButton";
import PlusIcon from "@/components/icons/PlusIcon";
import useGetAllAgents from "@/hooks/useGetAllAgents";
import useGetAllRegions from "@/hooks/useGetAllRegions";
import { createNewListing } from "@/services/realEstatesService";
import useGetAllCities from "@/hooks/useGetAllCities";
import classes from "./AddNewListing.module.scss";

const AddNewListing = () => {
  const navigate = useNavigate();
  const openRef = useRef();
  const [file, setFile] = useState(null);

  const preview = () => {
    if (!file) return null;

    const imageUrl = URL.createObjectURL(file);
    return (
      <Image
        key={imageUrl}
        src={imageUrl}
        alt="Preview"
        onLoad={() => URL.revokeObjectURL(imageUrl)}
      />
    );
  };

  const { regions } = useGetAllRegions();
  const { cities } = useGetAllCities();
  const { agents } = useGetAllAgents();

  const regionOptions = regions?.map((region) => ({
    value: String(region.id),
    label: region.name,
  }));

  const citiesOptions = cities?.map((city) => ({
    value: String(city.id),
    label: city.name,
  }));

  const agentsOptions = agents?.map((agent) => ({
    value: String(agent.id),
    label: agent.name + " " + agent.surname,
  }));

  const savedValues = JSON.parse(localStorage.getItem("listingForm")) || {
    is_rental: "0",
    address: "",
    zip_code: null,
    region_id: "",
    city_id: "",
    price: null,
    area: null,
    bedrooms: null,
    description: "",
    image: null,
    agent_id: "",
  };

  const form = useForm({
    validate: zodResolver(useAddNewListingSchema),
    initialValues: savedValues,
  });

  function getPhoto() {
    const storedData = localStorage.getItem("listingForm");

    if (storedData) {
      const parsedData = JSON.parse(storedData);

      if (typeof parsedData.image === "string") {
        const base64 = parsedData.image;
        const base64Parts = base64.split(",");

        if (base64Parts.length === 2) {
          const mimeType = base64Parts[0].match(/data:(.*?);base64/)[1];
          const fileContent = base64Parts[1];

          const fileExtension = mimeType.split("/")[1];

          const fileName = `file_name.${fileExtension}`;

          const binary = atob(fileContent);
          const arrayBuffer = new ArrayBuffer(binary.length);
          const uint8Array = new Uint8Array(arrayBuffer);

          for (let i = 0; i < binary.length; i++) {
            uint8Array[i] = binary.charCodeAt(i);
          }

          const file = new File([arrayBuffer], fileName, {
            type: mimeType,
          });

          form.values.image = file;
          setFile(file);
          return file;
        } else {
          console.error("Invalid base64 format");
        }
      } else {
        console.error("Image data is not a base64 string");
      }
    } else {
      console.error("No data found in localStorage");
    }
  }

  useEffect(() => {
    getPhoto();
  }, []);

  useEffect(() => {
    const formData = { ...form.values };
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        formData.image = reader.result;
        localStorage.setItem("listingForm", JSON.stringify(formData));
      };

      reader.readAsDataURL(file);
    } else {
      localStorage.setItem("listingForm", JSON.stringify(formData));
    }
  }, [form.values, file]);

  const handleSubmit = async (values) => {
    form.validate();
    await createNewListing(values);
    localStorage.removeItem("listingForm");
    navigate("/listing");
  };

  return (
    <div className={classes.container}>
      <p className={classes.heading}>ლისტინგის დამატება</p>
      <form
        className={classes.formWrapper}
        onSubmit={form.onSubmit(handleSubmit)}
      >
        <div className={classes.radioInputsWrapper}>
          <Radio.Group
            name="transactionType"
            label="გარიგების ტიპი"
            size="xs"
            classNames={{ label: classes.radioLabel }}
            {...form.getInputProps("is_rental")}
          >
            <Group mt="xs">
              <Radio
                value="0"
                label="იყიდება"
                size="xs"
                variant="outline"
                color="black"
                classNames={{ body: classes.radioInput }}
              />
              <Radio
                value="1"
                label="ქირავდება"
                size="xs"
                variant="outline"
                color="black"
              />
            </Group>
          </Radio.Group>
        </div>
        <div className={classes.locationInputsWrapper}>
          <p className={classes.inputGroupDescription}>მდებარეობა</p>
          <section className={classes.inputGroupWrapper}>
            <TextInput
              classNames={{ required: classes.required }}
              mt="sm"
              label="მისამართი*"
              key={form.key("address")}
              {...form.getInputProps("address")}
            />
            <NumberInput
              label="საფოსტო ინდექსი*"
              mt="sm"
              key={form.key("zip_code")}
              {...form.getInputProps("zip_code")}
            />
            <Select
              label="რეგიონი*"
              data={regionOptions}
              {...form.getInputProps("region_id")}
            />
            <Select
              label="ქალაქი*"
              data={citiesOptions}
              {...form.getInputProps("city_id")}
            />
          </section>
        </div>
        <div className={classes.detailsInputsWrapper}>
          <p className={classes.inputGroupDescription}>ბინის დეტალები</p>
          <section className={classes.inputGroupWrapper}>
            <NumberInput
              label="ფასი*"
              mt="sm"
              key={form.key("price")}
              {...form.getInputProps("price")}
            />
            <NumberInput
              label="ფართობი*"
              mt="sm"
              key={form.key("area")}
              {...form.getInputProps("area")}
            />
            <NumberInput
              label="საძინებლების რაოდენობა*"
              mt="sm"
              key={form.key("bedrooms")}
              {...form.getInputProps("bedrooms")}
            />
          </section>
          <Textarea
            classNames={{ input: classes.textareaInput }}
            mt="lg"
            label="აღწერა*"
            {...form.getInputProps("description")}
            key={form.key("description")}
          />
          <p className={`${classes.uploadPhotoText} ${classes.fileInputText}`}>
            ატვირთეთ ფოტო *
          </p>
          <Dropzone
            mt="xs"
            openRef={openRef}
            onDrop={(files) => {
              const selectedFile = files[0];
              setFile(selectedFile);
              form.setFieldValue("image", selectedFile);
            }}
            accept={IMAGE_MIME_TYPE}
            className={classes.root}
          >
            <PlusIcon />
          </Dropzone>
          {form.errors.image && (
            <p className={classes.errorMessage}>{form.errors.image}</p>
          )}
          <div className={classes.uploadedImageWrapper}>
            {file && preview()}
          </div>
        </div>
        <div>
          <p className={classes.inputGroupDescription}>აგენტი</p>
          <section className={classes.inputGroupWrapper}>
            <Select
              label="აირჩიე"
              mt="xs"
              data={agentsOptions}
              {...form.getInputProps("agent_id")}
              key={form.key("agent_id")}
            />
          </section>
        </div>
        <div className={classes.buttonsWrapper}>
          <BaseButton
            onClick={() => navigate("/listing")}
            type="button"
            backgroundColor="#fffff"
            label="გაუქმება"
            textColor="#F93B1D"
            showIcon={false}
          />
          <BaseButton
            type="submit"
            label="დაამატე ლისტინგი"
            backgroundColor="#F93B1D"
            showIcon={false}
            textColor="#FFFFFF"
          />
        </div>
      </form>
    </div>
  );
};

export default AddNewListing;
