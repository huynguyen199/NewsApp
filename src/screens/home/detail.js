import {View, StyleSheet, ScrollView} from "react-native"
import React from "react"
import {Header} from "@rneui/themed"
import {useTheme} from "@react-navigation/native"
import LeftComponent from "./components/detail/leftComponent"
import RightComponent from "./components/detail/rightComponent"
import InfoContainer from "./components/detail/infoContainer"

const Detail = () => {
  const {colors} = useTheme()
  const styles = makeStyles(colors)
  return (
    <View style={styles.container}>
      <Header
        leftComponent={<LeftComponent />}
        rightComponent={<RightComponent />}
        containerStyle={styles.containerStyleHeader}
        backgroundColor={colors.white}
      />
      <ScrollView>
        <InfoContainer />
      </ScrollView>
    </View>
  )
}
const makeStyles = (colors) =>
  StyleSheet.create({
    containerStyleHeader: {borderBottomWidth: 0},
    container: {flex: 1, backgroundColor: colors.white},
  })

export default Detail
