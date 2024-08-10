export type TreeNode = {
  id: number;
  name: string;
  children: TreeNode[];
};

export type ResponseError = {
  id: number;
  data: { message: string };
};
