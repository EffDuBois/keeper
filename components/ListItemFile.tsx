import { useFs } from "@/utils/Fs/Fs";
import { useRouter } from "expo-router";
import { Pressable, Text } from "react-native";
import { DocumentFileDetail } from "react-native-saf-x";
import ListItem from "./buttons/ListItem";

export default function ListItemFile({ file }: { file: DocumentFileDetail }) {
  const router = useRouter();
  const Fs = useFs();
  const onItemPress = async () => {
    router.push({
      pathname: "/note/[id]",
      params: { id: file.uri, uri: file.uri },
    });
  };
  return <ListItem onPress={onItemPress} title={file.name} />;
}
