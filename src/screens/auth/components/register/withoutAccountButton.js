import {View, Text, StyleSheet} from "react-native"
import React from "react"
import {useTheme} from "@react-navigation/native"

const WithoutAccountButton = () => {
  const {colors} = useTheme()
  const styles = makeStyles(colors)
  return (
    <View style={styles.container}>
      <Text style={styles.txtTitle}>
        already have an account? <Text style={styles.txtSignIn}>Sign in</Text>
      </Text>
    </View>
  )
}
const makeStyles = (colors) =>
  StyleSheet.create({
    txtSignIn: {
      fontFamily: "SourceSansPro-Bold",
      color: "rgba(253,64,94,255)",
    },
    txtTitle: {
      fontFamily: "SourceSansPro-Regular",
      color: "black",
    },
    container: {
      marginTop: 20,
      justifyContent: "center",
      alignItems: "center",
    },
  })
export default WithoutAccountButton
