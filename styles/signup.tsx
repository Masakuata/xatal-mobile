import { StyleSheet } from "react-native";
import { screenPercent } from "./base";

export const sigunpStyle = StyleSheet.create({
    textInput: {
        position: "relative",
        marginTop: screenPercent * 1,
        width: "80%",
        left: "10%",
        textAlign: "center",
    },
    inputLabel: {
        position: "relative",
        marginTop: screenPercent,
        width: "80%",
        left: "10%",
        textAlign: "center",
    },
    leftTextLabel: {
        position: "relative",
        width: "50%",
        height: "auto",
        textAlign: "center",
    },
    selectList: {
        position: "relative",
        height: "auto",
        width: "80%",
        marginTop: screenPercent * 2.5,
        marginLeft: "10%",
        backgroundColor: "transparent",
        color: "white",
        borderColor: "white",
        // alignSelf: "center",
    },
    dropDownList: {
        width: "80%",
        marginLeft: "10%",
        borderColor: "white"
    },
    signupButton: {
        position: "relative",
        marginTop: screenPercent * 2.5,
        marginBottom: screenPercent * 2.5,
        left: "25%"
    },
    backButton: {
        position: "relative",
        marginBottom: screenPercent * 2.5,
        left: "25%"
    }
});