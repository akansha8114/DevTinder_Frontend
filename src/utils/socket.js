import io from "socket.io-client";
import { Base_URL } from "./constants";

export const createSocketConnection = () => {
  if (location.hostname === "localhost") {
    return io(Base_URL);
  } else {
    return io("/", { path: "/api/socket.io" });
  }
};