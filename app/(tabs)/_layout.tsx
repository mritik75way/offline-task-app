import { BottomNavigation } from "react-native-paper";
import { useState } from "react";
import { CommonActions, NavigationProp, useNavigation } from "@react-navigation/native";
import Home from "./home";
import Profile from "./profile";

export default function TabsLayout() {
  const [index, setIndex] = useState(0);

  const routes = [
    { key: "home", title: "Home", focusedIcon: "home", unfocusedIcon: "home-outline" },
    { key: "profile", title: "Profile", focusedIcon: "account", unfocusedIcon: "account-outline" },
  ];

  const renderScene = BottomNavigation.SceneMap({
    home: Home,
    profile: Profile,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
}
