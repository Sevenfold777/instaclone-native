import { gql, useMutation } from "@apollo/client";
import React, { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { logUserIn } from "../apollo";
import AuthButton from "../components/auth/AuthButton";
import AuthLayout from "../components/auth/AuthLayout";
import { TextInput } from "../components/auth/AuthShared";

/* Graphql mutation */
const LOGIN_MUTATION = gql`
  mutation login($userName: String!, $password: String!) {
    login(userName: $userName, password: $password) {
      ok
      token
      error
    }
  }
`;

export default function Login({ route: { params } }) {
  /* useForm */
  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues: { userName: params?.userName, password: params?.password },
  });

  /* useRef */
  const passwordRef = useRef();

  /* onNext */
  const onNext = (nextOne) => {
    nextOne?.current?.focus();
  };

  /* onCompleted */
  const onCompleted = async (data) => {
    const {
      login: { ok, token },
    } = data;
    //console.log(data);
    if (ok) {
      await logUserIn(token);
    }
  };

  /* useMutation */
  const [loginMutation, { loading }] = useMutation(LOGIN_MUTATION, {
    onCompleted,
  });

  /* onValid */
  const onValid = (data) => {
    if (!loading) {
      loginMutation({ variables: { ...data } });
    }
  };

  /* useEffect */
  useEffect(() => {
    register("userName", { required: true });
    register("password", { required: true });
  }, [register]);

  return (
    <AuthLayout>
      <TextInput
        value={watch("userName")}
        placeholder="Username"
        returnKeyType="next"
        autoCapitalize="none"
        placeholderTextColor={"rgba(255, 255, 255, 0.6)"}
        onSubmitEditing={() => onNext(passwordRef)}
        onChangeText={(text) => setValue("userName", text)}
      />
      <TextInput
        value={watch("password")}
        ref={passwordRef}
        placeholder="Password"
        returnKeyType="done"
        placeholderTextColor={"rgba(255,255,255, 0.6)"}
        onSubmitEditing={handleSubmit(onValid)}
        onChangeText={(text) => setValue("password", text)}
        secureTextEntry={true}
        lastOne={true}
      />
      <AuthButton
        text="Log In"
        loading={loading}
        disabled={!watch("userName") || !watch("password")}
        onPress={handleSubmit(onValid)}
      />
    </AuthLayout>
  );
}
