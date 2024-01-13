import { authKey } from "@/constants/storageKey";
import { decodedToken } from "@/utils/jwt";
import { getFromLocalStroage, setToLocalStroage } from "@/utils/local-storage";

export const storeUserInfo = ({ accessToken }: { accessToken: string }) => {
  return setToLocalStroage(authKey, accessToken as string);
};

export const getUserInfo = () => {
  const authToken = getFromLocalStroage(authKey);

  if (authToken) {
    const decodedData = decodedToken(authToken);

    return decodedData;
  } else {
    return "";
  }
};

export const isLoggedIn = () => {
  const authToken = getFromLocalStroage(authKey);
  return !!authToken;
};
