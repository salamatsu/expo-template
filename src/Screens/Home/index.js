import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { StatusBar, Text, useWindowDimensions, View } from "react-native";
import { Button, Icon, useTheme } from "react-native-paper";
import { SceneMap, TabBar, TabBarItem, TabView } from "react-native-tab-view";
import { SCREEN_NAVIGATION } from "../../constants/navigations";


const NewsFeed = () => {

  const navigation = useNavigation()

  return <View className=" flex-1 bg-red-200">
    <Text>News Feed</Text>;
    <Button onPress={() => navigation.navigate(SCREEN_NAVIGATION.Profile)}>
      Go to Profile
    </Button>
  </View>

};
const BookCases = () => {
  return <Text>BookCases</Text>;
};
const IAsk = () => {
  return <Text>IAsk</Text>;
};

const ChurchMap = () => {
  return <Text>ChurchMap</Text>;
};

const More = () => {
  return <Text>More</Text>;
};

const renderScene = SceneMap({
  newsFeed: NewsFeed,
  bookCases: BookCases,
  iAsk: IAsk,
  churchMap: ChurchMap,
  more: More,
});

const routes = [
  { key: "newsFeed", title: "News Feed", icon: "newspaper-variant" },
  { key: "bookCases", title: "Book Cases", icon: "bookshelf" },
  { key: "iAsk", title: "IAsk", icon: "account-question" },
  { key: "churchMap", title: "Churches", icon: "church" },
  { key: "more", title: "More", icon: "menu" },
];

const Home = () => {
  const { colors } = useTheme();
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      activeColor={colors.primary}
      inactiveColor="gray"
      indicatorStyle={{ backgroundColor: colors.primary }}
      style={{ backgroundColor: "white" }}
      renderTabBarItem={(props) => {
        const { route, navigationState } = props;
        const selectedTab = navigationState.routes[navigationState.index];

        return (
          <TabBarItem
            {...props}
            key={selectedTab.key}
            style={{
              margin: 0,
              padding: 0,
            }}
            labelText={
              <Icon
                size={22}
                color={selectedTab.key == props.key ? colors.primary : "gray"}
                source={route.icon}
              />
            }
          />
        );
      }}
    />
  );

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderTabBar={renderTabBar}
      />
    </>
  );
};

export default Home;
