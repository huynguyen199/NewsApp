import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from "react-native"
import React from "react"
import CheckBox from "@react-native-community/checkbox"
import {useTheme} from "@react-navigation/native"
import fonts from "@assets/fonts"

const TopicItem = ({
  item,
  setSelectCategory,
  selectCategory,
  hideCategoryModal,
  setValue,
}) => {
  const {colors} = useTheme()
  const styles = makeStyles(colors)

  const onToggleCheckbox = () => {
    setSelectCategory(item)
    setValue("category", item.name)
    hideCategoryModal()
  }

  return (
    <TouchableOpacity onPress={onToggleCheckbox}>
      <View style={styles.container}>
        <ImageBackground
          imageStyle={styles.imageStyle}
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
            value={selectCategory.id === item.id}
          />
          <View style={styles.boxTextRow}>
            <Text style={styles.txtTitle}>{item.name}</Text>
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