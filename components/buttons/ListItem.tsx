import React from "react";
import { Pressable, PressableProps, Text } from "react-native";

interface ListItemProps extends PressableProps {
  title: string;
}

const ListItem: React.FC<ListItemProps> = ({
  title,
  className,
  children,
  ...props
}) => {
  return (
    <Pressable
      className={`py-3 mx-6 px-2 flex flex-row ${className}`}
      {...props}
    >
      {typeof children === "function"
        ? children({ pressed: false, hovered: false })
        : children}
      <Text className="text-md font-bold text-foreground">{title}</Text>
    </Pressable>
  );
};

export default ListItem;
