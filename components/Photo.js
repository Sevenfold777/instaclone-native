import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useNavigation } from "@react-navigation/native";
import {
  Image,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { gql, useMutation } from "@apollo/client";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";

/* toggleLike mutation */
const TOGGLE_LIKE_MUTATION = gql`
  mutation toggleLike($photoId: Int!) {
    toggleLike(photoId: $photoId) {
      ok
      error
    }
  }
`;
const Container = styled.View``;
const Header = styled.TouchableOpacity`
  padding: 10px;
  flex-direction: row;
  align-items: center;
`;
const UserAvatar = styled.Image`
  margin-right: 10px;
  width: 25px;
  height: 25px;
  border-radius: 12.5px;
`;
const Username = styled.Text`
  color: white;
  font-weight: 600;
`;
const File = styled.Image``;
const Actions = styled.View`
  flex-direction: row;
  align-items: center;
`;
const Action = styled.TouchableOpacity`
  margin-right: 10px;
`;
const Caption = styled.View`
  flex-direction: row;
`;
const CaptionText = styled.Text`
  color: white;
  margin-left: 5px;
`;
const Likes = styled.Text`
  color: white;
  margin: 7px 0px;
  font-weight: 600;
`;
const BottomContainer = styled.View`
  padding: 10px;
`;

function Photo({ id, user, caption, file, isLiked, likeNum }) {
  //console.log(isLiked);
  /* use Navigation */
  const navigation = useNavigation();

  /* for width/height */
  const { width, height } = useWindowDimensions();

  /* useState for height */
  const [imageHeight, setImageHeight] = useState(height - 450);

  /* useEffect */
  useEffect(() => {
    Image.getSize(file, (width, height) => setImageHeight(height / 3));
  }, [file]);

  /* updateToggleLike */
  const updateToggleLike = (cache, result) => {
    /* get result of toggleLike Mutation */
    const {
      data: {
        toggleLike: { ok },
      },
    } = result;

    if (ok) {
      // cache id set
      const photoId = `Photo:${id}`;

      // cache modify
      cache.modify({
        id: photoId,
        fields: {
          // isLiked
          isLiked(prev) {
            return !prev;
          },

          // num of likes
          likeNum(prev) {
            if (isLiked) {
              return prev - 1;
            } else {
              return prev + 1;
            }
          },
        },
      });
    }
  };

  /* useMutation */
  const [toggleLikeMutation] = useMutation(TOGGLE_LIKE_MUTATION, {
    variables: { photoId: id },
    update: updateToggleLike,
  });

  /* goToProfile (nav) */
  const goToProfile = () => {
    navigation.navigate("Profile", {
      userName: user.userName,
      id: user.id,
    });
  };

  return (
    <Container>
      <Header onPress={goToProfile}>
        <UserAvatar resizeMode="cover" source={{ uri: user.avatar }} />
        <Username>{user.userName}</Username>
      </Header>

      <File
        resizeMode="cover"
        style={{ width, height: imageHeight }}
        source={{ uri: file }}
      />

      <BottomContainer>
        <Actions>
          <Action onPress={toggleLikeMutation}>
            <Ionicons
              name={isLiked ? "heart" : "heart-outline"}
              color={isLiked ? "tomato" : "white"}
              size={22}
            />
          </Action>
          <Action onPress={() => navigation.navigate("Comments")}>
            <Ionicons name="chatbubble-outline" color="white" size={22} />
          </Action>
        </Actions>
        <TouchableOpacity
          onPress={() => navigation.navigate("Likes", { photoId: id })}
        >
          <Likes>{likeNum === 1 ? "1 like" : `${likeNum} likes`}</Likes>
        </TouchableOpacity>

        <Caption>
          <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
            <Username>{user.userName}</Username>
          </TouchableOpacity>
          <CaptionText>{caption}</CaptionText>
        </Caption>
      </BottomContainer>
    </Container>
  );
}

/* set PropTypes for React component */
Photo.propTypes = {
  id: PropTypes.number.isRequired,
  user: PropTypes.shape({
    avatar: PropTypes.string,
    userName: PropTypes.string.isRequired,
  }),
  caption: PropTypes.string,
  file: PropTypes.string.isRequired,
  isLiked: PropTypes.bool.isRequired,
  likeNum: PropTypes.number.isRequired,
};

export default Photo;
