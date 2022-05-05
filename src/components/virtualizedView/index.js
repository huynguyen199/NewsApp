import {FlatList, StyleSheet} from "react-native"
import React from "react"
import {useTheme} from "@react-navigation/native"

const VirtualizedView = ({children}) => {
  const {colors} = useTheme()
  const styles = makeStyles(colors)
  return (
    <FlatList
      data={[]}
      style={styles.containerStyle}
      ListEmptyComponent={null}
      keyExtractor={() => "dummy"}
      renderItem={null}
      ListHeaderComponent={() => <>{children}</>}
    />
  )
}

const makeStyles = (colors) =>
  StyleSheet.create({
    containerStyle: {backgroundColor: colors.white},
  })
export default VirtualizedView
