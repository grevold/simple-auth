import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { signInThunk } from "./thunks/signInThunk";
import { signUpThunk } from "./thunks/signUpThunk";
import { jwtLocalStorageKey } from "../../appConstants";

interface IUserState {
  status: "loading" | "success" | "guest";
}

const initialState: IUserState = {
  status: "loading",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logOut: (state, action: PayloadAction<void>) => {
      return {
        status: "guest",
      };
    },
    logIn: (state, action: PayloadAction<void>) => {
      return {
        status: "success",
      };
    },
    setLoading: (state, action: PayloadAction<void>) => {
      return {
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
          status: "success",
        };
      }
    );
    builder.addCase(
      signInThunk.rejected,
      (userState, action: PayloadAction<any>) => {
        return {
          status: "guest",
        };
      }
    );
    builder.addCase(
      signUpThunk.fulfilled,
      (userState, action: PayloadAction<string>) => {
        localStorage.setItem(jwtLocalStorageKey, action.payload);
        return {
          status: "success",
        };
      }
    );
    builder.addCase(
      signUpThunk.rejected,
      (userState, action: PayloadAction<any>) => {
        return {
          status: "guest",
        };
      }
    );
  },
});

export const { reducer, actions } = userSlice;
