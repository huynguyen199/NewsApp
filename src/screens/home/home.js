import {View} from "react-native"
import React from "react"
import {Header} from "@rneui/themed"
import LeftComponent from "./components/leftComponent"
import RightComponent from "./components/rightComponent"
import NewsContainer from "./components/newsContainer"
import VirtualizedView from "../../components/virtualizedView"
import SearchContainer from "./components/searchContainer"
import FeaturedContainer from "./components/featuredContainer"

const Home = () => {
  return (
    <VirtualizedView>
      <View style={{flex: 1, backgroundColor: "white"}}>
        <Header
          leftComponent={<LeftComponent />}
          rightComponent={<RightComponent />}
          containerStyle={{borderBottomWidth: 0}}
          backgroundColor={"white"}
        />
        {/* form search */}
        <SearchContainer />
        {/* form search */}

        {/* banner featured */}
        <FeaturedContainer />
        {/* banner featured */}

        {/* news list */}
        <NewsContainer />
      </View>
    </VirtualizedView>
  )
}

export default Home
