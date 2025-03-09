import { createAppAsyncThunk } from "@/redux/withTypes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createEmptyFileAtDir, getRootFolder, getFolderContent } from "./Fs";
import { DocumentFileDetail } from "react-native-saf-x";
import { RootState } from "@/redux/store";

export interface FsState {
  rootFolder: DocumentFileDetail | null;
  fileList: DocumentFileDetail[];
  selectedFile: DocumentFileDetail | null;
}

const initialState: FsState = {
  rootFolder: null,
  fileList: [],
  selectedFile: null,
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
      .addCase(createFileAtDir.fulfilled, (state, action) => {
        state.fileList = action.payload.fileList;
        state.selectedFile = action.payload.newFile;
      })
      .addCase(createFileAtDir.rejected, (state, action) => {
        console.error("Failed to create file:", action.error);
      })
      .addCase(createFileAtRoot.rejected, (state, action) => {
        console.error("Failed to create file at root:", action.error);
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
    const fileList = await getFolderContent(rootFolder);
    return { rootFolder, fileList };
  }
);

export const createFileAtDir = createAppAsyncThunk(
  "fs/createEmptyFileAtDir",
  async (uri: DocumentFileDetail["uri"], { getState }) => {
    const newFile = await createEmptyFileAtDir(uri);
    if (uri === getState().fs.rootFolder?.uri) {
      return { newFile, fileList: [...getState().fs.fileList, newFile] };
    }
    return { newFile, fileList: getState().fs.fileList };
  }
);

export const createFileAtRoot = createAppAsyncThunk(
  "fs/createFileAtRoot",
  async (_, { getState, dispatch }) => {
    const state = getState();
    const rootFolderUri = state.fs.rootFolder?.uri;
    if (!rootFolderUri) {
      throw new Error("Root folder is not set");
    }
    dispatch(createFileAtDir(rootFolderUri));
  }
);

export const selectRootFiles = (state: RootState) => state.fs.fileList;

export const selectSelectedFile = (state: RootState) => state.fs.selectedFile;

export default fsSlice.reducer;
