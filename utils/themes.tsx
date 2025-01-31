import { useColorScheme, vars } from "nativewind";
import { View } from "react-native";

const themes = {
  default: {
    light: vars({
      "--color-foreground": "black",
      "--color-background": "white",
    }),
    dark: vars({
      "--color-foreground": "white",
      "--color-background": "black",
    }),
  },
};

type ThemeNames = keyof typeof themes;

export default function Theme({
  name,
  children,
}: {
  name: ThemeNames;
  children: React.ReactElement | React.ReactElement[];
}) {
  const { colorScheme } = useColorScheme();
  return (
    <View className="flex-1" style={themes[name][colorScheme ?? "light"]}>
      {children}
    </View>
  );
}
