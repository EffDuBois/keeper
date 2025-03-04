import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import {
  createFile,
  DocumentFileDetail,
  exists,
  listFiles,
  mkdir,
  openDocumentTree,
  readFile,
  stat,
  writeFile,
} from "react-native-saf-x";

export const getRootFolder = async () => {
  try {
    const storedFolderUri = await AsyncStorage.getItem(ROOT_FOLDER_KEY);
    const folderExists = storedFolderUri && (await exists(storedFolderUri));
    if (folderExists) {
      const storedFolder = await stat(storedFolderUri);
      if (storedFolder) {
        return storedFolder;
      }
    } else {
      console.log("FS-init: No stored folder found, picking new folder");
      const newFolder = await openDocumentTree(true);
      if (newFolder) {
        AsyncStorage.setItem(ROOT_FOLDER_KEY, newFolder.uri);
        return newFolder;
      }
    }
  } catch (error) {
    console.error("FS-init: Error getting root folder:", error);
  }
};

interface FsContextProps {
  rootFolder: DocumentFileDetail | undefined;
  getRootFolderContent: () => Promise<DocumentFileDetail[] | undefined>;
  readFolderContent: (
    uri: DocumentFileDetail["uri"]
  ) => Promise<DocumentFileDetail[]>;
  getFile: (uri: DocumentFileDetail["uri"]) => Promise<DocumentFileDetail>;
  readFileContent: (uri: DocumentFileDetail["uri"]) => Promise<string>;
  createEmptyFile: (
    uri: DocumentFileDetail["uri"]
  ) => Promise<DocumentFileDetail>;
  editFile: (uri: DocumentFileDetail["uri"], data: string) => Promise<void>;
  createFolder: (uri: DocumentFileDetail["uri"]) => Promise<DocumentFileDetail>;
  subscribeToNoteList: (subscriberCallback: Function) => () => void;
}

const FsContext = createContext<FsContextProps | undefined>(undefined);

const ROOT_FOLDER_KEY = "root_path";

const [rootFolder, setRootFolder] = useState<DocumentFileDetail | undefined>();

const getRootFolderContent = async () => {
  try {
    if (rootFolder) {
      const rootFiles = await listFiles(rootFolder?.uri);
      return rootFiles;
    }
  } catch (error) {
    console.error("Error getting root folder content:", error);
    return [];
  }
};

const readFolderContent = async (uri: DocumentFileDetail["uri"]) => {
  try {
    const folderFiles = await listFiles(uri);
    return folderFiles;
  } catch (error) {
    console.error("Error reading folder content:", error);
    return [];
  }
};

const createFolder = async (uri: DocumentFileDetail["uri"]) => {
  try {
    const newFolder = await mkdir(uri);
    return newFolder;
  } catch (error) {
    console.error("Error creating folder:", error);
    throw error;
  }
};

const getFile = async (uri: DocumentFileDetail["uri"]) => {
  try {
    const file = await stat(uri);
    return file;
  } catch (error) {
    console.error("Error getting file:", error);
    throw error;
  }
};

const readFileContent = async (uri: DocumentFileDetail["uri"]) => {
  try {
    const fileContent = await readFile(uri);
    return fileContent;
  } catch (error) {
    console.error("Error reading file content:", error);
    throw error;
  }
};

const createEmptyFile = async (uri: DocumentFileDetail["uri"]) => {
  try {
    const newFile = await createFile(uri);
    return newFile;
  } catch (error) {
    console.error("Error creating file:", error);
    throw error;
  }
};

//this overwrites the old data
const editFile = async (uri: DocumentFileDetail["uri"], data: string) => {
  try {
    await writeFile(uri, data);
  } catch (error) {
    console.error("Error editing file:", error);
    throw error;
  }
};

export const useFs = () => {
  const context = useContext(FsContext);
  if (context === undefined) {
    throw new Error("useFs must be used within a FsProvider");
  }
  return context;
};
