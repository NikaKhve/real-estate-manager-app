import { useRef, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { Image } from "@mantine/core";

import PlusIcon from "@/components/icons/PlusIcon";
import classes from "./FileUploader.module.scss";

const FileUploader = ({
  selectedFile,
  setFile,
  form,
  errorMessage,
  fileKey = "image",
}) => {
  const openRef = useRef();
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    if (selectedFile) {
      const url = URL.createObjectURL(selectedFile);
      setImageUrl(url);

      return () => URL.revokeObjectURL(url);
    }
  }, [selectedFile]);

  return (
    <div className={classes.container}>
      <p className={`${classes.uploadPhotoText} ${classes.fileInputText}`}>
        ატვირთეთ ფოტო *
      </p>
      <Dropzone
        mt="xs"
        openRef={openRef}
        onDrop={(files) => {
          const file = files[0];
          form.setFieldValue(fileKey, file);
          setFile(file);
        }}
        accept={IMAGE_MIME_TYPE}
        className={classes.root}
      >
        <PlusIcon />
      </Dropzone>
      {errorMessage && <p className={classes.errorMessage}>{errorMessage}</p>}
      <div className={classes.uploadedImageWrapper}>
        {imageUrl && (
          <Image
            src={imageUrl}
            alt="Preview"
            onLoad={() => URL.revokeObjectURL(imageUrl)}
          />
        )}
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
  fileKey: PropTypes.string,
};

export default FileUploader;
