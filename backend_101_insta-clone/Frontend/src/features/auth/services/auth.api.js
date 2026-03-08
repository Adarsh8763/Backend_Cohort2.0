import axios from "axios";

const api = axios.create({
  baseURL: "https://backend-cohort2-0-1-e72l.onrender.com/api/auth",
  withCredentials: true,
});

export async function login(username, password) {
  const response = await api.post("/login", {
    username,
    password,
  });
  return response.data;
}

export async function register(username, email, password) {
  const response = await api.post("/register", {
    username,
    email,
    password,
  });
  return response.data;
}

export async function getMe() {
  const response = api.get("/get-me");

  return response;
}

