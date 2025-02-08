import { DocumentFileDetail } from "react-native-saf-x";
import ItemListFolder from "./ItemListFolder";
import ItemListFile from "./ItemListFile";
import { View } from "react-native";

export default function ItemList({
  foldersAndFiles,
  noGap = false,
}: {
  foldersAndFiles: DocumentFileDetail[] | undefined;
  noGap?: boolean;
}) {
  const folders = foldersAndFiles?.filter((file) => file.type === "directory");
  const files = foldersAndFiles?.filter((file) => file.type === "file");
  return (
    <View className={noGap ? "" : "border-l border-foreground ml-8"}>
      {folders?.map((item) => (
        <ItemListFolder file={item} key={item.uri} />
      ))}
      {files?.map((item) => (
        <ItemListFile file={item} key={item.uri} />
      ))}
    </View>
  );
}
