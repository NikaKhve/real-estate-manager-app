import { useRef } from "react";
import PropTypes from "prop-types";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { Image } from "@mantine/core";

import PlusIcon from "@/components/icons/PlusIcon";
import classes from "./FileUploader.module.scss";

const FileUploader = ({ selectedFile, setFile, form, errorMessage }) => {
  const openRef = useRef();

  const preview = () => {
    if (!selectedFile) return null;

    const imageUrl = URL.createObjectURL(selectedFile);
    return (
      <Image
        key={imageUrl}
        src={imageUrl}
        alt="Preview"
        onLoad={() => URL.revokeObjectURL(imageUrl)}
      />
    );
  };

  return (
    <div className={classes.container}>
      <p className={`${classes.uploadPhotoText} ${classes.fileInputText}`}>
        ატვირთეთ ფოტო *
      </p>
      <Dropzone
        mt="xs"
        openRef={openRef}
        onDrop={(files) => {
          const selectedFile = files[0];
          form.setFieldValue("image", selectedFile);
          setFile(selectedFile);
        }}
        accept={IMAGE_MIME_TYPE}
        className={classes.root}
      >
        <PlusIcon />
      </Dropzone>
      {errorMessage && <p className={classes.errorMessage}>{errorMessage}</p>}
      <div className={classes.uploadedImageWrapper}>
        {selectedFile && preview()}
      </div>
    </div>
  );
};

FileUploader.propTypes = {
  selectedFile: PropTypes.instanceOf(File),
  setFile: PropTypes.func.isRequired,
  form: PropTypes.shape({
    setFieldValue: PropTypes.func.isRequired,
  }).isRequired,
  errorMessage: PropTypes.string,
};

export default FileUploader;
