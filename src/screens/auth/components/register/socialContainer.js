import {View, StyleSheet} from "react-native"
import React from "react"
import SocicalButton from "../../../components/socicalButton.js"
import {useTheme} from "@react-navigation/native"

const SocialContainer = () => {
  const {colors} = useTheme()
  const styles = makeStyles(colors)
  return (
    <View style={styles.container}>
      <SocicalButton
        uri={
          "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Facebook_f_logo_%282019%29.svg/800px-Facebook_f_logo_%282019%29.svg.png"
        }
        containerStyle={styles.containerStyleFb}
      />
      <SocicalButton
        uri={
          "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/1200px-Google_%22G%22_Logo.svg.png"
        }
        containerStyle={styles.containerStyleGg}
      />
    </View>
  )
}

const makeStyles = (colors) =>
  StyleSheet.create({
    containerStyleGg: {marginLeft: 10},
    containerStyleFb: {marginRight: 10},
    container: {
      flexDirection: "row",
    },
  })

export default SocialContainer
