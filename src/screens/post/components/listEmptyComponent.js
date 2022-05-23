import {View, Dimensions, StyleSheet} from "react-native"
import React from "react"
import Lottie from "lottie-react-native"
import assets from "@assets"

const {height} = Dimensions.get("window")

const ListEmptyComponent = () => {
  return (
    <View style={styles.container}>
      <Lottie
        style={styles.lottieStyle}
        source={assets.lottieFiles.empty}
        autoPlay={false}
        loop={false}
      />
    </View>
  )
}

export default ListEmptyComponent

const styles = StyleSheet.create({
  lottieStyle: {
    width: 200,
    height: 200,
  },
  container: {
    marginTop: 10,
    height: height / 1.5,
    justifyContent: "center",
    alignItems: "center",
  },
})
