import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { User } from "src/user/user.dto";
import { IPaginationParams } from "./interface";

export const getUserDetails = async (accessToken: string): Promise<string> => {
  try {
    const { username } = jwtDecode<User>(accessToken);
    return username;
  } catch {
    const googleAccessToken = accessToken.includes("Bearer")
      ? accessToken.slice(7)
      : accessToken;
    const { data } = await axios.get(
      `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${googleAccessToken}`,
    );
    return data?.email;
  }
};

export const getPaginationParams = (params: IPaginationParams) => {
  const { limit, pageNumber } = params;
  return {
    take: limit,
    skip: (pageNumber - 1) * limit,
  };
};
