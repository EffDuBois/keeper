import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect } from "react";
import { ScrollView, Text, View } from "react-native";

export default function Note() {
  const navigation = useNavigation();
  const { id } = useLocalSearchParams();

  return (
    <ScrollView className="flex-1 bg-background">
      <Text className="text-foreground">Note {id}</Text>
    </ScrollView>
  );
}
