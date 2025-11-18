import api from "./axiosConfig";

export const getComments = () => api.get("/comments");
export const createComment = (data) => api.post("/comments", data);
export const updateComment = (id, data) => api.put(`/comments/${id}`, data);
export const deleteComment = (id) => api.delete(`/comments/${id}`);
