import {View, Dimensions} from "react-native"
import React from "react"
import Lottie from "lottie-react-native"
import assets from "@assets"
const {width} = Dimensions.get("window")

const ListEmptyComponent = () => {
  return (
    <View style={{width, height: width}}>
      <Lottie
        source={assets.lottieFiles.notFound}
        autoPlay={true}
        loop={false}
      />
    </View>
  )
}

export default ListEmptyComponent
