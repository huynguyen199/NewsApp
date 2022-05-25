import {useEffect} from "react"
import auth from "@react-native-firebase/auth"
import {useState} from "react"

const useAuth = () => {
  const [userInfo, setUserInfo] = useState(null)

  function onAuthStateChanged(value) {
    setUserInfo(value)
  }
  function getCurrentUserInfo() {
    const subscriber = auth().onAuthStateChanged()
    return subscriber
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged)
    return subscriber // unsubscribe on unmount
  }, [])
  return {userInfo, getCurrentUserInfo}
}

export default useAuth
