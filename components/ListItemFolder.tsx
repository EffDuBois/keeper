import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { DocumentFileDetail } from "react-native-saf-x";
import { useEffect, useState } from "react";
import ItemList from "./ItemList";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import ListItem from "./buttons/ListItem";
import { readFolderContent } from "@/lib/Fs/Fs";

export default function ListItemFolder({
  folder,
}: {
  folder: DocumentFileDetail;
}) {
  const height = useSharedValue(0);

  const [files, setFiles] = useState<DocumentFileDetail[]>([]);
// this assumes that updating the rootFiles state will trigger a re-render down here
  useEffect(() => {
    const fetchFiles = async () => {
      const files = await readFolderContent(folder.uri);
      setFiles(files);
    };
    fetchFiles();
  }, [folder.uri]);

  const onItemPress = async () => {
    //based on height, both the drawer opens and the icon rotates
    height.value === 0 ? height.set(10000) : height.set(0);
  };
  const viewStyle = useAnimatedStyle(() => ({
    maxHeight:
      height.value === 0
        ? withTiming(height.value)
        : withTiming(height.value, { duration: 1500 }),
  }));
  const IconStyle = useAnimatedStyle(() => ({
    transform: [
      {
        rotate:
          height.value === 0
            ? withTiming("0deg", { duration: 380 })
            : withTiming("90deg"),
      },
    ],
  }));

  return (
    <View className="flex items-start">
      <ListItem
        title={folder.name}
        onPress={onItemPress}
        onLongPress={() => {
          //TODO: implement drawer options
        }}
      >
        <View className="relative">
          <Animated.View style={IconStyle} className=" absolute -left-6">
            <Feather
              name="chevron-right"
              size={20}
              color={"white"}
              className=""
            />
          </Animated.View>
        </View>
      </ListItem>
      <Animated.View
        style={viewStyle}
        className="border-l border-foreground ml-[1.3rem] overflow-hidden"
      >
        <View className="-z-10">
          <ItemList foldersAndFiles={files} />
        </View>
      </Animated.View>
    </View>
  );
}
