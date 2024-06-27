import React, { useState } from "react";
import { TreeNode } from "@/data/types/type";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFolder,
  faFolderOpen,
  faFile,
} from "@fortawesome/free-solid-svg-icons";

interface TreeViewProps {
  node: TreeNode;
  onNodeClick: (node: TreeNode) => void;
}

const TreeView: React.FC<TreeViewProps> = ({ node, onNodeClick }) => {
  const [expanded, setExpanded] = useState(false);

  const handleToggle = () => {
    setExpanded(!expanded);
  };

  const getIcon = () => {
    if (node.children && node.children.length > 0) {
      return expanded ? faFolderOpen : faFolder;
    }
    return faFile;
  };

  return (
    <div>
      <div
        onClick={() => {
          if (node.code) {
            onNodeClick(node);
          }
          handleToggle();
        }}
        style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
      >
        <FontAwesomeIcon icon={getIcon()} style={{ marginRight: 5 }} />
        {node.name}
      </div>
      {expanded && node.children && (
        <div style={{ marginLeft: 20 }}>
          {node.children.map((childNode) => (
            <div className="cursor-pointer" key={childNode.id}>
              <TreeView
                key={childNode.id}
                node={childNode}
                onNodeClick={onNodeClick}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TreeView;
