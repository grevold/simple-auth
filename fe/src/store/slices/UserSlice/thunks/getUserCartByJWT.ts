import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { beUrl } from "../../../../appConstants";
import { IProduct } from "../../../../types";

export const getUserCartByJWT = createAsyncThunk<IProduct[], void>(
  "products/get-user-cart-by-jwt",
  async function (cart, thunkAPI) {
    try {
      const response = await axios<IProduct[]>({
        method: "get",
        url: `${beUrl}user/get-user-cart-by-jwt`,
      });
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
