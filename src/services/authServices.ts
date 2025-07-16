import axiosConfig from "../../axiosConfig";


export const login = async (email: string, password: string) => {
  const response = await axiosConfig.post("/auth/login", {
    email,
    password,
  });
  return response.data; // debe devolver al menos accessToken
};
