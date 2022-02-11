import { gql, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { FlatList, Text, View } from "react-native";
import { USER_FRAGMENT } from "../fragments";
import ScreenLayout from "../components/ScreenLayout";
import UserRow from "../components/UserRow";

const LIKES_QUERY = gql`
  query seePhotoLikes($photoId: Int!) {
    seePhotoLikes(photoId: $photoId) {
      ...UserFragment
    }
  }
  ${USER_FRAGMENT}
`;

export default function Likes({ route }) {
  const { data, loading, refetch } = useQuery(LIKES_QUERY, {
    variables: { photoId: route?.params?.photoId },
    skip: !route?.params?.photoId,
  });

  const renderUser = ({ item: user }) => <UserRow {...user} />;

  /* useState for refresh */
  const [isRefreshing, setRefreshing] = useState(false);
  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  return (
    <ScreenLayout loading={loading}>
      <FlatList
        refreshing={isRefreshing}
        onRefresh={onRefresh}
        data={data?.seePhotoLikes}
        renderItem={renderUser}
        keyExtractor={(item) => "" + item.id}
        style={{ width: "100%" }}
      />
    </ScreenLayout>
  );
}
