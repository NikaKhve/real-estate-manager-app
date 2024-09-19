import { useEffect } from "react";
import { Loader, Modal, TextInput } from "@mantine/core";
import PropTypes from "prop-types";

import { getFileFromLocalStorage } from "@/utils/fileConverter";
import BaseButton from "@/components/ui/BaseButton";
import FileUploader from "@/components/ui/FileUploader";
import classes from "./AddNewAgentModal.module.scss";

const AddNewAgentModal = ({
  close,
  opened,
  form,
  handleSubmit,
  handleOnCloseModalClick,
  file,
  setFile,
}) => {
  useEffect(() => {
    const image = getFileFromLocalStorage("addNewAgentData", "avatar");
    if (image) {
      setFile(image);
      form.setFieldValue("avatar", image);
    }
  }, []);

  return (
    <Modal
      padding="4rem"
      centered
      size="55%"
      opened={opened}
      withCloseButton={false}
      onClose={close}
      overlayProps={{
        backgroundOpacity: 0.55,
        blur: 3,
      }}
    >
      <div className={classes.modalContainer}>
        <p>აგენტის დამატება</p>
        <form
          onReset={form.onReset}
          className={classes.formWrapper}
          onSubmit={form.onSubmit(handleSubmit)}
        >
          <TextInput
            classNames={{ required: classes.required }}
            mt="sm"
            label="სახელი*"
            key={form.key("name")}
            {...form.getInputProps("name")}
          />
          <TextInput
            classNames={{ required: classes.required }}
            mt="sm"
            label="გვარი*"
            key={form.key("surname")}
            {...form.getInputProps("surname")}
          />
          <TextInput
            classNames={{ required: classes.required }}
            mt="sm"
            label="ელ-ფოსტა*"
            key={form.key("email")}
            {...form.getInputProps("email")}
          />
          <TextInput
            classNames={{ required: classes.required }}
            mt="sm"
            label="ტელეფონის ნომერი*"
            key={form.key("phone")}
            {...form.getInputProps("phone")}
          />
          <span className={classes.fileUploaderWrapper}>
            <FileUploader
              setFile={setFile}
              selectedFile={file}
              form={form}
              errorMessage={form.errors.avatar}
              fileKey="avatar"
            />
          </span>
          <section className={classes.buttonsWrapper}>
            <BaseButton
              onClick={() => handleOnCloseModalClick()}
              showIcon={false}
              label="გაუქმება"
              type="button"
              backgroundColor="#ffffff"
              textColor="#F93B1D"
            >
              adasd
            </BaseButton>
            <BaseButton
              textColor="#ffffff"
              backgroundColor="#F93B1D"
              showIcon={false}
              label="დაამატე აგენტი"
              type="submit"
            >
              adasd
            </BaseButton>
          </section>
        </form>
      </div>
    </Modal>
  );
};

AddNewAgentModal.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleOnCloseModalClick: PropTypes.func.isRequired,
  opened: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  form: PropTypes.object.isRequired,
  file: PropTypes.object,
  setFile: PropTypes.func.isRequired,
};

export default AddNewAgentModal;
