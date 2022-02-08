import { gql, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { FlatList } from "react-native";
import Photo from "../components/Photo";
import ScreenLayout from "../components/ScreenLayout";
import { COMMENT_FRAGMENT, PHOTO_FRAGMENT } from "../fragments";

const FEED_QUERY = gql`
  query seeFeed($offset: Int!) {
    seeFeed(offset: $offset) {
      ...PhotoFragment
      user {
        userName
        avatar
      }
      caption
      comments {
        ...CommentFragment
      }
      createdAt
      isMine
    }
  }
  ${PHOTO_FRAGMENT}
  ${COMMENT_FRAGMENT}
`;

export default function Feed() {
  /* USE QUERY */
  const { data, loading, refetch, fetchMore } = useQuery(FEED_QUERY, {
    variables: { offset: 0 },
  });
  //console.log(data);
  /* render photo */
  const renderPhoto = ({ item: photo }) => {
    //console.log(photo);
    return <Photo {...photo} />;
  };

  /* useState hook for refresh */
  const [isRefreshing, setRefreshing] = useState(false);

  const refresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  return (
    <ScreenLayout loading={loading}>
      <FlatList
        onEndReached={() =>
          fetchMore({ variables: { offset: data?.seeFeed?.length } })
        }
        onEndReachedThreshold={0.02}
        refreshing={isRefreshing}
        onRefresh={refresh}
        style={{ width: "100%" }}
        showsVerticalScrollIndicator={false}
        data={data?.seeFeed}
        keyExtractor={(photo) => "" + photo.id}
        renderItem={renderPhoto}
      />
    </ScreenLayout>
  );
}
