import { Link } from "expo-router";
import { Text, View } from "react-native";

const Notes = [
  { id: 1, title: "Note 1", content: "This is the content of note 1" },
  { id: 2, title: "Note 2", content: "This is the content of note 2" },
];

export default function Index() {
  return (
    <View className="flex items-center">
      <Text className="text-2xl font-bold self-start">Notes</Text>
      {Notes.map((note) => (
        <Link
          key={note.id}
          href={{ pathname: "/note/[id]", params: { id: note.id } }}
        >
          <Text>{note.title}</Text>
        </Link>
      ))}
    </View>
  );
}
