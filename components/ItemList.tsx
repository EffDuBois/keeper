import { DocumentFileDetail } from "react-native-saf-x";
import ItemListFolder from "./ItemListFolder";
import ItemListFile from "./ItemListFile";
import { ViewProps } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

interface ItemListProps extends ViewProps {
  foldersAndFiles: DocumentFileDetail[] | undefined;
}

export default function ItemList({
  foldersAndFiles,
}: ItemListProps) {
  const folders = foldersAndFiles?.filter((file) => file.type === "directory");
  const files = foldersAndFiles?.filter((file) => file.type === "file");
  return (
    <>
      {folders?.map((item) => (
        <ItemListFolder file={item} key={item.uri} />
      ))}
      {files?.map((item) => (
        <ItemListFile file={item} key={item.uri} />
      ))}
    </>
  );
}
