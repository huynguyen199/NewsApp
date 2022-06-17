/**
 * @format
 */

import App from "./App"
import {AppRegistry} from "react-native"
import OneSignal from "react-native-onesignal"
import {name as appName} from "./app.json"

//OneSignal Init Code
OneSignal.setLogLevel(6, 0)
OneSignal.setAppId("98c86d56-515e-43b2-9bd1-7aeaf49c8fe3")

// OneSignal.setEmail("huynguyen321@gmail.com")
// OneSignal.sendTag("test", "321312213")

//END OneSignal Init Code
// let externalUserId = "98c86d56-515e-43b2-9bd1-7aeaf49c8fe3" // You will supply the external user id to the OneSignal SDK
// OneSignal.setExternalUserId(externalUserId)
//Prompt for push on iOS
OneSignal.promptForPushNotificationsWithUserResponse((response) => {})

//Method for handling notifications received while app in foreground
OneSignal.setNotificationWillShowInForegroundHandler(
  (notificationReceivedEvent) => {
    let notification = notificationReceivedEvent.getNotification()
    // Complete with null means don't show a notification.
    notificationReceivedEvent.complete(notification)
  },
)

//Method for handling notifications opened
OneSignal.setNotificationOpenedHandler((notification) => {})

AppRegistry.registerComponent(appName, () => App)
