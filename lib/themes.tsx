import { useColorScheme, vars } from "nativewind";
import { View } from "react-native";

const themes = {
  default: {
    light: vars({
      "--color-foreground": "black",
      "--color-background": "white",
      "--color-navui-background": "#d3d3d3", // light grey
      "--color-navui-foreground": "#black", // dark grey for navui foreground
      "--color-primary-foreground": "#007bff", // blue
      "--color-primary-background": "#e7f1ff", // light blue
    }),
    dark: vars({
      "--color-foreground": "white",
      "--color-background": "black",
      "--color-navui-background": "#222", // dim grey
      "--color-navui-foreground": "white", // light grey for navui foreground
      "--color-primary-foreground": "#007bff", // blue
      "--color-primary-background": "#e7f1ff", // light blue
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
