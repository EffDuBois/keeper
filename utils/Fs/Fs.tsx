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
}

const FsContext = createContext<FsContextProps | undefined>(undefined);

const ROOT_FOLDER_KEY = "root_path";

export const FsProvider = ({ children }: { children: ReactNode }) => {
  const [rootFolder, setRootFolder] = useState<
    DocumentFileDetail | undefined
  >();

  useEffect(() => {
    const getRootFolder = async () => {
      try {
        if (!rootFolder) {
          const storedFolderUri = await AsyncStorage.getItem(ROOT_FOLDER_KEY);
          if (storedFolderUri && (await exists(storedFolderUri))) {
            const storedFolder = await stat(storedFolderUri);
            if (storedFolder) {
              setRootFolder(storedFolder);
            }
          } else {
            const newFolder = await openDocumentTree(true);
            if (newFolder) {
              setRootFolder(newFolder);
              AsyncStorage.setItem(ROOT_FOLDER_KEY, newFolder.uri);
            }
          }
        }
      } catch (error) {
        console.error(error);
      }
    };
    getRootFolder();
  }, []);

  const getRootFolderContent = async () => {
    if (rootFolder) {
      const rootFiles = await listFiles(rootFolder?.uri);
      return rootFiles;
    }
  };

  const readFolderContent = async (uri: DocumentFileDetail["uri"]) => {
    const folderFiles = await listFiles(uri);
    return folderFiles;
  };

  const createFolder = async (uri: DocumentFileDetail["uri"]) => {
    const newFolder = await mkdir(uri);
    return newFolder;
  };

  const getFile = async (uri: DocumentFileDetail["uri"]) => {
    const file = await stat(uri);
    return file;
  };

  const readFileContent = async (uri: DocumentFileDetail["uri"]) => {
    const fileContent = await readFile(uri);
    return fileContent;
  };

  const createEmptyFile = async (uri: DocumentFileDetail["uri"]) => {
    const newFile = await createFile(uri);
    return newFile;
  };

  //this overwrites the old data
  const editFile = async (uri: DocumentFileDetail["uri"], data: string) => {
    await writeFile(uri, data);
  };

  return (
    <FsContext.Provider
      value={{
        rootFolder,
        getRootFolderContent,
        readFolderContent,
        getFile,
        readFileContent,
        createEmptyFile,
        editFile,
        createFolder,
      }}
    >
      {children}
    </FsContext.Provider>
  );
};

export const useFs = () => {
  const context = useContext(FsContext);
  if (context === undefined) {
    throw new Error("useFs must be used within a FsProvider");
  }
  return context;
};
