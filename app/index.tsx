import ItemList from "@/components/ItemList";
import FolderListItem from "@/components/ListItemFolder";
import { useFs } from "@/utils/Fs/Fs";
import { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { DocumentFileDetail } from "react-native-saf-x";

export default function Index() {
  const fs = useFs();

  const [files, setFiles] = useState<DocumentFileDetail[] | undefined>();

  useEffect(() => {
    const fetchNotes = async () => {
      const freshFiles = await fs.getRootFolderContent();
      setFiles(freshFiles);
    };
    fetchNotes();
  }, [fs.rootFolder?.uri]);

  return (
    <ScrollView className="flex bg-background">
      <Text className="text-2xl font-bold mx-12 my-8 text-foreground">
        Notes
      </Text>
      <ItemList foldersAndFiles={files} />
    </ScrollView>
  );
}
