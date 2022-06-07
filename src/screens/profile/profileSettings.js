import React, {useRef} from "react"
import {ScrollView, StyleSheet, Text, View} from "react-native"
import {useNavigation, useTheme} from "@react-navigation/native"

import Button from "@components/button"
import Header from "../../components/header"
import {Icon} from "@rneui/themed"
import {Ionicons} from "@common/icon"
import LeftComponent from "./components/profileSettings/leftComponent"
import {Modalize} from "react-native-modalize"
import SettingItem from "./components/profileSettings/settingItem"
import auth from "@react-native-firebase/auth"
import fonts from "../../assets/fonts"
import {mainStack} from "@common/navigator"

const ProfileSettings = () => {
  const {colors} = useTheme()
  const logoutModalizeRef = useRef(null)
  const navigation = useNavigation()
  const styles = makeStyles(colors)

  const showLogoutModal = () => {
    logoutModalizeRef.current?.open()
  }
  const hideLogoutModal = () => {
    logoutModalizeRef.current?.close()
  }

  const onMoveEditProfile = () => {
    navigation.navigate(mainStack.editProfile)
  }

  const onMoveAppearance = () => {
    navigation.navigate(mainStack.appearance)
  }

  const onSignout = () => {
    auth()
      .signOut()
      .then(() => {
        navigation.goBack()
      })
  }

  return (
    <>
      <Modalize
        handlePosition={"inside"}
        modalHeight={200}
        modalStyle={styles.modalStyle}
        ref={logoutModalizeRef}>
        <View style={styles.modalContainer}>
          <Icon
            style={styles.iconStyle}
            name={Ionicons.logoutOutline}
            type="ionicon"
            color={colors.lightRed}
            solid={true}
            size={50}
          />
          <Text style={styles.txtTitle}>Are you sure you want to logout?</Text>
          <View style={styles.boxRowButton}>
            <Button
              containerStyle={styles.btnCancel}
              onPress={hideLogoutModal}
              textStyle={{color: colors.lightRed}}
              title="Cancel"
            />
            <Button
              onPress={onSignout}
              containerStyle={styles.yesStyleBtn}
              title="Yes, Logout"
              textStyle={styles.textYesStyle}
            />
          </View>
        </View>
      </Modalize>
      <ScrollView style={styles.container}>
        <View style={styles.containerHorizontal}>
          <Header
            leftComponent={<LeftComponent />}
            backgroundColor={colors.white}
          />

          <SettingItem
            onPress={onMoveEditProfile}
            nameIcon={Ionicons.person}
            title={"Edit Profile"}
          />
          <SettingItem
            nameIcon={Ionicons.notifications}
            title={"Notification"}
          />
          <SettingItem nameIcon={Ionicons.lockClosed} title={"Security"} />
          <SettingItem
            onPress={onMoveAppearance}
            nameIcon={Ionicons.eyeFilled}
            title={"Appearance"}
          />
          <SettingItem nameIcon={Ionicons.alertCircle} title={"Help"} />
          <SettingItem nameIcon={Ionicons.people} title={"Invite Friends"} />
          <SettingItem
            nameIcon={Ionicons.logoutOutline}
            title={"Logout"}
            hasIconRight={false}
            onPress={showLogoutModal}
          />
        </View>
        {/* <Portal> */}

        {/* </Portal> */}
      </ScrollView>
    </>
  )
}

const makeStyles = (colors) =>
  StyleSheet.create({
    modalStyle: {borderTopLeftRadius: 30, borderTopRightRadius: 30},
    textYesStyle: {color: "white"},
    yesStyleBtn: {width: 170},
    btnCancel: {
      width: 170,
      backgroundColor: colors.white,
      borderWidth: 2,
      borderColor: colors.lightRed,
    },
    boxRowButton: {
      flexDirection: "row",
      justifyContent: "space-around",
      width: "100%",
      position: "absolute",
      bottom: 20,
    },
    txtTitle: {
      fontFamily: fonts.bold,
      color: colors.black,
      fontSize: 16,
      marginTop: 10,
    },
    iconStyle: {marginTop: 20},
    modalContainer: {
      alignItems: "center",
      height: 200,
      backgroundColor: colors.white,
      borderColor: "white",
      borderWidth: 1,
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
    },
    containerHorizontal: {
      marginHorizontal: 10,
    },
    container: {flex: 1, backgroundColor: colors.white},
  })

export default ProfileSettings
