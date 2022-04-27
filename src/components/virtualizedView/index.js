import {FlatList} from "react-native"
import React from "react"

const VirtualizedView = ({children}) => {
  return (
    <FlatList
      data={[]}
      ListEmptyComponent={null}
      keyExtractor={() => "dummy"}
      renderItem={null}
      ListHeaderComponent={() => <>{children}</>}
    />
  )
}

export default VirtualizedView
