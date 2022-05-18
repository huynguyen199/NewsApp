import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native"
import React from "react"
import {useTheme} from "@react-navigation/native"
import Input from "@components/input"
import {Controller} from "react-hook-form"
import fonts from "@assets/fonts"
import TagItem from "./tagItem"

const TagsContainer = ({control, errors, tags, setTags}) => {
  const {colors} = useTheme()
  const styles = makeStyles(colors)

  const onAddTags = (tag) => {
    setTags((prev) => [...prev, tag])
  }

  return (
    <View style={styles.container}>
      <Text style={styles.txtTitle}>
        Add Tags (optional)<Text style={styles.txtAsterisk}>*</Text>
      </Text>
      <Controller
        control={control}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            value={value}
            onChangeText={onChange}
            placeholder={"Tag"}
            containerStyle={styles.inputContainerStyle}
            rightComponent={
              value?.length > 0 && (
                <TouchableOpacity
                  onPress={() => onAddTags(value)}
                  style={styles.btnStyle}>
                  <Text style={styles.txtOk}>Ok</Text>
                </TouchableOpacity>
              )
            }
          />
        )}
        name="tags"
        // rules={emailContraints}
      />
      <ScrollView
        horizontal
        style={styles.listStyle}
        showsHorizontalScrollIndicator={false}>
        {tags.map((item, i) => (
          <TagItem key={i} item={item} tags={tags} setTags={setTags} />
        ))}
      </ScrollView>
    </View>
  )
}

const makeStyles = (colors) =>
  StyleSheet.create({
    listStyle: {marginVertical: 20},
    txtOk: {color: colors.white, fontFamily: fonts.bold},
    btnStyle: {
      backgroundColor: colors.lightRed,
      padding: 8,
      borderRadius: 10,
    },
    txtAsterisk: {color: colors.red},
    container: {marginTop: 5},
    errorContainerStyle: {marginVertical: 10},
    inputContainerStyle: {marginTop: 5, borderColor: colors.whiteSmoke},
    txtTitle: {
      fontFamily: fonts.bold,
      fontSize: 16,
      marginLeft: 20,
    },
  })

export default TagsContainer
