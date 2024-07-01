import JSZip from "jszip";
import { saveAs } from "file-saver";
import { TreeNode } from "@/data/types/type";

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
};
