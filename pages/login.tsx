
import { Button, Text, ThemeProvider } from "@rneui/themed";
import { useState } from "react";
import { Keyboard, SafeAreaView, ScrollView, TextInput, TouchableWithoutFeedback, View } from "react-native";
import { loginStyle, theme } from "../styles/login";
import { baseStyle, debug } from "../styles/base";

function Login({ navigation }): JSX.Element {
    let [text, setText] = useState("Hello there");
    let [text2, setText2] = useState("");

    const changeText = (text: string) => {
        setText(text);
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <SafeAreaView style={baseStyle.baseView}>
                <ScrollView
                    scrollEnabled={false}
                    automaticallyAdjustKeyboardInsets={true}>
                    {/* <View style={loginStyle.imageView}>
                        <Image
                            style={loginStyle.titleImage}
                            source={require("./images/kori.png")} />
                    </View> */}
                    <Text
                        id="title"
                        style={loginStyle.title}>Xatal Leisure</Text>
                    <TextInput
                        style={[baseStyle.baseTextInput, loginStyle.textInput]}
                        placeholderTextColor="white"
                        autoComplete="email"
                        keyboardType="email-address"
                        autoCorrect={false}
                        autoCapitalize="none" />
                    <Text
                        style={[baseStyle.baseInputLabel, loginStyle.inputLabel]}
                    >email</Text>
                    <TextInput
                        style={[baseStyle.baseTextInput, loginStyle.textInput]}
                        placeholderTextColor="white"
                        autoCorrect={false}
                        autoCapitalize="none"
                        secureTextEntry={true} />
                    <Text
                        style={[baseStyle.baseInputLabel, loginStyle.inputLabel]}
                    >password</Text>
                    <View
                        style={[baseStyle.containerBottom]}>
                        <Button
                            style={[baseStyle.baseButton, loginStyle.loginButton]}
                            title="Login" />
                        <Button
                            style={[baseStyle.baseButton, loginStyle.signUpButton]}
                            title="Sign Up"
                            color="#36827F"
                            onPressOut={_ => navigation.navigate("signup")} />
                    </View>
                </ScrollView>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    );
}

export default Login;