import { useFs } from "@/lib/Fs/Fs";
import { FontAwesome5, FontAwesome6, Ionicons } from "@expo/vector-icons";
import { Pressable, View } from "react-native";

export default function ActionBar() {
  const fs = useFs();

  const createUntitledFile = async () => {
    const root = fs.rootFolder;
    console.log();

    const rootFiles = await fs.getRootFolderContent();
    let latestFileNumber = 0;

    rootFiles?.forEach((file) => {
      const match = file.uri.match(/.*\/Untitled (\d+).md/);
      if (match && match[1]) {
        const fileNumber = parseInt(match[1], 10);
        if (fileNumber >= latestFileNumber) {
          latestFileNumber = fileNumber + 1;
        }
      } else {
        const match = file.uri.match(/.*\/Untitled.md/);
        if (match) {
          latestFileNumber = 1;
        }
      }
    });
    try {
      let newFile;
      if (root) {
        latestFileNumber === 0
          ? (newFile = await fs.createEmptyFile(`${root.uri}/Untitled.md`))
          : (newFile = await fs.createEmptyFile(
              `${root.uri}/Untitled ${latestFileNumber}.md`
            ));
      }
      console.log(`created file named Untitled ${newFile?.name}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View
      className="flex flex-row justify-between items-center bg-navui-background border-t-2 px-12 py-2"
      style={{ position: "fixed", top: 0 }}
    >
      <Pressable onPress={createUntitledFile}>
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
