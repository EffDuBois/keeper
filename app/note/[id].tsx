import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect } from "react";
import { Text, View } from "react-native";

export default function Note() {
  const navigation = useNavigation();
  const { id } = useLocalSearchParams();
  
  useEffect(() => {
    navigation.setOptions({
      title: `Note ${id}`,
    });
  }, [id, navigation]);

  return (
    <View>
      <Text>Note {id}</Text>
    </View>
  );
}
