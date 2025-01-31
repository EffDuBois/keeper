import { Link } from "expo-router";
import { FlatList, Text, View } from "react-native";

const Notes = [
  { id: 1, title: "Note 1", content: "This is the content of note 1" },
];

type NoteItemProps = {
  id: number;
  title: string;
  content: string;
};

function NoteItem({ id, title, content }: NoteItemProps) {
  return (
    <Link className="w-full" href={{ pathname: "/note/[id]", params: { id } }}>
      <View className="py-4 px-12 flex flex-col">
        <Text className="text-lg font-bold text-foreground">{title}</Text>
        <Text className="text-sm text-foreground">{content}</Text>
      </View>
    </Link>
  );
}

export default function Index() {
  return (
    <FlatList
      className="flex bg-background"
      ListHeaderComponent={() => (
        <Text className="text-2xl font-bold mx-12 my-8 text-foreground">
          Notes
        </Text>
      )}
      data={Notes}
      renderItem={({ item }) => (
        <NoteItem id={item.id} title={item.title} content={item.content} />
      )}
      ItemSeparatorComponent={() => (
        <View className="border-b-[1px] border-foreground" />
      )}
      keyExtractor={(item) => item.id.toString()}
    />
  );
}
