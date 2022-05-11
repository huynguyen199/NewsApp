import {View, ScrollView, StyleSheet} from "react-native"
import React from "react"
import {
  Placeholder,
  PlaceholderMedia,
  PlaceholderLine,
  ShineOverlay,
} from "rn-placeholder"

const Loading = () => {
  return (
    <ScrollView style={styles.container}>
      <Placeholder Animation={ShineOverlay}>
        {/* box Header */}
        <View style={styles.headerContainer}>
          <PlaceholderLine width={30} height={30} />
          <PlaceholderLine width={10} height={30} />
        </View>
        {/* box Header */}
        <View style={styles.boxRowHeader}>
          <PlaceholderLine width={80} height={40} />
          <PlaceholderLine style={styles.styleLine} width={10} height={40} />
        </View>
        {/* featured */}
        <View style={styles.featuredContainer}>
          <PlaceholderLine width={20} height={20} />
          <PlaceholderLine width={20} height={20} />
        </View>
        {/* featured */}
        {/* banner */}
        <View style={styles.bannerContainer}>
          <PlaceholderMedia style={styles.boxImageBanner} />
        </View>
        {/* banner */}
        {/* News */}
        <View style={styles.newsContainer}>
          <PlaceholderLine width={20} height={20} />
          <PlaceholderLine width={20} height={20} />
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
        {/* item list */}
      </Placeholder>
    </ScrollView>
  )
}
const styles = StyleSheet.create({
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
  container: {flex: 1, backgroundColor: "white"},
})

export default Loading
