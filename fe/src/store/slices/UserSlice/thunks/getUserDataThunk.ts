import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { beUrl } from "../../../../appConstants";

interface IUserData {
  cart: string[];
}

export const getUserDataThunk = createAsyncThunk<IUserData, void>(
  "user/get-user-data-by-jwt",
  async function (id, thunkAPI) {
    try {
      const response = await axios<IUserData>({
        method: "get",
        url: `${beUrl}user/get-user-data-by-jwt`,
        data: { id: id },
      });
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
