import { Dimensions, PixelRatio, StyleSheet } from "react-native";

export const primaryColor = "#202C59";
export const secondaryColor = "#36827F";
export const pinkColor = "#f4d4e4";

export const screenPercent = Dimensions.get("screen").height / 100;

export const baseStyle = StyleSheet.create({
    baseView: {
        width: "100%",
        height: screenPercent * 100,
        backgroundColor: primaryColor,
    },
    baseTextInput: {
        height: "auto",
        paddingBottom: 5,
        color: "white",
        fontSize: PixelRatio.getFontScale() * 20,
        borderStyle: "solid",
        borderWidth: 0,
        borderBottomWidth: 1,
        borderBottomColor: "white"
    },
    baseInputFirst: {
        marginTop: screenPercent * 5
    },
    baseInputBottom: {
        marginBottom: screenPercent * 5
    },
    baseInputLabel: {
        height: screenPercent * 4,
        fontSize: PixelRatio.getFontScale() * 20,
        color: pinkColor
    },
    baseButton: {
        height: "auto",
        width: "50%",
    },
    baseButtonBottom: {
        marginBottom: screenPercent * 5
    },
    containerBottom: {
        position: "absolute",
        justifyContent: "space-evenly",
        top: Dimensions.get("screen").height - (screenPercent * 30),
        width: "100%"
    }
});

export const baseInline = StyleSheet.create({
    inlineView: {
        flexDirection: "row",
    },
    leftInputLabel: {
        verticalAlign: "middle"
    },
});

export const debug = StyleSheet.create({
    container: {
        borderColor: "red",
        borderWidth: 1,
        borderStyle: "solid"
    }
});