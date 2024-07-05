import JSZip from "jszip";
import { saveAs } from "file-saver";
import { TreeNode } from "@/data/types/type";
import axios from "axios";

const addFilesToZip = (zip: JSZip, node: TreeNode, path: string): void => {
  const currentPath = path ? `${path}/${node.name}` : node.name;

  if (node.type === "folder" && node.children) {
    // If the node is a folder, create a folder
    const folder = zip.folder(currentPath);
    if (folder) {
      node.children.forEach(child => addFilesToZip(zip, child, currentPath));
    }
  } else if (node.type === "file" && node.code) {
    // If the node is a file, add it to the zip
    zip.file(`${currentPath}`, node.code);
  }
};

export const createZipFromJson = async (jsonData: TreeNode): Promise<void> => {
  const zip = new JSZip();
  addFilesToZip(zip, jsonData, "");
  const content = await zip.generateAsync({ type: "blob" });
  saveAs(content, `${jsonData.name}.zip`);

  // Prepare the FormData for the upload
  const formData = new FormData();
  formData.append("file", content, `${jsonData.name}.zip`);
  formData.append("upload_preset", `${process.env.NEXT_PUBLIC_PRESET_NAME}`);
  formData.append("cloud_name", `${process.env.NEXT_PUBLIC_CLOUD_NAME}`);
  formData.append("folder", "assets/documents");

  // Upload the ZIP file to Cloudinary
  try {
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUD_NAME}/auto/upload`, // Use 'auto' for auto-detection of file type
      formData
    );
    return response.data.url;
  } catch (error) {
    console.error("Upload failed:", error);
  }
};
