import { StyleSheet, View } from 'react-native';

type Style = {
    color: string;
    size: number;
};

const Bullet = (props: Style) => {

    return (
        <View style={[styles.bullet, { backgroundColor: props.color, height: props.size, width: props.size, borderRadius: props.size }]} />
    )
}

const styles = StyleSheet.create({
    bullet: {
        alignSelf: 'center',
        marginRight: 5
    },
});

export default Bullet;