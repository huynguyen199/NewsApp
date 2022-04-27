import {StyleSheet, View} from "react-native"
import React from "react"
import {Header, Icon} from "@rneui/themed"
import {useTheme} from "@react-navigation/native"
import SearchBar from "../../components/searchBar"
import {Ionicons} from "../../common/icon"
import LeftComponent from "./components/leftComponent"
import TopicList from "./components/topicList"
import Button from "../../components/button"

const Topic = () => {
  const {colors} = useTheme()
  const styles = makeStyles(colors)
  return (
    <View style={styles.container}>
      <Header
        leftComponent={<LeftComponent />}
        backgroundColor={colors.white}
      />
      <View style={styles.boxHeader}>
        <View style={styles.boxAlignHorizontal}>
          <SearchBar
            placeholder={"Search"}
            rightComponent={
              <Icon
                // onPress={onGoBackHome}
                name={Ionicons.search}
                type="ionicon"
                color={colors.grey}
                size={24}
              />
            }
            containerStyle={styles.containerStyleSearch}
          />
          <TopicList />
        </View>
      </View>
      <View style={styles.boxBottom}>
        <Button containerStyle={{marginHorizontal: 20}} title="Next" />
      </View>
    </View>
  )
}
const makeStyles = (colors) =>
  StyleSheet.create({
    containerStyleSearch: {marginTop: 20},
    boxAlignHorizontal: {marginHorizontal: 10},
    boxBottom: {
      height: 5,
      flex: 0.15,
      justifyContent: "center",
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      borderColor: colors.ghostWhite,
      borderTopWidth: 2,
      borderLeftWidth: 2,
      borderRightWidth: 2,
    },
    boxHeader: {
      height: 20,
      flex: 0.9,
    },
    container: {flex: 1, backgroundColor: colors.white},
  })

export default Topic
