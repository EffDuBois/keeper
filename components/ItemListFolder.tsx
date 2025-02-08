import { useFs } from "@/utils/Fs/Fs";
import { checkIfFolder, readFileName } from "@/utils/Fs/utils";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { DocumentFileDetail } from "react-native-saf-x";
import { useState } from "react";
import ItemList from "./ItemList";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

export default function ItemListFolder({ file }: { file: DocumentFileDetail }) {
  const Fs = useFs();

  const height = useSharedValue(0);

  const [files, setFiles] = useState<DocumentFileDetail[]>([]);

  const onItemPress = async () => {
    const freshFiles = await Fs.readFolderContent(file.uri);
    setFiles(freshFiles);
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
        rotate: height.value === 0 ? withTiming("0deg") : withTiming("90deg"),
      },
    ],
  }));

  return (
    <View className="flex items-start">
      <Pressable
        onPress={onItemPress}
        className={"py-3 mx-6 px-2 flex flex-row"}
      >
        <View className="relative">
          <Text className="text-md font-bold text-foreground">{file.name}</Text>
          <Animated.View style={IconStyle} className=" absolute -left-6">
            <Feather
              name="chevron-right"
              size={20}
              color={"white"}
              className=""
            />
          </Animated.View>
        </View>
      </Pressable>
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
