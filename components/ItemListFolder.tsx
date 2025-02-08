import { useFs } from "@/utils/Fs/Fs";
import { checkIfFolder, readFileName } from "@/utils/Fs/utils";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { DocumentFileDetail } from "react-native-saf-x";
import { useState } from "react";
import ItemList from "./ItemList";

export default function ItemListFolder({ file }: { file: DocumentFileDetail }) {
  const Fs = useFs();

  const [expanded, setExpanded] = useState<boolean>(false);
  const [files, setFiles] = useState<DocumentFileDetail[]>([]);

  const onItemPress = async () => {
    //lower the icon
    const freshFiles = await Fs.readFolderContent(file.uri);
    setFiles(freshFiles);
    setExpanded((prev) => !prev);
  };

  return (
    <View className="flex items-start">
      <Pressable
        onPress={onItemPress}
        className={"py-3 mx-6 px-4 flex flex-row"}
      >
        <View className="relative">
          <Text className="text-md font-bold text-foreground">{file.name}</Text>
          <Feather
            name="chevron-right"
            size={20}
            color={"white"}
            className="absolute -left-6"
          />
        </View>
      </Pressable>
      {expanded && <ItemList foldersAndFiles={files} />}
    </View>
  );
}
