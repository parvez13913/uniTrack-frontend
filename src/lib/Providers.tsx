"use client";

import { store } from "@/redux/store";
import StyledComponentsRegistry from "./AntdRegistry";
import { Provider } from "react-redux";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
    </Provider>
  );
};

export default Providers;
