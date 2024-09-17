import { useEffect, useState } from "react";
import { Radio, Group } from "@mantine/core";

import classes from "./AddNewListing.module.scss";

const AddNewListing = () => {
  const [formData, setFormData] = useState({
    is_rental: 0, // 0 for 'იყიდება', 1 for 'ქირავდება'
  });

  const handleOnRadioInputChange = (val) => {
    setFormData((prev) => ({
      ...prev,
      is_rental: val,
    }));
  };

  useEffect(() => {
    console.log(formData, "FORM");
  }, [formData]);

  return (
    <div className={classes.container}>
      <p className={classes.heading}>ლისტინგის დამატება</p>
      <section className={classes.formWrapper}>
        <div className={classes.radioInputsWrapper}>
          <Radio.Group
            name="transactionType"
            label="გარიგების ტიპი"
            size="xs"
            value={formData.is_rental.toString()}
            onChange={handleOnRadioInputChange}
            classNames={{ label: classes.radioLabel }}
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
        <div>2</div>
        <div>3</div>
        <div>4</div>
        <div>5</div>
      </section>
    </div>
  );
};

export default AddNewListing;
