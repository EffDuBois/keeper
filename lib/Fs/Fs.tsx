import AsyncStorage from "@react-native-async-storage/async-storage";
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

const ROOT_FOLDER_KEY = "root_path";

export const getRootFolder = async () => {
  try {
    const storedFolderUri = await AsyncStorage.getItem(ROOT_FOLDER_KEY);
    const folderExists = storedFolderUri && (await exists(storedFolderUri));
    if (folderExists) {
      const storedFolder = await stat(storedFolderUri);
      if (storedFolder) {
        return storedFolder;
      }
    }
    console.log("No stored folder found, picking new folder");
    const newFolder = await openDocumentTree(true);
    if (newFolder) {
      AsyncStorage.setItem(ROOT_FOLDER_KEY, newFolder.uri);
      return newFolder;
    }
    throw Error("Folder Selection Cancelled");
  } catch (error) {
    throw Error(`Error getting root folder: ${error}`);
  }
};

export const getFolderContent = async (folder: DocumentFileDetail) => {
  try {
    const rootFiles = await listFiles(folder.uri);
    return rootFiles;
  } catch (error) {
    throw Error(`Error getting folder ${folder.uri} content: ${error}`);
  }
};

export const readFolderContent = async (uri: DocumentFileDetail["uri"]) => {
  try {
    const folderFiles = await listFiles(uri);
    return folderFiles;
  } catch (error) {
    console.error("Error reading folder content:", error);
    return [];
  }
};

export const createFolder = async (uri: DocumentFileDetail["uri"]) => {
  try {
    const newFolder = await mkdir(uri);
    return newFolder;
  } catch (error) {
    console.error("Error creating folder:", error);
    throw error;
  }
};

export const getFile = async (uri: DocumentFileDetail["uri"]) => {
  try {
    const file = await stat(uri);
    return file;
  } catch (error) {
    console.error("Error getting file:", error);
    throw error;
  }
};

export const readFileContent = async (uri: DocumentFileDetail["uri"]) => {
  try {
    const fileContent = await readFile(uri);
    return fileContent;
  } catch (error) {
    console.error("Error reading file content:", error);
    throw error;
  }
};

export const createEmptyFileAtDir = async (uri: DocumentFileDetail["uri"]) => {
  const filesInDir = await readFolderContent(uri);
  let latestFileNumber = 0;

  filesInDir?.forEach((file) => {
    const match = file.uri.match(/.*\/Untitled (\d+).md/);
    if (match && match[1]) {
      const fileNumber = parseInt(match[1], 10);
      if (fileNumber >= latestFileNumber) {
        latestFileNumber = fileNumber + 1;
      }
    } else {
      const match = file.uri.match(/.*\/Untitled.md/);
      if (match) {
        latestFileNumber = 1;
      }
    }
  });
  try {
    let newFile;
    latestFileNumber === 0
      ? (newFile = await createFile(`${uri}/Untitled.md`))
      : (newFile = await createFile(`${uri}/Untitled ${latestFileNumber}.md`));
    console.log(`created file named Untitled ${newFile?.name}`);
    return newFile;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const editFile = async (
  uri: DocumentFileDetail["uri"],
  data: string
) => {
  try {
    await writeFile(uri, data);
  } catch (error) {
    console.error("Error editing file:", error);
    throw error;
  }
};
