'use client'

import AppConstants from "@/src/constants/app_constants";
import { useAppSelector } from "@/src/redux/hook";
import axios from "axios";

export const useAxios = (
  contentType?: "application/json" | "multipart/form-data"
) => {
  const { guest_cart_token } = useAppSelector(state => state.cart)

  const axios_client = axios.create({
    baseURL: AppConstants.api_url,
    headers: {
      "Content-Type": contentType as string,
      accept: "application/json",
      lang: "en",
      'X-Cart-Token': guest_cart_token,
      "Access-Control-Allow-Origin": "*",
    },
  })

  axios_client.interceptors.request.use(request => {
    console.log(request.headers);

    return request;
    
  })

  return axios_client;
};
