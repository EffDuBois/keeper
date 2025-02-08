import { useFs } from "@/utils/Fs/Fs";
import { checkIfFolder, readFileName } from "@/utils/Fs/utils";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Pressable, Text } from "react-native";
import { DocumentFileDetail } from "react-native-saf-x";

export default function ItemListFile({ file }: { file: DocumentFileDetail }) {
  const router = useRouter();
  const Fs = useFs();
  const onItemPress = async () => {
    router.push({
      pathname: "/note/[id]",
      params: { id: file.uri, uri: file.uri },
    });
  };
  return (
    <Pressable onPress={onItemPress} className="py-3 mx-6 px-4 flex flex-row">
      <Text className="text-md font-bold text-foreground">{file.name}</Text>
    </Pressable>
  );
}
