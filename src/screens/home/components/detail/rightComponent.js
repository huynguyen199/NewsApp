import {View, StyleSheet} from "react-native"
import React from "react"
import IconButton from "@components/iconButton"
import {Ionicons} from "@common/icon"
import {useTheme} from "@react-navigation/native"

const RightComponent = () => {
  const {colors} = useTheme()
  const styles = makeStyles(colors)
  return (
    <View style={styles.container}>
      <IconButton name={Ionicons.shareSocial} />
      <IconButton
        name={Ionicons.bookmarkOutline}
        style={styles.styleBookmark}
      />
      <IconButton
        name={Ionicons.ellipsisVertical}
        style={styles.styleEllopsis}
      />
    </View>
  )
}
const makeStyles = (colors) =>
  StyleSheet.create({
    styleEllopsis: {marginLeft: 10},
    styleBookmark: {marginLeft: 10},
    container: {flexDirection: "row"},
  })

export default RightComponent
