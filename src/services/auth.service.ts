import { setToLocalStroage } from "@/utils/local-storage";

export const storeUserInfo = ({ accessToken }: { accessToken: string }) => {
  setToLocalStroage("accessToken", accessToken as string);
};
