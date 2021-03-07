import http from "./http.service";

export const loadPosts = () => {
  return http().get("post");
};

export const loadPost = (id) => {
  return http().get(`post/${id}`);
};

export const delPost = (id) => {
  return http({ requiresAuth: true }).delete(`post/${id}`, {
    crossdomain: true,
  });
};

export const savePost = (url, payload) => {
  return http({ requiresAuth: true }).post(url, payload);
};
