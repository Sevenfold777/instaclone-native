import { gql, useLazyQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { FlatList } from "react-native";
import {
  ActivityIndicator,
  Image,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import styled from "styled-components/native";
import DismissKeyboard from "../components/DismissKeyboard";

const SEARCH_PHOTOS_QUERY = gql`
  query searchPhotos($keyword: String!) {
    searchPhotos(keyword: $keyword) {
      id
      file
    }
  }
`;

const MessageContainer = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;
const MessageText = styled.Text`
  margin-top: 15px;
  color: white;
  font-weight: 600;
`;

const Input = styled.TextInput`
  background-color: rgba(255, 255, 255, 1);
  color: black;
  width: ${(props) => props.width / 1.5}px;
  padding: 5px 10px;
  border-radius: 7px;
`;

export default function Search({ navigation }) {
  const numCols = 4;

  /* useWindowDimensions */
  const { width } = useWindowDimensions();

  /* useForm */
  const { register, setValue, watch, handleSubmit } = useForm();

  /* useQuery - lazy query */
  const [searchPhotos, { loading, data, called }] =
    useLazyQuery(SEARCH_PHOTOS_QUERY);

  /* onValid function for handleSubmit(from useForm) */
  const onValid = ({ keyword }) => {
    searchPhotos({ variables: { keyword } });
  };

  /* header component (search box) */
  const SearchBox = () => (
    <Input
      width={width}
      placeholder="Search Photos"
      placeholderTextColor="rgba(0,0,0,0.8)"
      autoCapitalize="none"
      returnKeyLabel="Search"
      returnKeyType="search"
      autoCorrect={false}
      onChangeText={(text) => setValue("keyword", text)}
      onChange={handleSubmit(onValid)}
    />
  );

  /* useEffect */
  useEffect(() => {
    navigation.setOptions({ headerTitle: SearchBox });
    register("keyword", { required: true, minLength: 3 });
  }, []);

  const renderItem = ({ item: photo }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate("Photo", { photoId: photo.id })}
    >
      <Image
        source={{ uri: photo?.file }}
        style={{ width: width / numCols, height: 100 }}
      />
    </TouchableOpacity>
  );

  return (
    <DismissKeyboard>
      <View style={{ flex: 1, backgroundColor: "black" }}>
        {loading ? (
          <MessageContainer>
            <ActivityIndicator />
            <MessageText>Searching...</MessageText>
          </MessageContainer>
        ) : null}

        {!called ? (
          <MessageContainer>
            <MessageText>Search by keyword</MessageText>
          </MessageContainer>
        ) : null}

        {data?.searchPhotos !== undefined ? (
          data?.searchPhotos?.length === 0 ? (
            <MessageContainer>
              <MessageText>Could not find anything.</MessageText>
            </MessageContainer>
          ) : (
            <FlatList
              numColumns={numCols}
              data={data?.searchPhotos}
              keyExtractor={(photo) => "" + photo.id}
              renderItem={renderItem}
            />
          )
        ) : null}
      </View>
    </DismissKeyboard>
  );
}
