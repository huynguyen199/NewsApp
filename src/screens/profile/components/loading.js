import {View, StyleSheet} from "react-native"
import React from "react"
import {
  Placeholder,
  PlaceholderMedia,
  PlaceholderLine,
  ShineOverlay,
} from "rn-placeholder"

const Loading = () => {
  return (
    <View style={styles.container}>
      <Placeholder Animation={ShineOverlay}>
        {/* Header */}
        <View style={styles.boxRowLeftHeader}>
          <View style={styles.boxRow}>
            <PlaceholderMedia style={styles.iconStyle} />
            <PlaceholderLine width={40} height={20} style={styles.styleLine} />
          </View>
          <View style={styles.boxRowRightHeader}>
            <PlaceholderMedia style={styles.iconEdit} />
            <PlaceholderMedia style={styles.iconSettings} />
          </View>
        </View>
        {/* Avatar */}
        <View style={styles.avatarContainer}>
          <PlaceholderMedia style={styles.styleAvatar} />
          <PlaceholderLine width={30} height={20} style={styles.txtTitle} />
          <PlaceholderLine width={80} height={20} style={styles.txtAbout} />
          <PlaceholderLine width={70} height={20} />
          <View style={styles.boxRow}>
            <PlaceholderMedia style={styles.boxLeft} />
            <PlaceholderMedia style={styles.boxCenter} />
            <PlaceholderMedia style={styles.boxRight} />
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <PlaceholderMedia style={styles.styleBtn} />
        </View>
        {/* Button */}
      </Placeholder>
    </View>
  )
}

const styles = StyleSheet.create({
  boxRow: {flexDirection: "row"},
  styleBtn: {width: "100%", height: 50, borderRadius: 40},
  buttonContainer: {alignItems: "center", marginTop: 80, marginHorizontal: 10},
  boxRight: {width: 100, height: 100, marginLeft: 10},
  boxCenter: {width: 100, height: 100, marginLeft: 10},
  boxLeft: {width: 100, height: 100},
  txtAbout: {marginTop: 20},
  txtTitle: {marginTop: 20},
  styleAvatar: {width: 120, height: 120, borderRadius: 120 / 2},
  avatarContainer: {alignItems: "center"},
  iconSettings: {width: 40, height: 40, marginLeft: 10},
  iconEdit: {width: 40, height: 40},
  boxRowRightHeader: {flexDirection: "row"},
  styleLine: {marginTop: 10, marginLeft: 10},
  iconStyle: {width: 40, height: 40},
  boxRowLeftHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 10,
    marginTop: 10,
  },
  container: {flex: 1, backgroundColor: "white"},
})
export default Loading
