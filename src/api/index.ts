import { BASE_URL, USER_TREE_NAME } from "./constants";
import { ResponseError } from "./types";

const OPTIONS = { method: "POST" };

const handleError = async (res: Response) => {
  if (!res.ok) {
    const text = await res.text();
    const error = JSON.parse(text) as ResponseError;
    throw new Error(error?.data?.message);
  }
};

const api = {
  endpoints: {
    getTree: () =>
      fetch(`${BASE_URL}/api.user.tree.get?treeName=${USER_TREE_NAME}`, OPTIONS)
        .then((res) => {
          if (res.ok) {
            return res.json();
          } else {
            return handleError(res);
          }
        })
        .catch((e) => {
          console.log("[ERROR]: " + e);
          throw e;
        }),
    createNode: (parentNodeId: number, nodeName: string) =>
      fetch(
        `${BASE_URL}/api.user.tree.node.create?treeName=${USER_TREE_NAME}&parentNodeId=${parentNodeId}&nodeName=${nodeName}`,
        OPTIONS
      )
        .then((res) => {
          if (!res.ok) {
            return handleError(res);
          }
        })
        .catch((e) => {
          console.log("[ERROR]: " + e);
          throw e;
        }),
    deleteNode: (nodeId: number) =>
      fetch(
        `${BASE_URL}/api.user.tree.node.delete?treeName=${USER_TREE_NAME}&nodeId=${nodeId}`,
        OPTIONS
      )
        .then((res) => {
          if (!res.ok) {
            return handleError(res);
          }
        })
        .catch((e) => {
          console.log("[ERROR]: " + e);
          throw e;
        }),
    editNode: (nodeId: number, newNodeName: string) =>
      fetch(
        `${BASE_URL}/api.user.tree.node.rename?treeName=${USER_TREE_NAME}&nodeId=${nodeId}&newNodeName=${newNodeName}`,
        OPTIONS
      )
        .then((res) => {
          if (!res.ok) {
            return handleError(res);
          }
        })
        .catch((e) => {
          console.log("[ERROR]: " + e);
          throw e;
        }),
  },
};

export default api;
