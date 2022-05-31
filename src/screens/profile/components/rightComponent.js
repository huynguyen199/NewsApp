import {View, StyleSheet, TouchableOpacity} from "react-native"
import React from "react"
import {Icon} from "@rneui/themed"
import {useNavigation, useTheme} from "@react-navigation/native"
import {Ionicons} from "@common/icon"
import {mainStack} from "@common/navigator"

const RightComponent = () => {
  const {colors} = useTheme()
  const styles = makeStyles(colors)
  const navigation = useNavigation()

  const onMoveProfileSettings = () => {
    navigation.navigate(mainStack.profileSettings)
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onMoveProfileSettings}>
        <View style={styles.boxSettings}>
          <Icon
            name={Ionicons.settings}
            type="ionicon"
            color={colors.lightRed}
            size={20}
          />
        </View>
      </TouchableOpacity>
    </View>
  )
}

const makeStyles = (colors) =>
  StyleSheet.create({
    boxSettings: {
      backgroundColor: "rgba(252, 50, 50, 0.09)",
      padding: 10,
      borderRadius: 5,
      marginLeft: 10,
    },
    boxEdit: {
      backgroundColor: "rgba(252, 50, 50, 0.09)",
      padding: 10,
      borderRadius: 5,
    },
    container: {
      alignItems: "center",
      justifyContent: "center",
      marginRight: 10,
      flexDirection: "row",
    },
  })
export default RightComponent
