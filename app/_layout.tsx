import { Stack } from "expo-router";

import "../global.css";
import Theme from "@/lib/themes";
import { TextStyle, View, ViewStyle } from "react-native";
import { StatusBar } from "expo-status-bar";
import { cssInterop } from "nativewind";
import { Provider } from "react-redux";
import { store } from "@/redux/store";

interface StackProps extends React.ComponentProps<typeof Stack> {
  headerStyle?: TextStyle;
}

const StackImpl = ({ headerStyle, ...props }: StackProps) => {
  props.screenOptions = {
    ...props.screenOptions,
    headerStyle: {
      backgroundColor: headerStyle?.backgroundColor?.toString(),
    },
    headerTintColor: headerStyle?.color?.toString(),
  };
  return <Stack {...props} />;
};

// Changing this requires reloading the app
export const StyledStack = cssInterop(StackImpl, {
  headerClassName: "headerStyle",
});

export default function RootLayout() {
  return (
    <Provider store={store}>
      <Theme name="default">
        <StatusBar style="auto" />
        <View className="flex-1 bg-background">
          <StyledStack
            headerClassName="bg-background text-foreground"
            screenOptions={{
              headerTitle: "",
              headerShadowVisible: false,
            }}
          />
        </View>
      </Theme>
    </Provider>
  );
}
