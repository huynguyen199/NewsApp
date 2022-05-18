import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from "react-native"
import React, {useState} from "react"
import CheckBox from "@react-native-community/checkbox"
import {useTheme} from "@react-navigation/native"
import fonts from "@assets/fonts"

const TopicItem = () => {
  const {colors} = useTheme()
  const styles = makeStyles(colors)
  const [checked, setChecked] = useState(false)

  const onToggleCheckbox = () => {
    setChecked(!checked)
  }

  return (
    <TouchableOpacity onPress={onToggleCheckbox}>
      <View style={styles.container}>
        <ImageBackground
          imageStyle={checked ? styles.imageStyle : styles.imageStyleNoBorder}
          style={styles.styleBackground}
          source={{
            uri: "https://www.pictureframesexpress.co.uk/blog/wp-content/uploads/2020/05/7-Tips-to-Finding-Art-Inspiration-Header-1024x649.jpg",
          }}>
          <CheckBox
            style={styles.styleCheckBox}
            tintColors={{
              true: colors.lightRed,
              false: colors.lightRed,
            }}
            value={checked}
          />
          <View style={styles.boxTextRow}>
            <Text style={styles.txtTitle}>Art</Text>
          </View>
        </ImageBackground>
      </View>
    </TouchableOpacity>
  )
}

const makeStyles = (colors) =>
  StyleSheet.create({
    txtTitle: {
      color: "white",
      alignSelf: "flex-end",
      margin: 15,
      fontFamily: fonts.bold,
    },
    boxTextRow: {flex: 1, flexDirection: "row"},
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
