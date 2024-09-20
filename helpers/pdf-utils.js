const { PDFDocument, degrees } = require("pdf-lib");

export const PDFDocumentFromFile = async (file) => {
  try {
    const content = await PDFDocument.load(await file.arrayBuffer(), {
      ignoreEncryption: true,
    });
    if (content.isEncrypted === false) {
      return { content, error: null };
    } else {
      return { content: null, error: "password" };
    }
  } catch (error) {
    return { content: null, error: "damaged" };
  }
};

export const mergePDF = async (filesDocArray) => {
  if (filesDocArray.length < 2) {
    return filesDocArray[0] || null;
  }
  const mergedPdf = await PDFDocument.create();
  for (let i = 0; i < filesDocArray.length; i++) {
    const fileDoc = filesDocArray[i];
    const pages = await mergedPdf.copyPages(fileDoc, fileDoc.getPageIndices());
    pages.forEach((page) => mergedPdf.addPage(page));
  }

  return mergedPdf;
};

export const extractPageFromPDFAsPDF = async (srcDoc, page) => {
  const pdfDoc = await PDFDocument.create();
  const copiedPages = await pdfDoc.copyPages(srcDoc, [page]);
  const [firstPage] = copiedPages;
  pdfDoc.insertPage(0, firstPage);
  return pdfDoc;
};

export const rotatePDF = async (pdfDoc, degree) => {
  const pages = pdfDoc.getPages();
  pages.forEach((page) => {
    page.setRotation(degrees(degree));
  });
  return pdfDoc;
};
