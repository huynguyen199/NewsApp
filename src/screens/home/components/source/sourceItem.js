import {View, StyleSheet, TouchableOpacity, Image} from "react-native"
import React from "react"
import CheckBox from "@react-native-community/checkbox"
import {useTheme} from "@react-navigation/native"
import fonts from "@assets/fonts"

const SourceItem = ({item, handleCheckbox}) => {
  const {colors} = useTheme()
  const styles = makeStyles(colors)

  const onToggleCheckbox = () => {
    handleCheckbox(item.id)
  }

  return (
    <TouchableOpacity onPress={onToggleCheckbox}>
      <View style={styles.container}>
        <View
          style={
            item.checked ? styles.styleBackgroundHover : styles.styleBackground
          }>
          <CheckBox
            style={styles.styleCheckBox}
            tintColors={{
              true: colors.lightRed,
              false: colors.lightRed,
            }}
            value={item.checked}
          />
          <Image
            style={styles.imageLogo}
            source={{
              uri: item.image,
            }}
          />
          {/* <View style={styles.boxTextRow}>
            <Text style={styles.txtTitle}>Art</Text>
          </View>  */}
        </View>
      </View>
    </TouchableOpacity>
  )
}

const makeStyles = (colors) =>
  StyleSheet.create({
    imageLogo: {
      width: 80,
      height: 80,
      borderRadius: 80 / 2,
    },
    txtTitle: {
      color: colors.white,
      alignSelf: "flex-end",
      margin: 15,
      fontFamily: fonts.bold,
    },
    boxTextRow: {flex: 1, flexDirection: "row"},
    styleCheckBox: {
      position: "absolute",
      right: 10,
      top: 10,
    },
    styleBackground: {
      width: 180,
      height: 150,
      backgroundColor: colors.white,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 20,
      borderWidth: 2,
      borderColor: "whitesmoke",
    },
    imageStyle: {
      borderRadius: 20,
      borderWidth: 3,
      borderColor: colors.lightRed,
    },
    styleBackgroundHover: {
      width: 180,
      height: 150,
      backgroundColor: colors.white,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 20,
      borderWidth: 2,
      borderColor: colors.lightRed,
    },
    container: {
      margin: 3,
      justifyContent: "center",
      alignItems: "center",
    },
  })
export default SourceItem
