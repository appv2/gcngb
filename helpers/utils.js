import { toast } from "react-toastify";
import {
  PDFDocumentFromFile,
  rotatePDF,
  mergePDF,
  extractPageFromPDFAsPDF,
} from "./pdf-utils.js";

//Used for documnets IDs
let uuid = 1;

// Define an array of RTL language codes
export const rtlLanguages = ["ar", "fa", "ur", "ps", "ku"];

export function range(start, end) {
  return Array(end - start + 1)
    .fill()
    .map((_, idx) => start + idx);
}

//Function to check file type
export function checkFileType(fileType, acceptedInputMimeType) {
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types
  return acceptedInputMimeType.includes(fileType);
}

//Function to check file size
export function checkFileSize(fileSize, acceptedInputFileMaxSize) {
  return fileSize < acceptedInputFileMaxSize;
}

//Function to check for applying file validation rules
export function ApplyFileValidationRules(
  fileName,
  fileSize,
  fileType,
  t,
  acceptedInputMimeType,
  acceptedInputFileMaxSize
) {
  if (checkFileType(fileType, acceptedInputMimeType) === false) {
    notify("warning", t("common:file_extension_error"));
    return false;
  }

  if (checkFileSize(fileSize, acceptedInputFileMaxSize) === false) {
    notify(
      "warning",
      "The file : " +
        fileName +
        " is too large. Please try to upload a file smaller than " +
        formatBytes(acceptedInputFileMaxSize) +
        " size."
    );
    return false;
  }

  return true;
}

// get files from input in case of browsing files or drag & drop
export const getFilesFromInput = (event) => {
  if (typeof event.dataTransfer === "undefined") {
    if (!event.target.files) return;
    //Browsed and selected files
    return event.target.files;
  } else {
    if (!event.dataTransfer.files) return;
    //Dragged and droped files
    return event.dataTransfer.files;
  }
};

//this function will calculate a new rotation to the right based on the initial rotation
export const rotatePageLeft = (prevRotation) => {
  return prevRotation - 90 < 0 ? 270 : prevRotation - 90;
};

//this function will calculate a new rotation to the left based on the initial rotation
export const rotatePageRight = (prevRotation) => {
  return prevRotation + 90 > 270 ? 0 : prevRotation + 90;
};

export const handlePreventDefault = (event) => {
  event.preventDefault();
};

//Fucntion to show alert notifications, using react-toastify library
export const notify = (expr, message) => {
  switch (expr) {
    case "success":
      return toast.success(message);
    case "warning":
      return toast.warning(message);
    case "error":
      return toast.error(message);
    default:
      return toast(message);
  }
};

//Function to handle Bytes formating to string
export const formatBytes = (bytes, decimals = 2) => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
};

//Fucntion to extract blob from base64 data
export const getBlob = async (b64Data) => {
  const result = await fetch(b64Data);
  const blob = await result.blob();
  return blob;
};

export const updatePagesOrder = (newPages) => {
  for (let index = 0; index < newPages.length; index++) {
    const page = newPages[index];
    page.order = index + 1;
  }
  return newPages;
};

export const handleMerge = async (pages, fileName) => {
  const filesDocArray = [];

  for (const page of pages) {
    const { content } = await PDFDocumentFromFile(page.outputBlob);

    if (content) {
      const rotationAngleBefore = content.getPage(0).getRotation().angle;
      if (rotationAngleBefore != page.degree) {
        const rotatedPDF = await rotatePDF(content, page.degree);
        filesDocArray.push(rotatedPDF);
      } else {
        filesDocArray.push(content);
      }
    } else {
      notify("error", "An unknown error occurred. Please try again later.");
    }
  }

  if (filesDocArray.length !== 0) {
    const mergedPdf = await mergePDF(filesDocArray);
    const mergedPdfFile = await mergedPdf.save();
    const mergedPdfBlob = new Blob([mergedPdfFile], {
      type: "application/pdf",
    });
    download(mergedPdfBlob, fileName);
  }
};

//Function to download pdf file(s)
export const download = (file, fileName) => {
  const link = document.createElement("a");
  link.download = fileName;
  link.href = URL.createObjectURL(file);
  link.click();
};

//Function to handle files selection from local storage
export const handleFileSelection = (
  event,
  setLoadedFilesCount,
  addPage,
  t,
  mountedRef,
  tool
) => {
  //To prevent browser from openening the file in a new tab
  event.preventDefault();

  //get files from input
  let files = getFilesFromInput(event);
  //Update loaded files counter
  if (mountedRef.current) {
    setLoadedFilesCount(files.length);
  }

  /**
   * Loop through all the files to :
   * - Extract each file's data and wrapp each file's data in an object and store it in documents array.
   * **/
  for (const file of files) {
    if (file) {
      const fileName = file.name;
      const fileSize = file.size;
      const fileType = file.type;
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = async () => {
        if (
          ApplyFileValidationRules(
            fileName,
            fileSize,
            fileType,
            t,
            tool.acceptedInputMimeType,
            tool.acceptedInputFileMaxSize
          )
        ) {
          const blob = await getBlob(reader.result);
          let pdfDocument = null;
          //Function to extract PDF documents info, and add documents to state.documents array
          pdfDocument = await PDFDocumentFromFile(blob);

          if (pdfDocument.content) {
            for (const page of range(
              0,
              pdfDocument.content.getPages().length - 1
            )) {
              const extractPageAsPDF = await extractPageFromPDFAsPDF(
                pdfDocument.content,
                page
              );
              const base64DataUri = await extractPageAsPDF.saveAsBase64({
                dataUri: true,
              });
              const result = await fetch(base64DataUri);
              const blob = await result.blob();
              const degree = extractPageAsPDF.getPage(0).getRotation().angle;
              const width = extractPageAsPDF.getPage(0).getWidth();
              const height = extractPageAsPDF.getPage(0).getHeight();
              let id = uuid++;
              addPage({
                id,
                order: id,
                outputBlob: blob,
                degree,
                width,
                height,
                selected: false,
              });
              if (!mountedRef.current) {
                break;
              }
            }
          } else {
            if (pdfDocument.error === "password") {
              notify(
                "error",
                <>
                  Something went wrong! The file ({fileName}) is
                  Password-protected, Please unlock the file(s) and try again.
                </>
              );
            } else if (pdfDocument.error === "damaged") {
              notify(
                "error",
                <>
                  Something went wrong! The file ({fileName}) is Corrupted,
                  Please make a new copy of the file(s) and try again.
                </>
              );
            } else {
              notify(
                "error",
                "An unknown error occurred. Please try again later."
              );
            }
          }
        }
        //Update loaded files counter
        if (mountedRef.current) {
          setLoadedFilesCount((prev) => prev - 1);
        }
      };
    } else {
      notify("error", "File is not defined");
    }
  }
};
