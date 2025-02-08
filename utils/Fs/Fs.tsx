import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import {
  DocumentFileDetail,
  listFiles,
  openDocument,
  openDocumentTree,
  readFile,
  stat,
} from "react-native-saf-x";

interface FsContextProps {
  rootFolder: DocumentFileDetail | undefined;
  getRootFolderContent: () => Promise<DocumentFileDetail[] | undefined>;
  readFolderContent: (
    uri: DocumentFileDetail["uri"]
  ) => Promise<DocumentFileDetail[]>;
  getFile: (uri: DocumentFileDetail["uri"]) => Promise<DocumentFileDetail>;
  readFileContent: (uri: DocumentFileDetail["uri"]) => Promise<string>;
}

const FsContext = createContext<FsContextProps | undefined>(undefined);

export const FsProvider = ({ children }: { children: ReactNode }) => {
  const [rootFolder, setRootFolder] = useState<
    DocumentFileDetail | undefined
  >();

  useEffect(() => {
    const getRootFolder = async () => {
      try {
        if (!rootFolder) {
          const newFolder = await openDocumentTree(true);
          console.log(newFolder);
          if (newFolder) setRootFolder(newFolder);
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

  const getFile = async (uri: DocumentFileDetail["uri"]) => {
    const file = await stat(uri);
    return file;
  };

  const readFileContent = async (uri: DocumentFileDetail["uri"]) => {
    const fileContent = await readFile(uri);
    return fileContent;
  };

  return (
    <FsContext.Provider
      value={{
        rootFolder,
        getRootFolderContent,
        readFolderContent,
        getFile,
        readFileContent,
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
