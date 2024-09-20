import { FileEarmarkPdf } from "react-bootstrap-icons";
import { useTranslation } from "next-i18next";
const useToolsData = () => {
  const { t } = useTranslation();

  const toolsData = {
    MergePDFTool: {
      key: "MergePDF",
      title: t("common:tool_name_merge_pdf"),
      description: t("common:tool_desc_merge_pdf"),
      icon: <FileEarmarkPdf />,
      acceptedInputMimeType: "application/pdf",
      acceptedInputFileMaxSize: 26214400, //25MB = 25600 KB (in binary) = 26214400 B (in binary),
      newFileNameSuffix: "MergedPDF.pdf",
    },
  };

  return toolsData;
};

export default useToolsData;
