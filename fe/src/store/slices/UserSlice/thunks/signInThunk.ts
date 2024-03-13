import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { beUrl } from "../../../../appConstants";
import { IUserCredentials } from "../../../../types";

export const signInThunk = createAsyncThunk<string, IUserCredentials>(
  "user/sign-in",
  async function (userCredentials, thunkAPI) {
    try {
      const response = await axios<string>({
        method: "post",
        url: `${beUrl}user/sign-in`,
        data: userCredentials,
      });
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
