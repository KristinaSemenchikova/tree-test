import React, { useState, useEffect, FC } from "react";
import api from "../../api";
import type { TreeNode } from "../../api/types";
import { SimpleTreeView } from "@mui/x-tree-view/SimpleTreeView";
import { TreeItem } from "@mui/x-tree-view/TreeItem";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Node from "./components/Node";
import Dialog from "../Dialog";
import Confirmation from "../Confirmation";
import "./Tree.css";

type Action = "add" | "edit" | "delete";

const Tree: FC = () => {
  const [treeData, setTreeData] = useState<TreeNode | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [currentNode, setCurrentNode] = useState<TreeNode | null>(null);
  const [action, setAction] = useState<Action | null>(null);

  const fetchTreeData = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.endpoints.getTree();
      setTreeData(data);
    } catch (err) {
      setError("Failed to load tree data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTreeData();
  }, []);

  const onAdd = (node: TreeNode) => {
    setAction("add");
    setCurrentNode(node);
  };

  const onEdit = (node: TreeNode) => {
    setAction("edit");
    setCurrentNode(node);
  };

  const onDelete = (node: TreeNode) => {
    setAction("delete");
    setCurrentNode(node);
  };

  const onClose = () => {
    setAction(null);
    setCurrentNode(null);
  };

  const handleCreateNode = async (parentNodeId: number, nodeName: string) => {
    setLoading(true);
    setError(null);
    try {
      await api.endpoints.createNode(parentNodeId, nodeName);
      await fetchTreeData();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
      setAction(null);
    }
  };

  const handleRenameNode = async (nodeId: number, newNodeName: string) => {
    setLoading(true);
    setError(null);
    try {
      await api.endpoints.editNode(nodeId, newNodeName);
      await fetchTreeData();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
      setAction(null);
    }
  };

  const handleDeleteNode = async (nodeId: number) => {
    setLoading(true);
    setError(null);
    try {
      await api.endpoints.deleteNode(nodeId);
      await fetchTreeData();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
      setAction(null);
    }
  };

  const renderTreeNodes = (node: TreeNode, isRoot: boolean) => {
    return (
      <TreeItem
        itemId={String(node.id)}
        label={
          <Node
            showButtons={currentNode?.id === node.id}
            name={node.name}
            isRoot={isRoot}
            onAdd={() => onAdd(node)}
            onEdit={() => onEdit(node)}
            onDelete={() => onDelete(node)}
          />
        }
        key={node.id}
        onClick={() => setCurrentNode(node)}
      >
        {node.children?.length > 0 && (
          <>{node.children.map((node) => renderTreeNodes(node, false))}</>
        )}
      </TreeItem>
    );
  };

  return (
    <div className="tree">
      {loading && !treeData && <div className="loading">Loading...</div>}
      {treeData && (
        <SimpleTreeView>{renderTreeNodes(treeData, true)}</SimpleTreeView>
      )}
      {action === "add" && currentNode && (
        <Dialog
          title="Add node"
          buttonTitle="Add"
          onClose={onClose}
          onSubmit={(name) => {
            handleCreateNode(currentNode.id, name);
          }}
        />
      )}
      {action === "edit" && currentNode && (
        <Dialog
          defaultName={currentNode?.name}
          title="Rename node"
          buttonTitle="Rename"
          onClose={onClose}
          onSubmit={(name) => {
            handleRenameNode(currentNode.id, name);
          }}
        />
      )}
      {action === "delete" && currentNode && (
        <Confirmation
          name={currentNode.name}
          onClose={onClose}
          onSubmit={() => {
            handleDeleteNode(currentNode.id);
          }}
        />
      )}
      {error && (
        <Snackbar
          open={true}
          autoHideDuration={3000}
          onClose={() => setError(null)}
        >
          <Alert severity="error">{error}</Alert>
        </Snackbar>
      )}
    </div>
  );
};

export default Tree;
