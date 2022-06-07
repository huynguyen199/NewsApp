import {
  Placeholder,
  PlaceholderLine,
  PlaceholderMedia,
  ShineOverlay,
} from "rn-placeholder"
import {StyleSheet, View} from "react-native"

import React from "react"
import {useTheme} from "@react-navigation/native"

const Loading = () => {
  const {colors} = useTheme()
  const styles = makeStyles(colors)
  return (
    <View style={styles.container}>
      <View style={styles.boxMargin}>
        <Placeholder Animation={ShineOverlay}>
          {/* header */}
          <View style={styles.headerContainer}>
            <View style={styles.boxRowHeader}>
              <PlaceholderMedia style={styles.imageStyleHeader} />
              <PlaceholderLine
                width={40}
                height={20}
                style={styles.txtHeader}
              />
            </View>
            <View style={styles.boxRowRight}>
              {/* <PlaceholderMedia style={{width: 40, height: 40}} /> */}
              <PlaceholderMedia style={styles.iconRightHeader} />
            </View>
          </View>
          {/* searchbar */}
          <View style={styles.searchContainer}>
            <PlaceholderMedia style={styles.searchBarStyle} />
            <PlaceholderMedia style={styles.iconRightOfSearch} />
          </View>
          {/* Categories */}
          <View style={styles.categoryContainer}>
            <PlaceholderMedia style={styles.boxCategoryStyle} />
            <PlaceholderMedia style={styles.boxCategoryMargin} />
            <PlaceholderMedia style={styles.boxCategoryMargin} />
            <PlaceholderMedia style={styles.boxCategoryMargin} />
            <PlaceholderMedia style={styles.boxCategoryMargin} />
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
        </Placeholder>
      </View>
    </View>
  )
}

const makeStyles = (colors) =>
  StyleSheet.create({
    boxCategoryMargin: {
      width: 80,
      height: 35,
      borderRadius: 20,
      marginLeft: 10,
    },
    boxCategoryStyle: {width: 80, height: 35, borderRadius: 20},
    categoryContainer: {flexDirection: "row", marginTop: 30},
    iconRightOfSearch: {
      width: 45,
      height: 45,
      borderRadius: 10,
      marginLeft: 10,
    },
    searchBarStyle: {width: 310, height: 45, borderRadius: 40},
    searchContainer: {flexDirection: "row", marginTop: 20},
    iconRightHeader: {width: 40, height: 40, marginLeft: 10},
    boxRowRight: {flexDirection: "row"},
    txtHeader: {marginTop: 10, marginLeft: 10},
    imageStyleHeader: {width: 40, height: 40},
    boxRowHeader: {
      flexDirection: "row",
    },
    headerContainer: {
      justifyContent: "space-between",
      flexDirection: "row",
      marginTop: 10,
    },
    boxMargin: {
      marginHorizontal: 10,
    },
    container: {flex: 1, backgroundColor: colors.white},
    contentBoxTwo: {width: "100%", marginLeft: 10, marginTop: 10},
    imageBoxTwo: {
      height: 150,
      width: 150,
      borderTopLeftRadius: 20,
      borderBottomLeftRadius: 20,
      marginTop: 10,
    },
    itemListTwo: {
      flexDirection: "row",
      marginTop: 20,
      borderWidth: 1,
      borderColor: "#f8f8ff",
    },
    contentBox: {width: "100%", marginLeft: 10, marginTop: 10},
    imageBox: {
      height: 150,
      width: 150,
      borderTopLeftRadius: 20,
      borderBottomLeftRadius: 20,
      marginTop: 10,
    },
  })

export default Loading
