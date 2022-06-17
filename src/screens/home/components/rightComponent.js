import {StyleSheet, TouchableOpacity, View} from "react-native"
import {useNavigation, useTheme} from "@react-navigation/native"

import {Icon} from "@rneui/themed"
import {Ionicons} from "@common/icon"
import React from "react"
import Toast from "react-native-toast-message"
import auth from "@react-native-firebase/auth"
import {mainStack} from "@common/navigator"

const RightComponent = () => {
  const {colors} = useTheme()
  const styles = makeStyles(colors)
  const navigation = useNavigation()

  const onMoveSearchRss = () => {
    if (auth().currentUser) {
      navigation.navigate(mainStack.searchRss)
    } else {
      Toast.show({
        type: "trashToast",
        text1: "You are not logged in",
        text2: Ionicons.person,
        position: "bottom",
      })
    }
  }
  return (
    <View style={styles.container}>
      {auth().currentUser && (
        <TouchableOpacity onPress={onMoveSearchRss}>
          <View style={styles.boxNotify}>
            <Icon
              // onPress={onGoBackHome}
              name={Ionicons.addOutline}
              type="ionicon"
              color={colors.lightRed}
              size={20}
            />
          </View>
        </TouchableOpacity>
      )}
    </View>
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
