import {View, Text, StyleSheet, ImageBackground, Image} from "react-native"
import React from "react"
import Header from "@components/header"
import LeftComponent from "./components/leftComponent"
import RightComponent from "./components/rightComponent"
import {useTheme} from "@react-navigation/native"
import fonts from "@assets/fonts"
import Button from "@components/button"
import {Divider} from "@rneui/themed"
import {Ionicons} from "@common/icon"

const image = {uri: "https://reactjs.org/logo-og.png"}
const Profile = () => {
  const {colors} = useTheme()
  const styles = makeStyles(colors)
  return (
    <View style={styles.container}>
      <View style={styles.boxMargin}>
        <Header
          containerStyle={{marginTop: 10}}
          leftComponent={<LeftComponent />}
          rightComponent={<RightComponent />}
        />
        <View style={styles.boxInfo}>
          <ImageBackground
            source={image}
            imageStyle={styles.imageStyle}
            style={styles.styleBackground}>
            <Image
              style={styles.imageChildStyle}
              source={{
                uri: "https://reactnative.dev/img/tiny_logo.png",
              }}
            />
          </ImageBackground>
          <Text style={styles.txtTitle}>My Name</Text>
          <Text style={styles.styleContent}>
            dsasadddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
          </Text>
        </View>
        {/* info  profile */}
        <View style={styles.boxRowProfile}>
          <View style={styles.leftProfile}>
            <View>
              <Text style={styles.txtNumberNews}>dsa</Text>
              <Text style={styles.txtNews}>news</Text>
            </View>
          </View>

          <View style={styles.boxCenter}>
            <Text style={styles.txtNumberFollower}>dsa</Text>
            <Text style={styles.txtFollower}>news</Text>
          </View>
          <View style={styles.boxRight}>
            <Text style={styles.txtNumOfFollowing}>dsa</Text>
            <Text style={styles.txtFollowing}>news</Text>
          </View>
        </View>
        <Divider style={{marginTop: 20}} />
        <Button
          title="Website"
          leftIcon={Ionicons.globe}
          containerStyle={styles.containerStyleButton}
          textStyle={{color: colors.lightRed}}
        />
        {/* info  profile */}
      </View>
    </View>
  )
}

const makeStyles = (colors) =>
  StyleSheet.create({
    containerStyleButton: {
      marginTop: 40,
      backgroundColor: "white",
      borderWidth: 2,
      borderColor: colors.red,
    },
    txtFollowing: {
      marginTop: 10,
      fontFamily: fonts.regular,
      color: "black",
    },
    txtNumOfFollowing: {fontFamily: fonts.bold, fontSize: 24, color: "black"},
    boxRight: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: 10,
    },
    txtFollower: {
      marginTop: 10,
      fontFamily: fonts.regular,
      color: "black",
    },
    txtNumberFollower: {fontFamily: fonts.bold, fontSize: 24, color: "black"},
    boxCenter: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: 10,
      borderRightWidth: 1,
      borderColor: colors.lightGrey,
    },
    txtNews: {marginTop: 10, fontFamily: fonts.regular},
    txtNumberNews: {fontFamily: fonts.bold, fontSize: 24, color: "black"},
    leftProfile: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: 10,
      borderRightWidth: 1,
      borderColor: colors.lightGrey,
    },
    boxRowProfile: {
      flexDirection: "row",
      marginHorizontal: 10,
      padding: 10,
      marginTop: 10,
    },
    styleContent: {
      textAlign: "center",
      marginTop: 10,
      fontFamily: fonts.regular,
    },
    txtTitle: {
      color: "black",
      fontFamily: fonts.bold,
      fontSize: 24,
    },
    imageChildStyle: {
      width: 20,
      height: 20,
      position: "absolute",
      bottom: 5,
      right: 5,
    },
    imageStyle: {borderRadius: 130 / 2},
    styleBackground: {width: 130, height: 130},
    boxInfo: {
      justifyContent: "center",
      alignItems: "center",
      marginTop: 20,
    },
    boxMargin: {marginHorizontal: 5},
    container: {flex: 1, backgroundColor: "white"},
  })

export default Profile
