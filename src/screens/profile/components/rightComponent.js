import {View, StyleSheet} from "react-native"
import React from "react"
import {Icon} from "@rneui/themed"
import {useTheme} from "@react-navigation/native"
import {Ionicons, FontAwesome} from "@common/icon"

const RightComponent = () => {
  const {colors} = useTheme()
  const styles = makeStyles(colors)
  return (
    <View style={styles.container}>
      <View style={styles.boxEdit}>
        <Icon
          // onPress={onGoBackHome}
          name={FontAwesome.pencil}
          type="font-awesome"
          color={colors.lightRed}
          size={20}
        />
      </View>
      <View
        style={{
          backgroundColor: "rgba(252, 50, 50, 0.09)",
          padding: 10,
          borderRadius: 5,
          marginLeft: 10,
        }}>
        <Icon
          // onPress={onGoBackHome}
          name={Ionicons.settings}
          type="ionicon"
          color={colors.lightRed}
          size={20}
        />
      </View>
    </View>
  )
}

const makeStyles = (colors) =>
  StyleSheet.create({
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
      marginLeft: -100,
    },
  })
export default RightComponent
