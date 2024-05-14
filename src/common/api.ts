import { createAPIs } from "react-api-fetching";
import { ItemGetdata } from "../pages/Dashboard";

export const APIs = {
  GET_DATA: {
    url: "/simple-coffee-listing-data.json",
    method: "GET",
    // tokenKey: "accessToken",
  },
} as const;

declare global {
  type APIs = typeof APIs;
  type ApiKey = keyof APIs;
}
interface APIsData {
  GET_DATA: ItemGetdata[];
}

const Api = createAPIs<APIs, APIsData>(APIs);

export default Api;
