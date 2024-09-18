import { useEffect, useRef, useState } from "react";
import {
  Radio,
  Group,
  TextInput,
  NumberInput,
  NativeSelect,
  Textarea,
  Button,
} from "@mantine/core";
import { zodResolver } from "mantine-form-zod-resolver";
import { useForm } from "@mantine/form";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { useAddNewListingSchema } from "@/schemas/useAddNewListingSchema";
import PlusIcon from "@/components/icons/PlusIcon";
import useGetAllRegions from "@/hooks/useGetAllRegions";
import useGetAllCities from "@/hooks/useGetAllCities";
import classes from "./AddNewListing.module.scss";

const AddNewListing = () => {
  const openRef = useRef();
  const [file, setFile] = useState(null);

  const { regions } = useGetAllRegions();
  const { cities } = useGetAllCities();

  const regionOptions = regions?.map((region) => ({
    value: region.id,
    label: region.name,
  }));

  const citiesOptions = cities?.map((city) => ({
    value: city.id,
    label: city.name,
  }));

  const form = useForm({
    validate: zodResolver(useAddNewListingSchema),
    initialValues: {
      is_rental: "0",
      address: "",
      zip_code: null,
      region_id: "1",
      city_id: "1",
      price: null,
      area: null,
      bedrooms: null,
      description: "",
      image: null, // Set initial value to null
    },
  });

  const handleSubmit = (values) => {
    // form.validate();
    console.log("Form Submitted", values);
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
            <NativeSelect
              label="რეგიონი*"
              data={regionOptions}
              {...form.getInputProps("region_id")}
            />
            <NativeSelect
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
              const file = files[0];
              setFile(file); // Store file in state
              form.setFieldValue("image", file); // Set file in form state
            }}
            accept={IMAGE_MIME_TYPE}
            className={classes.root}
          >
            <PlusIcon />
          </Dropzone>
        </div>
        <Button type="submit">submit</Button>
      </form>
    </div>
  );
};

export default AddNewListing;
