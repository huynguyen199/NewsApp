import {View, ScrollView, StyleSheet, StatusBar} from "react-native"
import React from "react"
import {
  Placeholder,
  PlaceholderMedia,
  PlaceholderLine,
  ShineOverlay,
} from "rn-placeholder"
import {useTheme} from "@react-navigation/native"

const Loading = () => {
  const {colors} = useTheme()
  const styles = makeStyles(colors)
  return (
    <ScrollView style={styles.container}>
      <StatusBar animated={true} backgroundColor={colors.white} />
      <Placeholder Animation={ShineOverlay}>
        {/* box Header */}
        <View style={styles.headerContainer}>
          <PlaceholderLine width={30} height={30} />
          <PlaceholderLine width={10} height={30} />
        </View>

        {/* News */}
        {/* categories */}
        <View style={styles.categoriesContainer}>
          <PlaceholderMedia style={styles.categoryItem} />
          <PlaceholderMedia style={styles.categoryItem} />
          <PlaceholderMedia style={styles.categoryItem} />
          <PlaceholderMedia style={styles.categoryItem} />
        </View>
        {/* categories */}
        {/* item list */}
        <View style={styles.listContainer}>
          <PlaceholderMedia style={styles.imageBox} />
          <View style={styles.contentBox}>
            <PlaceholderLine width={55} />
            <PlaceholderLine width={45} />
            <PlaceholderLine width={55} />
            <PlaceholderLine width={25} />
            <PlaceholderLine width={15} />
          </View>
        </View>
        {/* item list */}

        <View style={styles.itemListTwo}>
          <PlaceholderMedia style={styles.imageBoxTwo} />
          <View style={styles.contentBoxTwo}>
            <PlaceholderLine width={55} />
            <PlaceholderLine width={45} />
            <PlaceholderLine width={55} />
            <PlaceholderLine width={25} />
            <PlaceholderLine width={15} />
          </View>
        </View>

        <View style={styles.itemListTwo}>
          <PlaceholderMedia style={styles.imageBoxTwo} />
          <View style={styles.contentBoxTwo}>
            <PlaceholderLine width={55} />
            <PlaceholderLine width={45} />
            <PlaceholderLine width={55} />
            <PlaceholderLine width={25} />
            <PlaceholderLine width={15} />
          </View>
        </View>
        <View style={styles.itemListTwo}>
          <PlaceholderMedia style={styles.imageBoxTwo} />
          <View style={styles.contentBoxTwo}>
            <PlaceholderLine width={55} />
            <PlaceholderLine width={45} />
            <PlaceholderLine width={55} />
            <PlaceholderLine width={25} />
            <PlaceholderLine width={15} />
          </View>
        </View>
        {/* item list */}
      </Placeholder>
    </ScrollView>
  )
}
const makeStyles = (colors) =>
  StyleSheet.create({
    styleLine: {marginLeft: 20},
    boxImageBanner: {
      height: 200,
      width: "90%",
      borderRadius: 10,
    },
    contentBoxTwo: {width: "100%", marginLeft: 10, marginTop: 10},
    imageBoxTwo: {
      height: 150,
      width: 150,
      borderTopLeftRadius: 20,
      borderBottomLeftRadius: 20,
      marginTop: 10,
    },
    itemListTwo: {flexDirection: "row"},
    contentBox: {width: "100%", marginLeft: 10, marginTop: 10},
    imageBox: {
      height: 150,
      width: 150,
      borderTopLeftRadius: 20,
      borderBottomLeftRadius: 20,
      marginTop: 10,
    },
    listContainer: {flexDirection: "row"},
    categoryItem: {
      height: 35,
      width: 90,
      borderRadius: 10,
    },
    categoriesContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginHorizontal: 10,
      marginTop: 20,
    },
    newsContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginHorizontal: 10,
      marginTop: 20,
    },
    bannerContainer: {
      alignItems: "center",
    },
    featuredContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginHorizontal: 10,
      marginTop: 40,
    },
    boxRowHeader: {
      flexDirection: "row",
      height: 40,
      marginHorizontal: 10,
      justifyContent: "center",
      marginTop: 40,
    },
    headerContainer: {
      marginTop: 40,
      marginHorizontal: 10,
      height: 30,
      flexDirection: "row",
      justifyContent: "space-between",
    },
    container: {flex: 1, backgroundColor: colors.white},
  })

export default Loading
