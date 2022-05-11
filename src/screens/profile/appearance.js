import {View, StyleSheet, Text, Switch} from "react-native"
import React, {useContext} from "react"
import Header from "@components/header"
import fonts from "@assets/fonts"
import {useTheme} from "@react-navigation/native"
import LeftComponent from "./components/appearance/leftComponent"
import {HomeContext} from "@context/home"

const Appearance = () => {
  const {colors} = useTheme()
  const styles = makeStyles(colors)
  const {darkScheme, setDarkScheme} = useContext(HomeContext)

  const toggleSwitch = () => {
    setDarkScheme((previousState) => !previousState)
  }

  return (
    <View style={styles.container}>
      <Header
        // containerStyle={{marginTop: 10}}
        leftComponent={<LeftComponent />}
        // rightComponent={<RightComponent />}
      />
      <View style={styles.boxMargin}>
        <View style={styles.boxRow}>
          <Text style={styles.txtTitle}>Dark Mode</Text>
          <Switch
            trackColor={{false: colors.grey, true: colors.red}}
            thumbColor={colors.white}
            onValueChange={toggleSwitch}
            value={darkScheme}
          />
        </View>
      </View>
    </View>
  )
}

const makeStyles = (colors) =>
  StyleSheet.create({
    boxMargin: {marginHorizontal: 10},
    txtTitle: {color: colors.black, fontFamily: fonts.bold, fontSize: 16},
    boxRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 20,
    },
    container: {flex: 1, marginTop: 30, backgroundColor: "white"},
    imageChildStyle: {
      width: 20,
      height: 20,
      position: "absolute",
      bottom: 5,
      right: 5,
      borderRadius: 20,
    },
    imageStyle: {borderRadius: 120 / 2},
    styleBackground: {width: 120, height: 120},
    boxInfo: {
      justifyContent: "center",
      alignItems: "center",
      marginTop: 20,
    },
  })

export default Appearance
