import {StyleSheet, View} from "react-native"
import React from "react"
import {
  Placeholder,
  PlaceholderMedia,
  PlaceholderLine,
  ShineOverlay,
} from "rn-placeholder"

const ListFooterComponent = () => {
  return (
    <View style={styles.container}>
      <Placeholder Animation={ShineOverlay}>
        <View style={styles.boxRow}>
          <PlaceholderMedia style={styles.styleMedia} />
          <View style={styles.boxContent}>
            <PlaceholderLine width={55} />
            <PlaceholderLine width={45} />
            <PlaceholderLine width={55} />
            <PlaceholderLine width={25} />
            <PlaceholderLine width={15} />
          </View>
        </View>
      </Placeholder>
    </View>
  )
}
const styles = StyleSheet.create({
  boxContent: {width: "100%", marginLeft: 10, marginTop: 10},
  styleMedia: {
    height: 150,
    width: 150,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
  },
  boxRow: {flexDirection: "row"},
  container: {marginHorizontal: 10, marginVertical: 10},
})
export default ListFooterComponent
