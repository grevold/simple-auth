import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { beUrl } from "../../../../appConstants";
import { IProduct } from "../../../../types";

export const getProductsByIdsThunk = createAsyncThunk<IProduct[], string[]>(
  "products/get-products-by-ids",
  async function (cart, thunkAPI) {
    try {
      const response = await axios<IProduct[]>({
        method: "get",
        url: `${beUrl}products/get-products-by-ids`,
        data: { ids: cart },
      });
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
