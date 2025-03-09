import { DocumentFileDetail } from "react-native-saf-x";
import ListItemFolder from "./ListItemFolder";
import ListItemFile from "./ListItemFile";
import { ViewProps } from "react-native";

interface ItemListProps extends ViewProps {
  foldersAndFiles: DocumentFileDetail[] | undefined;
}

export default function ItemList({ foldersAndFiles }: ItemListProps) {
  const folders = foldersAndFiles?.filter((file) => file.type === "directory");
  const files = foldersAndFiles?.filter((file) => file.type === "file");
  return (
    <>
      {folders?.map((item) => (
        <ListItemFolder folder={item} key={item.uri} />
      ))}
      {files?.map((item) => (
        <ListItemFile file={item} key={item.uri} />
      ))}
    </>
  );
}
