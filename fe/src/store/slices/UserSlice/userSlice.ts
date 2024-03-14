import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { signInThunk } from "./thunks/signInThunk";
import { signUpThunk } from "./thunks/signUpThunk";
import { jwtLocalStorageKey } from "../../../appConstants";
import { IProduct } from "../../../types";

interface IUserState {
  status: "loading" | "success" | "guest";
  cart: IProduct[];
}

const initialState: IUserState = {
  status: "loading",
  cart: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logOut: (state, action: PayloadAction<void>) => {
      localStorage.clear();
      return {
        ...state,
        status: "guest",
      };
    },
    logIn: (state, action: PayloadAction<void>) => {
      return {
        ...state,
        status: "success",
      };
    },
    setLoading: (state, action: PayloadAction<void>) => {
      return {
        ...state,
        status: "loading",
      };
    },
  },
  extraReducers(builder) {
    builder.addCase(
      signInThunk.fulfilled,
      (userState, action: PayloadAction<string>) => {
        localStorage.setItem(jwtLocalStorageKey, action.payload);
        return {
          ...userState,
          status: "success",
        };
      }
    );
    builder.addCase(
      signInThunk.rejected,
      (userState, action: PayloadAction<any>) => {
        return {
          ...userState,
          status: "guest",
        };
      }
    );
    builder.addCase(
      signUpThunk.fulfilled,
      (userState, action: PayloadAction<string>) => {
        localStorage.setItem(jwtLocalStorageKey, action.payload);
        return {
          ...userState,
          status: "success",
        };
      }
    );
    builder.addCase(
      signUpThunk.rejected,
      (userState, action: PayloadAction<any>) => {
        return {
          ...userState,
          status: "guest",
        };
      }
    );
  },
});

export const { reducer, actions } = userSlice;
