import {View, Text, Image, StyleSheet} from "react-native"
import React from "react"
import fonts from "@assets/fonts"
import {useTheme} from "@react-navigation/native"

const SourceContainer = ({sources}) => {
  const {colors} = useTheme()
  const styles = makeStyles(colors)

  return (
    <View style={styles.container}>
      <Image
        style={styles.imageSource}
        source={{
          uri: sources.image ?? sources.photoUrl,
        }}
      />
      <View style={styles.boxRowSource}>
        <View style={styles.boxText}>
          <Text style={styles.txtTitle}>
            {sources.name ?? sources.fullName}
          </Text>
          <Text style={styles.txtDayAgo}>5 days ago</Text>
        </View>
      </View>
    </View>
  )
}
const makeStyles = (colors) =>
  StyleSheet.create({
    txtDayAgo: {fontFamily: fonts.regular, color: colors.black},
    boxText: {marginTop: 10, marginLeft: 10},
    txtTitle: {
      fontFamily: fonts.bold,
      fontSize: 20,
      color: colors.lightRed,
    },
    boxRowSource: {
      flex: 1,
      justifyContent: "space-between",
      flexDirection: "row",
    },
    imageSource: {width: 70, height: 70, borderRadius: 70 / 2},
    container: {flexDirection: "row", marginTop: 20},
  })
export default SourceContainer
