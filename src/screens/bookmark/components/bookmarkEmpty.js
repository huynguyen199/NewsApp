import {View, Text, StyleSheet} from "react-native"
import React from "react"
import Header from "@components/header"
import LeftComponent from "./leftComponent"
import {useNavigation, useTheme} from "@react-navigation/native"
import {Ionicons} from "@common/icon"
import {Icon} from "@rneui/themed"
import fonts from "@assets/fonts"
import Button from "@components/button"
import {homeTabs} from "@common/navigator"

const BookmarkEmpty = () => {
  const {colors} = useTheme()
  const styles = makeStyles(colors)
  const navigation = useNavigation()

  const onMoveHome = () => {
    navigation.navigate(homeTabs.home)
  }

  return (
    <View style={styles.container}>
      <Header
        containerStyle={styles.containerStyleHeader}
        leftComponent={<LeftComponent />}
      />
      <View style={styles.containerTop}>
        <View style={styles.boxIcon}>
          <Icon
            name={Ionicons.bookmark}
            type="ionicon"
            color={colors.white}
            solid={true}
            size={80}
          />
        </View>
        <Text style={styles.txtTitle}>You have no bookmarked news</Text>
      </View>
      <Button
        onPress={onMoveHome}
        containerStyle={styles.buttonContainerStyle}
        title="Explore News"
      />
    </View>
  )
}
const makeStyles = (colors) =>
  StyleSheet.create({
    buttonContainerStyle: {
      margin: 20,
    },
    txtTitle: {
      fontFamily: fonts.bold,
      color: colors.lightRed,
      fontSize: 20,
      marginTop: 30,
    },
    boxIcon: {
      backgroundColor: colors.lightRed,
      borderRadius: 200 / 2,
      padding: 30,
    },
    containerTop: {
      flex: 1,
      // backgroundColor: "blue",
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 40,
    },
    container: {
      flex: 1,
      backgroundColor: colors.white,
    },
    containerStyleHeader: {marginTop: 10, backgroundColor: null},
  })

export default BookmarkEmpty
