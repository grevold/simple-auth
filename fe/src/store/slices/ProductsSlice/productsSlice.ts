import { PayloadAction, createSlice } from "@reduxjs/toolkit";


import { IProduct } from "../../../types";
import { productsThunk } from "./thunks/productsThunk";

interface IProducts {
  data: IProduct[];
  isLoading: boolean;
}

const initialState: IProducts = {
  data: [],
  isLoading: true,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<void>) => {
      return initialState;
    },
  },
  extraReducers(builder) {
    builder.addCase(
      productsThunk.fulfilled,
      (_, action: PayloadAction<IProduct[]>) => {
        return {
          isLoading: false,
          data: action.payload,
        };
      }
    );
    builder.addCase(productsThunk.rejected, (_, action: PayloadAction<any>) => {
      return {
        isLoading: false,
        data: [],
      };
    });
  },
});

export const { reducer, actions } = productsSlice;
