import {useEffect} from "react"
import auth from "@react-native-firebase/auth"
import {useState} from "react"

const useAuth = () => {
  const [userInfo, setUserInfo] = useState(null)
  function onAuthStateChanged(user) {
    setUserInfo(user)
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged)
    return subscriber // unsubscribe on unmount
  }, [])
  return {userInfo}
}

export default useAuth
