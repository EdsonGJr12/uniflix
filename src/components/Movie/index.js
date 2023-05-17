import { View, Text, Image, TouchableOpacity } from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import { styles } from "./styles";
import { Stars } from "../Stars";

export function Movie({ movie, onPress }) {

    const average = movie.average ?? 0;

    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>
                    {movie.title}
                </Text>
            </View>

            <Image
                source={{
                    uri: movie.image_path
                }}
                style={styles.capa}
            />

            <Text style={styles.textAvaliacao}>
                Avaliação do público
            </Text>

            <Stars quantidadeEstrelas={average} />

        </TouchableOpacity>
    );
}