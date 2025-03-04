import { createAppAsyncThunk } from "@/redux/withTypes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getRootFolder, getRootFolderContent } from "./Fs";
import { DocumentFileDetail } from "react-native-saf-x";
import { RootState } from "@/redux/store";

export interface FsState {
  rootFolder: DocumentFileDetail | null;
  fileList: DocumentFileDetail[];
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
        (
          state,
          action: PayloadAction<{
            rootFolder: DocumentFileDetail;
            fileList: DocumentFileDetail[];
          }>
        ) => {
          state.rootFolder = action.payload.rootFolder;
          state.fileList = action.payload.fileList;
        }
      )
      .addCase(initFs.rejected, (state, action) => {
        console.error("Failed to initialize file system:", action.error);
      })
      .addCase(refreshRootContent.fulfilled, (state, action) => {
        state.fileList = action.payload;
      })
      .addCase(refreshRootContent.rejected, (state, action) => {
        console.error("Failed to get root content:", action.error);
      });
  },
});

export const initFs = createAppAsyncThunk(
  "fs/initFs",
  async (_, { getState }) => {
    const state = getState();
    let rootFolder = state.fs.rootFolder;
    if (!rootFolder) {
      const result = await getRootFolder();
      rootFolder = result;
    }
    const fileList = await getRootFolderContent(rootFolder);
    return { rootFolder, fileList };
  }
);

export const refreshRootContent = createAppAsyncThunk(
  "fs/refreshRootContent",
  async (_, { getState }) => {
    const state = getState();
    const rootFolder = state.fs.rootFolder;
    if (rootFolder) {
      const result = await getRootFolderContent(rootFolder);
      return result;
    }
    return [];
  }
);

export const selectRootFiles = (state: RootState) => state.fs.fileList;

export default fsSlice.reducer;
