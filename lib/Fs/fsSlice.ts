import { createAppAsyncThunk } from "@/redux/withTypes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getRootFolder } from "./Fs";
import { DocumentFileDetail } from "react-native-saf-x";

export interface FsState {
  rootFolder: DocumentFileDetail | null;
  fileList: any[];
}

const initialState: FsState = {
  rootFolder: null,
  fileList: [],
};

export const fsSlice = createSlice({
  name: "fs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(initFs.pending, (state) => {
        state.rootFolder = null;
      })
      .addCase(
        initFs.fulfilled,
        (state, action: PayloadAction<DocumentFileDetail>) => {
          state.rootFolder = action.payload;
        }
      )
      .addCase(initFs.rejected, (state, action) => {
        console.error("Failed to initialize file system:", action.error);
      });
  },
});

export const initFs = createAppAsyncThunk(
  "fs/initFs",
  async (_, { dispatch, getState }) => {
    const state = getState();
    if (!state.fs.rootFolder) {
      try {
        const rootFolder = await getRootFolder();
        if (rootFolder) {
          return rootFolder;
        }
        throw new Error("Folder not found");
      } catch (error) {
        throw error;
      }
    }
    return state.fs.rootFolder;
  }
);

export default fsSlice.reducer;
