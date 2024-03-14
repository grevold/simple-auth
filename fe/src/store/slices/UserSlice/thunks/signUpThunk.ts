import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { beUrl } from "../../../../appConstants";
import { IUserCredentials } from "../../../../types";

export const signUpThunk = createAsyncThunk<string, IUserCredentials>(
  "user/sign-up",
  async function (userCredentials, thunkAPI) {
    try {
      const response = await axios<string>({
        method: "post",
        url: `${beUrl}user/sign-up`,
        data: userCredentials,
      });
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
