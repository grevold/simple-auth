import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { beUrl } from "../../../../appConstants";

interface IUserData {
  cart: string[];
}

export const addProductToCart = createAsyncThunk<void, string>(
  "user/get-user-data-by-jwt",
  async function (id, thunkAPI) {
    try {
      await axios<IUserData>({
        method: "post",
        url: `${beUrl}user/add-product-to-cart`,
        data: { id },
      });
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
