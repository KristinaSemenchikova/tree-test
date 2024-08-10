import React, { FC } from "react";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/DeleteOutlineRounded";
import AddIcon from "@mui/icons-material/AddCircleOutlineRounded";
import EditIcon from "@mui/icons-material/EditOutlined";

type NodeProps = {
  name: string;
  isRoot?: boolean;
  showButtons?: boolean;
  onAdd: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
};

const Node: FC<NodeProps> = ({
  name,
  isRoot,
  showButtons,
  onAdd,
  onEdit,
  onDelete,
}) => {
  return (
    <Stack direction="row" spacing={1} alignItems="center" height={30}>
      <span>{name}</span>
      {showButtons && (
        <>
          <IconButton aria-label="add" onClick={onAdd} color="primary">
            <AddIcon />
          </IconButton>
          {!isRoot && (
            <>
              <IconButton aria-label="edit" onClick={onEdit}>
                <EditIcon color="info" />
              </IconButton>
              <IconButton aria-label="delete" onClick={onDelete}>
                <DeleteIcon color="error" />
              </IconButton>
            </>
          )}
        </>
      )}
    </Stack>
  );
};

export default Node;
