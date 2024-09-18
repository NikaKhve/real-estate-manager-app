import { useEffect } from "react";
import { Radio, Group, TextInput, NumberInput } from "@mantine/core";
import { zodResolver } from "mantine-form-zod-resolver";
import { useForm } from "@mantine/form";

import { useAddNewListingSchema } from "@/schemas/useAddNewListingSchema";
import classes from "./AddNewListing.module.scss";

const AddNewListing = () => {
  const form = useForm({
    validate: zodResolver(useAddNewListingSchema),
    initialValues: {
      is_rental: "0",
      address: "",
      zip_code: null,
    },
  });

  const handleSubmit = (values) => {
    form.validate();
    console.log("Form Submitted", values);
  };

  // useEffect(() => {
  //   console.log(form.values, "FORM");
  // }, [form]);

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
          <p>მდებარეობა</p>
          <section>
            <TextInput
              classNames={{ required: classes.required }}
              mt="sm"
              label="მისამართი"
              key={form.key("address")}
              {...form.getInputProps("address")}
              withAsterisk
            />
            <NumberInput
              label="საფოსტო ინდექსი"
              mt="sm"
              key={form.key("zip_code")}
              {...form.getInputProps("zip_code")}
              withAsterisk
            />
            {/* <TextInput
              label="Email"
              placeholder="Email"
              {...form.getInputProps("email")}
            />
            <TextInput
              mt="sm"
              label="Email"
              placeholder="Email"
              key={form.key("email")}
              {...form.getInputProps("email")}
            />
            <TextInput
              mt="sm"
              label="Email"
              placeholder="Email"
              key={form.key("email")}
              {...form.getInputProps("email")}
            /> */}
          </section>
        </div>
        <div>3</div>
        <div>4</div>
        <div>5</div>
        <button>submit</button>
      </form>
    </div>
  );
};

export default AddNewListing;
