import {View, StyleSheet, StatusBar} from "react-native"
import React, {useState} from "react"
import {useTheme} from "@react-navigation/native"
import LeftComponent from "./components/detail/leftComponent"
import RightComponent from "./components/detail/rightComponent"
import InfoContainer from "./components/detail/infoContainer"
import Header from "@components/header"

const Detail = () => {
  const {colors} = useTheme()
  const styles = makeStyles(colors)
  const [loading, setLoading] = useState(true)
  return (
    <View style={styles.container}>
      <StatusBar animated={true} backgroundColor={colors.white} />
      <Header
        leftComponent={<LeftComponent />}
        rightComponent={<RightComponent />}
        containerStyle={styles.containerStyleHeader}
        backgroundColor={colors.white}
      />
      <InfoContainer loading={loading} setLoading={setLoading} />
    </View>
  )
}
const makeStyles = (colors) =>
  StyleSheet.create({
    containerStyleHeader: {
      borderBottomWidth: 0,
      marginHorizontal: 10,
      marginVertical: 2,
    },
    container: {flex: 1, backgroundColor: colors.white},
  })

export default Detail
