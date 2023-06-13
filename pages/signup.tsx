import { DialogTitle } from "@rneui/base/dist/Dialog/Dialog.Title";
import { Button, Dialog } from "@rneui/themed";
import { SetStateAction, useState } from "react";
import { Keyboard, SafeAreaView, ScrollView, Text, TextInput, TouchableWithoutFeedback, View } from "react-native";
import DatePicker from "react-native-date-picker";
import { baseInline, baseStyle, debug } from "../styles/base";
import { loginStyle } from "../styles/login";
import { sigunpStyle } from "../styles/signup";
import { Connection } from "../utils/connection";
import { urls } from "../utils/directory";
import { SelectList } from "react-native-dropdown-select-list";

export function SignUp({ navigation }): JSX.Element {
    const [fullName, setName] = useState("");
    const [birthday, setBirthday] = useState(new Date());
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [role, setRole] = useState(0);

    const [calendarOpen, setOpen] = useState(false);
    const [birthdayMessage, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const [failedAge, showBirthdayFailed] = useState(false);
    const [failedEmail, showEmailWrong] = useState(false);
    const [failedPassword, showPasswordWrong] = useState(false);
    const [different, showDifferent] = useState(false);
    const [notFilled, showNotFilled] = useState(false);
    const [emailUsed, showEmailUsed] = useState(false);

    const isLegalAge = (birthday: Date): boolean => {
        const today = new Date();
        let age = today.getFullYear() - birthday.getFullYear();
        const month = today.getMonth() - birthday.getMonth();
        if (month < 0 || (month === 0 && today.getDate() < birthday.getDate())) {
            age--;
        }
        return age > 18;
    };

    const selectDate = (date: Date): void => {
        setOpen(false);
        if (isLegalAge(date)) {
            setBirthday(date);
            setMessage(date.toLocaleString().split(" ")[0]);
        } else {
            showBirthdayFailed(true);
        }
    }

    const validateEmail = (email: string): boolean => {
        const strongRegex = new RegExp("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$");
        let isValid = strongRegex.test(email);
        if (!isValid && email.length > 0) {
            showEmailWrong(true);
        } else {
            setEmail(email);
        }
        return isValid;
    }

    const validatePassword = (password: string): boolean => {
        let isValid = password.length >= 8;
        if (!isValid && password.length > 0) {
            showPasswordWrong(true);
        } else {
            setPassword(password);
        }
        return false;
    }

    const confirmPassword = (confirmation: string): boolean => {
        let areEqual = confirmation === password;
        if (!areEqual && confirm.length > 0) {
            showDifferent(true);
        } else {
            setConfirm(confirmation);
        }
        return false;
    }

    const isFormFilled = (): boolean => {
        return fullName !== "" &&
            birthday !== null &&
            email !== "" &&
            password !== "" &&
            confirm !== "" &&
            confirm === password;
    }

    const signup = (): void => {
        if (!isFormFilled()) {
            showNotFilled(true);
        } else {
            setLoading(true);
            const payload = {
                email: email,
                password: password
            };

            new Connection(urls.userServer).send("post", "user", null, payload).then(response => {
                if (response) {
                    if (response.status == 201 && "json" in response) {
                        registerUser(response.json.id);
                    }
                    if (response.status == 409) {
                        showEmailUsed(true);
                    }
                }
            });
        }
    }

    const registerUser = (id: number): void => {
        if (!isFormFilled()) {
            showNotFilled(true);
        } else {
            const payload = {
                name: fullName,
                email: email,
                birthday: birthday,
                role: role
            };
            const path = "storage/json/users/" + id;
            new Connection(urls.randomStorage).send("post", path, null, payload).then(response => {
                if (response) {
                    if (response.status == 201) {
                        setLoading(false);
                        navigation.navigate("login");
                    }
                }
            });
        }
    }

    return (
        <TouchableWithoutFeedback
            onPress={Keyboard.dismiss}>
            <SafeAreaView style={baseStyle.baseView}>
                <ScrollView
                    scrollEnabled={false}
                    automaticallyAdjustKeyboardInsets={true}>
                    <TextInput
                        style={[baseStyle.baseTextInput, sigunpStyle.textInput, baseStyle.baseInputFirst]}
                        id="fullName"
                        placeholderTextColor="white"
                        autoComplete="given-name"
                        autoCorrect={false}
                        autoCapitalize="words"
                        onEndEditing={name => setName(name.nativeEvent.text)} />
                    <Text
                        style={[baseStyle.baseInputLabel, sigunpStyle.inputLabel]}>full name</Text>
                    <TextInput
                        style={[baseStyle.baseTextInput, sigunpStyle.textInput]}
                        id="birthday"
                        value={birthdayMessage}
                        placeholderTextColor="white"
                        autoCapitalize="none"
                        onPressOut={_ => setOpen(true)}
                        editable={false} />
                    <Text
                        style={[baseStyle.baseInputLabel, sigunpStyle.inputLabel]}
                        suppressHighlighting={true}
                        onPress={event => setOpen(true)}
                    >birthday</Text>
                    <DatePicker
                        modal
                        open={calendarOpen}
                        date={birthday}
                        mode="date"
                        locale="es"
                        onConfirm={date => selectDate(date)}
                        onCancel={() => setOpen(false)}
                    />
                    <TextInput
                        style={[baseStyle.baseTextInput, sigunpStyle.textInput]}
                        id="email"
                        placeholderTextColor="white"
                        autoComplete="email"
                        keyboardType="email-address"
                        autoCorrect={false}
                        autoCapitalize="none"
                        onEndEditing={email => validateEmail(email.nativeEvent.text)} />
                    <Text
                        style={[baseStyle.baseInputLabel, sigunpStyle.inputLabel]}
                    >email</Text>
                    <TextInput
                        style={[baseStyle.baseTextInput, sigunpStyle.textInput]}
                        id="password"
                        placeholderTextColor="white"
                        secureTextEntry={true}
                        autoComplete="password"
                        autoCorrect={false}
                        autoCapitalize="none"
                        onEndEditing={password => validatePassword(password.nativeEvent.text)} />
                    <Text
                        style={[baseStyle.baseInputLabel, sigunpStyle.inputLabel]}
                    >password</Text>
                    <TextInput
                        style={[baseStyle.baseTextInput, sigunpStyle.textInput]}
                        id="confirmation"
                        placeholderTextColor="white"
                        secureTextEntry={true}
                        autoComplete="password"
                        autoCorrect={false}
                        autoCapitalize="none"
                        onEndEditing={value => confirmPassword(value.nativeEvent.text)} />
                    <Text
                        style={[baseStyle.baseInputLabel, sigunpStyle.inputLabel]}
                    >confirm password</Text>
                    <SelectList
                        boxStyles={sigunpStyle.selectList}
                        inputStyles={{ color: "white" }}
                        dropdownStyles={sigunpStyle.dropDownList}
                        dropdownTextStyles={{ color: "white" }}
                        arrowicon={<></>}
                        placeholder="I am..."
                        setSelected={(value: SetStateAction<number>) => setRole(value)}
                        search={false}
                        data={[
                            { key: 1, value: "Employee" },
                            { key: 2, value: "Model" }
                        ]}
                        save="key"
                    />
                    {/* --------------------- BUTTONS ---------------------*/}
                    <View
                        style={[baseStyle.containerBottom]}>
                        <Button
                            style={[baseStyle.baseButton, sigunpStyle.signupButton]}
                            title="Sign Up"
                            color="#36827F"
                            loading={loading}
                            onPress={_ => signup()} />
                        <Button
                            style={[baseStyle.baseButton, sigunpStyle.backButton]}
                            title="Back"
                            onPress={_ => navigation.navigate("login")} />
                    </View>
                    {/* --------------------- DIALOGS ---------------------*/}
                    <Dialog
                        isVisible={failedAge}
                        onBackdropPress={() => showBirthdayFailed(false)}>
                        <DialogTitle title="You need to be 18+" />
                        <Text>You need to be 18 years old or more to create and account</Text>
                    </Dialog>
                    <Dialog
                        isVisible={failedEmail}
                        onBackdropPress={() => showEmailWrong(false)}>
                        <DialogTitle title="Your email is incorrect" />
                        <Text>Please check your email address and try again</Text>
                    </Dialog>
                    <Dialog
                        isVisible={failedPassword}
                        onBackdropPress={() => showPasswordWrong(false)}>
                        <DialogTitle title="Check your password" />
                        <Text>Your password needs to be at least 8 characters long</Text>
                    </Dialog>
                    <Dialog
                        isVisible={different}
                        onBackdropPress={() => showDifferent(false)}>
                        <DialogTitle title="Check your password" />
                        <Text>Your passwords don't match</Text>
                    </Dialog>
                    <Dialog
                        isVisible={notFilled}
                        onBackdropPress={() => showNotFilled(false)}>
                        <DialogTitle title="Please fill the form" />
                        <Text>We need this information to proceed</Text>
                    </Dialog>
                    <Dialog
                        isVisible={emailUsed}
                        onBackdropPress={() => showEmailUsed(false)}
                        onDismiss={() => setLoading(false)}>
                        <DialogTitle title="Email already registered" />
                        <Text>This email address is already registered</Text>
                    </Dialog>
                </ScrollView>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    );
}