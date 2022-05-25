// Components
import {View, Text, ScrollView, Dimensions, StyleSheet} from "react-native"
import React, {useEffect, useRef, useState} from "react"
import Header from "@components/header"
import LeftComponent from "./components/createNews/leftComponent"
import {useNavigation, useRoute, useTheme} from "@react-navigation/native"
import fonts from "@assets/fonts"
import {Divider} from "@rneui/themed"
import TitleContainer from "./components/createNews/titleContainer"
import {useForm} from "react-hook-form"
import Button from "@components/button"
import CategoryContainer from "./components/createNews/categoryContainer"
import ContentContainer from "./components/createNews/contentContainer"
import TagsContainer from "./components/createNews/tagsContainer"
import SelectedPhotoBox from "./components/createNews/selectedPhotoBox"
import PhotoBox from "./components/createNews/photoBox"
import SuccessDialog from "@components/successDialog"
import FailedDialog from "@components/failedDialog"
import TopicItem from "./components/createNews/topicItem"
import {Modalize} from "react-native-modalize"
import {launchImageLibrary} from "react-native-image-picker"
import LoadingDialog from "@components/loadingDialog"
import {homeTabs} from "@common/navigator"
// Services

import {findCategoryById, getALlCategory} from "@services/category"
import {getImageByFileName, uploadImageByUri} from "@services/image"
import {addPost, findPostById, updatePost} from "@services/post"
import useAuth from "../../hooks/useAuth"
import {findUserById} from "../../services/user"

const {width, height} = Dimensions.get("window")

const CreateNews = () => {
  const route = useRoute()
  const {articleId} = route.params

  const {colors} = useTheme()
  const styles = makeStyles(colors)
  const categoryRef = useRef(null)
  const [image, setImage] = useState({
    uri: "",
    fileName: null,
  })

  const [categories, setCategories] = useState([])
  const [tags, setTags] = useState([])
  const [selectCategory, setSelectCategory] = useState({})
  const [dialog, setDialog] = useState({
    isLoading: false,
    isSuccess: false,
    isFailed: false,
    isNoPhoto: false,
  })
  const {userInfo} = useAuth()
  const {
    handleSubmit,
    control,
    setValue,
    formState: {errors},
  } = useForm({
    defaultValues: {
      content: "",
      title: "",
      category: "",
    },
  })
  const navigation = useNavigation()
  const renderItem = ({item}) => (
    <TopicItem
      setSelectCategory={setSelectCategory}
      selectCategory={selectCategory}
      hideCategoryModal={hideCategoryModal}
      item={item}
      setValue={setValue}
    />
  )

  useEffect(() => {
    fillData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [articleId])

  useEffect(() => {
    fetchCategory()
  }, [])

  const fillData = async () => {
    if (articleId) {
      showLoading()
      const post = await findPostById(articleId)
      const category = await findCategoryById(post.categoryId)
      setSelectCategory(category)
      setValue("title", post.title)
      setValue("category", category.name)
      setValue("content", post.content)
      setImage({
        uri: post.urlToImage,
        fileName: "imageAdded",
      })
      setTags(post.tags)
      hideLoading()
    }
  }

  const showCategoryModal = () => {
    categoryRef.current?.open()
  }
  const hideCategoryModal = () => {
    categoryRef.current?.close()
  }

  const onSubmitForm = async (data) => {
    articleId ? updateNews(data) : await postNews(data)
  }

  const updateNews = async (data) => {
    if (image.fileName === "imageAdded") {
      const providerData = userInfo._user.providerData[0]
      const user = await findUserById(providerData.uid)

      showLoading()
      const newsData = {
        content: data.content,
        tags: tags,
        title: data.title,
        publishedAt: new Date(),
        userId: user.id,
        categoryId: selectCategory.id,
      }

      return await updatePost(articleId, newsData).then(() => {
        hideLoading()
        showSuccess()
      })
    }
    const photoUrl = await uploadImage()
    if (photoUrl) {
      showLoading()
      const newsData = {
        content: data.content,
        tags: tags,
        title: data.title,
        urlToImage: photoUrl,
        publishedAt: new Date(),
        userId: "102460885791282",
        categoryId: selectCategory.id,
      }
      return updatePost(articleId, newsData).then(() => {
        hideLoading()
        showSuccess()
      })
    } else {
      hideLoading()
      return showPhotoFailed()
    }
  }

  const postNews = async (data) => {
    showLoading()
    const photoUrl = await uploadImage()
    if (photoUrl) {
      const providerData = userInfo._user.providerData[0]
      const user = await findUserById(providerData.uid)

      const newsData = {
        content: data.content,
        tags: tags,
        title: data.title,
        urlToImage: photoUrl,
        publishedAt: new Date(),
        userId: user.id,
        categoryId: selectCategory.id,
      }

      await addPost(newsData).then(() => {
        hideLoading()
        showSuccess()
      })
    } else {
      hideLoading()
      return showPhotoFailed()
    }
  }

  const showLoading = () => {
    setDialog((prev) => ({...prev, isLoading: true}))
  }

  const hideLoading = () => {
    setDialog((prev) => ({...prev, isLoading: false}))
  }

  const showPhotoFailed = () => {
    setDialog((prev) => ({...prev, isNoPhoto: true}))
  }

  const hidePhotoFailed = () => {
    setDialog((prev) => ({...prev, isNoPhoto: false}))
  }

  const showSuccess = () => {
    setDialog((prev) => ({...prev, isSuccess: true}))
  }

  const hideSuccess = () => {
    setDialog((prev) => ({...prev, isSuccess: false}))
  }

  const uploadImage = async () => {
    if (image.fileName === null) {
      return null
    }
    const task = await uploadImageByUri(image.uri, image.fileName)
    const fileName = task.metadata.fullPath
    const uri = await getImageByFileName(fileName)
    return uri
  }

  const fetchCategory = async () => {
    const data = await getALlCategory()
    setCategories(data)
  }

  const onChooseImage = async () => {
    const res = await launchImageLibrary()
    const {uri, fileName} = getImages(res)
    setImage({uri, fileName})
  }

  const getImages = (res) => {
    const uri = res.assets[0].uri
    const fileName = res.assets[0].fileName
    return {uri, fileName}
  }

  const onMoveMyPost = () => {
    hideSuccess()
    navigation.navigate(homeTabs.myNews)
  }

  return (
    <View style={styles.container}>
      <Header
        containerStyle={styles.containerStyleHeader}
        leftComponent={<LeftComponent articleId={articleId} />}
      />
      <View style={styles.headerContainer}>
        <ScrollView>
          <View style={styles.boxMarginForm}>
            {image.fileName !== null ? (
              <SelectedPhotoBox onPress={onChooseImage} image={image} />
            ) : (
              <PhotoBox onPress={onChooseImage} />
            )}

            <Divider
              width={1}
              color={colors.whiteSmoke}
              style={styles.dividerStyle}
            />
            <Text style={styles.txtTitle}>News Details</Text>
            <TitleContainer errors={errors} control={control} />
            <CategoryContainer
              selectCategory={selectCategory}
              onPress={showCategoryModal}
              errors={errors}
              control={control}
            />
            <ContentContainer errors={errors} control={control} />
            <TagsContainer
              tags={tags}
              setTags={setTags}
              errors={errors}
              control={control}
            />
          </View>
        </ScrollView>
      </View>
      {/* bottom */}
      <View style={styles.bottomContainer}>
        <Button
          onPress={handleSubmit(onSubmitForm)}
          containerStyle={{width: width - 30}}
          title={articleId ? "Update Now" : "Publish Now"}
        />
      </View>
      <Modalize
        handlePosition={"inside"}
        modalHeight={height - 50}
        modalStyle={styles.categoryModalStyle}
        // rootStyle={{alignItems: "center"}}
        ref={categoryRef}
        flatListProps={{
          data: categories,
          renderItem: renderItem,
          keyExtractor: (item) => item.id,
          showsVerticalScrollIndicator: false,
          numColumns: 2,
          style: {marginTop: 20},
        }}
      />
      <LoadingDialog
        onBackdropPress={hideLoading}
        isVisible={dialog.isLoading}
      />
      <SuccessDialog
        title="Added successfully"
        isVisible={dialog.isSuccess}
        onBackdropPress={hideSuccess}
        titleButton="See article"
        onPress={onMoveMyPost}
      />
      <FailedDialog
        isVisible={dialog.isNoPhoto}
        onBackdropPress={hidePhotoFailed}
        onPress={hidePhotoFailed}
        title="You have not selected a photo"
      />
    </View>
  )
}

const makeStyles = (colors) =>
  StyleSheet.create({
    headerContainer: {flex: 0.85},
    dividerStyle: {marginVertical: 20},
    boxMarginForm: {marginHorizontal: 10},
    containerStyleHeader: {marginVertical: 10},
    txtTitle: {
      fontSize: 20,
      fontFamily: fonts.bold,
      color: colors.black,
    },
    categoryModalStyle: {alignItems: "center"},
    bottomContainer: {
      flex: 0.15,
      backgroundColor: colors.white,
      borderWidth: 2,
      borderColor: colors.whiteSmoke,
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      alignItems: "center",
      justifyContent: "center",
    },
    container: {flex: 1, backgroundColor: "white"},
  })
export default CreateNews
