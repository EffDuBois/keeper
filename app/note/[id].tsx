import { useFs } from "@/lib/Fs/Fs";
import { readFileName } from "@/utils/Fs/utils";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, Text } from "react-native";
import { DocumentFileDetail } from "react-native-saf-x";

interface noteWithContent extends DocumentFileDetail {
  type: "directory";
  content: string;
}

export default function Note() {
  const { uri } = useLocalSearchParams() as { uri: string };

  const Fs = useFs();

  const [file, setFile] = useState<DocumentFileDetail | null>(null);
  const [content, setContent] = useState<string | null>(null);

  useEffect(() => {
    const fetchFile = async () => {
      const newFile = await Fs.getFile(uri);
      setFile(newFile);
    };
    fetchFile();
    const fetchContent = async () => {
      const fileContent = await Fs.readFileContent(uri);
      setContent(fileContent);
    };
    fetchContent();
  }, [uri]);

  return (
    <ScrollView className="flex-1 bg-background">
      <Text className="text-foreground">{file?.name}</Text>
      <Text className="text-foreground">{content}</Text>
    </ScrollView>
  );
}
