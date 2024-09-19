export const getFileFromLocalStorage = (storageKey = "listingForm") => {
  const storedData = localStorage.getItem(storageKey);

  if (!storedData) {
    console.error("No data found in localStorage");
    return null;
  }

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

      return new File([arrayBuffer], fileName, { type: mimeType });
    } else {
      console.error("Invalid base64 format");
      return null;
    }
  } else {
    console.error("Image data is not a base64 string");
    return null;
  }
};
