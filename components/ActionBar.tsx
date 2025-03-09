import { createFileAtRoot } from "@/lib/Fs/fsSlice";
import { useAppDispatch } from "@/redux/hooks";
import { FontAwesome5, FontAwesome6, Ionicons } from "@expo/vector-icons";
import { Pressable, View } from "react-native";

export default function ActionBar() {
  const dispatch = useAppDispatch();

  const createFile = () => {
    dispatch(createFileAtRoot());
  };

  return (
    <View
      className="flex flex-row justify-between items-center bg-navui-background border-t-2 px-12 py-2"
      style={{ position: "fixed", top: 0 }}
    >
      <Pressable onPress={createFile}>
        <Ionicons name="create" size={26} color={"white"} />
      </Pressable>
      <Pressable>
        <FontAwesome6 name="folder-plus" size={22} color={"white"} />
      </Pressable>
      <Pressable>
        <FontAwesome5 name="sort-amount-up-alt" size={22} color={"white"} />
      </Pressable>
      <View className="relative w-2/5 h-full">
        <Pressable className="rounded-full size-16 bg-primary-background top-0 right-0 -translate-y-10 absolute" />
      </View>
    </View>
  );
}
