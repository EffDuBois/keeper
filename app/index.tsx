import { Link } from "expo-router";
import { FlatList, Text, View } from "react-native";

const Notes = [
  { id: 1, title: "Note 1", content: "This is the content of note 1" },
  { id: 2, title: "Note 2", content: "This is the content of note 2" },
  { id: 3, title: "Note 3", content: "This is the content of note 3" },
  { id: 4, title: "Note 4", content: "This is the content of note 4" },
  { id: 5, title: "Note 5", content: "This is the content of note 5" },
  { id: 6, title: "Note 6", content: "This is the content of note 6" },
  { id: 7, title: "Note 7", content: "This is the content of note 7" },
  { id: 8, title: "Note 8", content: "This is the content of note 8" },
  { id: 9, title: "Note 9", content: "This is the content of note 9" },
  { id: 10, title: "Note 10", content: "This is the content of note 10" },
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
        <Text className="text-lg font-bold">{title}</Text>
        <Text className="text-sm">{content}</Text>
      </View>
    </Link>
  );
}

export default function Index() {
  return (
    <View className="">
      <FlatList
        className="border-b-2 flex"
        ListHeaderComponent={() => (
          <Text className="text-2xl font-bold mx-12 my-8">Notes</Text>
        )}
        data={Notes}
        renderItem={({ item }) => (
          <NoteItem id={item.id} title={item.title} content={item.content} />
        )}
        ItemSeparatorComponent={() => <View className="border-b-2" />}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}
