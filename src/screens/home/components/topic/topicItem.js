import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native"

import CheckBox from "@react-native-community/checkbox"
import React from "react"
import fonts from "@assets/fonts"
import {shortString} from "@utils/method"
import {useTheme} from "@react-navigation/native"

const TopicItem = ({item, handleCheckbox}) => {
  const {colors} = useTheme()
  const styles = makeStyles(colors)
  // const [checked, setChecked] = useState(item.checked)

  const onToggleCheckbox = () => {
    // setChecked(!checked)
    handleCheckbox(item.id)
  }

  return (
    <TouchableOpacity onPress={onToggleCheckbox}>
      <View style={styles.container}>
        <ImageBackground
          imageStyle={
            item.checked ? styles.imageStyle : styles.imageStyleNoBorder
          }
          style={styles.styleBackground}
          source={{
            uri: item.image,
          }}>
          <CheckBox
            style={styles.styleCheckBox}
            tintColors={{
              true: colors.lightRed,
              false: colors.lightRed,
            }}
            value={item.checked}
          />
          <View style={styles.boxTextRow}>
            <Text style={styles.txtTitle}>{shortString(item.name, 16)}</Text>
          </View>
        </ImageBackground>
      </View>
    </TouchableOpacity>
  )
}

const makeStyles = (colors) =>
  StyleSheet.create({
    txtTitle: {
      color: colors.white,
      alignSelf: "flex-end",
      margin: 15,
      fontFamily: fonts.bold,
    },
    boxTextRow: {
      flexDirection: "row",
      backgroundColor: "#000000c0",
      bottom: 0,
      position: "absolute",
      width: "100%",
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
    },
    styleCheckBox: {
      alignSelf: "flex-end",
      margin: 10,
    },
    styleBackground: {width: 180, height: 150},
    imageStyle: {
      borderRadius: 20,
      borderWidth: 3,
      borderColor: colors.lightRed,
    },
    imageStyleNoBorder: {
      borderRadius: 20,
    },
    container: {
      margin: 3,
      justifyContent: "center",
      alignItems: "center",
    },
  })
export default TopicItem
