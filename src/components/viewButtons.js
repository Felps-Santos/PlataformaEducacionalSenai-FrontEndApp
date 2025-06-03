import { StyleSheet, View } from "react-native";
import { colors } from "../css/theme";
import { Button } from "./button";

export function ViewButtons({ typeIcon1, nameIcon1, nameTitle1, nav1, args1, typeIcon2, nameIcon2, nameTitle2, nav2, args2 }) {
    return (
        <View style={s.container}>
            <Button typeIcon={typeIcon1} nameIcon={nameIcon1} nameTitle={nameTitle1} nav={nav1} args={args1}/>
            <Button typeIcon={typeIcon2} nameIcon={nameIcon2} nameTitle={nameTitle2} nav={nav2} args={args2}/>
        </View>
    )
}

export const s = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        top: 20,
        justifyContent: 'space-around',
        padding: 20,
    },
})