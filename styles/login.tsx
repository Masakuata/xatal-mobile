import { createTheme, darkColors } from "@rneui/themed";
import { PixelRatio, Platform, StyleSheet } from "react-native";
import { primaryColor, screenPercent } from "./base";

export const theme = createTheme({
    darkColors: {
        ...Platform.select({
            default: darkColors.platform.ios,
            android: darkColors.platform.android,
            ios: darkColors.platform.ios
        }),
        primary: primaryColor
    },
});

export const loginStyle = StyleSheet.create({
    imageView: {
        position: "relative",
        width: "80%",
        height: screenPercent * 100,
        left: "10%",
        top: 0,
        borderColor: "red",
        borderWidth: 1,
        borderStyle: "solid"
    },
    title: {
        color: "#f7d7e2",
        fontSize: PixelRatio.getFontScale() * 100,
        textAlign: "center",
        fontStyle: "italic",
        marginTop: "0%",
        marginBottom: screenPercent * 12
    },
    textInput: {
        position: "relative",
        marginTop: "0%",
        width: "80%",
        left: "10%",
        textAlign: "center",
    },
    inputLabel: {
        position: "relative",
        marginTop: screenPercent * 1,
        width: "80%",
        left: "10%",
        textAlign: "center",
    },
    loginButton: {
        position: "relative",
        marginTop: screenPercent * 2.5,
        marginBottom: screenPercent * 2.5,
        left: "25%",
    },
    signUpButton: {
        position: "relative",
        marginBottom: screenPercent * 2.5,
        left: "25%",
    }
});