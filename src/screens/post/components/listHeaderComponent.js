import {View, FlatList, StyleSheet} from "react-native"
import React from "react"
import CategoryItem from "./categoryItem"
import Header from "@components/header"
import SearchContainer from "./searchContainer"
import LeftComponent from "./leftComponent"
import RightComponent from "./rightComponent"

const ListHeaderComponent = ({
  categories,
  selectCategoryId,
  setNews,
  setLastDocument,
  setSelectCategoryId,
  search,
  setSearch,
  setDuplicateNews,
  duplicateNews,
}) => {
  const renderCategoryItem = ({item}) => (
    <CategoryItem
      selectCategoryId={selectCategoryId}
      setNews={setNews}
      setDuplicateNews={setDuplicateNews}
      setSelectCategoryId={setSelectCategoryId}
      item={item}
      setLastDocument={setLastDocument}
    />
  )

  return (
    <>
      <Header
        containerStyle={styles.containerStyleHeader}
        leftComponent={<LeftComponent />}
        rightComponent={<RightComponent />}
      />
      <SearchContainer
        duplicateNews={duplicateNews}
        setNews={setNews}
        search={search}
        setSearch={setSearch}
      />
      {/* <ScrollView horizontal showsHorizontalScrollIndicator={false}> */}
      <View style={styles.container}>
        <FlatList
          data={categories}
          horizontal
          showsHorizontalScrollIndicator={false}
          ListHeaderComponent={
            <CategoryItem
              selectCategoryId={selectCategoryId}
              setNews={setNews}
              setDuplicateNews={setDuplicateNews}
              setLastDocument={setLastDocument}
              setSelectCategoryId={setSelectCategoryId}
              item={{name: "All", id: "all"}}
            />
          }
          renderItem={renderCategoryItem}
          keyExtractor={(item) => item.id}
        />
      </View>
      {/* </ScrollView> */}
    </>
  )
}

const styles = StyleSheet.create({
  container: {marginTop: 10},
  containerStyleHeader: {marginTop: 10, backgroundColor: null},
})

export default ListHeaderComponent
