import ActionBar from "@/components/ActionBar";
import ItemList from "@/components/ItemList";
import FolderListItem from "@/components/ListItemFolder";
import { initFs, selectRootFiles } from "@/lib/Fs/fsSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { DocumentFileDetail } from "react-native-saf-x";

export default function Index() {
  const dispatch = useAppDispatch();
  const files = useAppSelector(selectRootFiles);

  useEffect(() => {
    dispatch(initFs());
  }, [dispatch]);

  return (
    <>
      <ScrollView className="flex bg-background">
        <Text className="text-2xl font-bold mx-12 my-8 text-foreground">
          Notes
        </Text>
        <ItemList foldersAndFiles={files} />
      </ScrollView>
      <ActionBar />
    </>
  );
}
