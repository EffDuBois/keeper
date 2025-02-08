import { useFs } from "@/utils/Fs/Fs";
import { useRouter } from "expo-router";
import { Pressable, Text } from "react-native";
import { DocumentFileDetail } from "react-native-saf-x";

export default function ListItemFile({ file }: { file: DocumentFileDetail }) {
  const router = useRouter();
  const Fs = useFs();
  const onItemPress = async () => {
    router.push({
      pathname: "/note/[id]",
      params: { id: file.uri, uri: file.uri },
    });
  };
  return (
    <Pressable onPress={onItemPress} className="py-3 mx-6 px-2 flex flex-row">
      <Text className="text-md font-bold text-foreground">{file.name}</Text>
    </Pressable>
  );
}
