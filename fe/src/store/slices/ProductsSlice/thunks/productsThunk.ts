import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


import { actions } from "../productsSlice";
import { IProduct } from "../../../../types";
import { beUrl } from "../../../../appConstants";

export const productsThunk = createAsyncThunk<IProduct[], void>(
  "products/get-products",
  async function (userCredentials, thunkAPI) {
    try {
      thunkAPI.dispatch(actions.setLoading());
      const response = await axios<IProduct[]>({
        method: "get",
        url: `${beUrl}products/`,
        data: userCredentials,
      });
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
