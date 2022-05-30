import {View, Dimensions, StyleSheet} from "react-native"
import React from "react"
import Lottie from "lottie-react-native"
import assets from "@assets"
const {width} = Dimensions.get("window")

const ListEmpty = () => {
  return (
    <View style={styles.container}>
      <Lottie
        style={styles.lottieStyle}
        source={assets.lottieFiles.empty}
        autoPlay={true}
        loop={false}
      />
    </View>
  )
}
const styles = StyleSheet.create({
  lottieStyle: {marginTop: 60},
  container: {
    width,
    height: width,
  },
})

export default ListEmpty
