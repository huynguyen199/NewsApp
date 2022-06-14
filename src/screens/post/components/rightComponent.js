import {StyleSheet, TouchableOpacity, View} from "react-native"
import {useNavigation, useTheme} from "@react-navigation/native"

import {Icon} from "@rneui/themed"
import {Material} from "@common/icon"
import React from "react"
import {mainStack} from "@common/navigator"

const RightComponent = () => {
  const {colors} = useTheme()
  const navigation = useNavigation()
  const styles = makeStyles(colors)

  const onMoveCreateNews = () => {
    navigation.navigate(mainStack.createNews, {})
  }
  return (
    <TouchableOpacity onPress={onMoveCreateNews}>
      <View style={styles.container}>
        <View style={styles.boxNotify}>
          <Icon
            // onPress={onGoBackHome}
            name={Material.add}
            type="material"
            color={colors.lightRed}
            size={20}
          />
        </View>
      </View>
    </TouchableOpacity>
  )
}

const makeStyles = (colors) =>
  StyleSheet.create({
    boxNotify: {
      backgroundColor: "rgba(252, 50, 50, 0.09)",
      padding: 10,
      borderRadius: 5,
    },
    container: {
      alignItems: "center",
      justifyContent: "center",
      marginRight: 10,
    },
  })
export default RightComponent
