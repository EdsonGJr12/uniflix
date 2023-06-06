import { Alert, TouchableOpacity, View } from "react-native";

import { FontAwesome } from '@expo/vector-icons';
import { styles } from "./styles";
import { getDeviceId } from "../../services/getDeviceId";
import { api } from "../../services/api";
import { useNavigation } from "@react-navigation/native";

export function Stars({ id_movie, quantidadeEstrelas, enabled = false }) {

    const navigation = useNavigation();

    function handleVoltar() {
        navigation.goBack();
    }

    async function confimarAvaliacao(scoreMovie) {
        const data = {
            device_id: await getDeviceId(),
            id_movie: id_movie,
            score: scoreMovie
        };

        try {
            await api.post("/api/reviews", data);
            Alert.alert("Sucesso", "Avaliação realizada com sucesso", [
                {
                    text: "Ok",
                    onPress: handleVoltar
                }
            ]);
        } catch (error) {
            Alert.alert("Atenção", "Falha ao realizar avaliação");
        }
    }

    function handleAvaliar(score) {
        Alert.alert("Atenção", `Deseja realmente avaliar esse filme com ${score} estrela(s)?`, [
            {
                text: "Sim",
                onPress: () => {
                    confimarAvaliacao(score);
                }
            },
            {
                text: "Não",
                style: "cancel"
            }
        ]);
        console.log(score);
    }

    return (
        <View style={styles.estrelas}>
            <TouchableOpacity
                enabled={enabled}
                activeOpacity={enabled ? 0.5 : 1}
                onPress={() => handleAvaliar(1, id_movie)}
            >
                <FontAwesome
                    name={quantidadeEstrelas >= 1 ? "star" : "star-o"}
                    size={18}
                    color={quantidadeEstrelas >= 1 ? "#f4d03f" : "#ffff"}
                />
            </TouchableOpacity>

            <TouchableOpacity
                enabled={enabled}
                activeOpacity={enabled ? 0.5 : 1}
                onPress={() => handleAvaliar(2)}
            >
                <FontAwesome
                    name={quantidadeEstrelas >= 2 ? "star" : "star-o"}
                    size={18}
                    color={quantidadeEstrelas >= 2 ? "#f4d03f" : "#ffff"}
                />
            </TouchableOpacity>

            <TouchableOpacity
                enabled={enabled}
                activeOpacity={enabled ? 0.5 : 1}
                onPress={() => handleAvaliar(3)}
            >
                <FontAwesome
                    name={quantidadeEstrelas >= 3 ? "star" : "star-o"}
                    size={18}
                    color={quantidadeEstrelas >= 3 ? "#f4d03f" : "#ffff"}
                />
            </TouchableOpacity>

            <TouchableOpacity
                enabled={enabled}
                activeOpacity={enabled ? 0.5 : 1}
                onPress={() => handleAvaliar(4)}
            >
                <FontAwesome
                    name={quantidadeEstrelas >= 4 ? "star" : "star-o"}
                    size={18}
                    color={quantidadeEstrelas >= 4 ? "#f4d03f" : "#ffff"}
                />
            </TouchableOpacity>

            <TouchableOpacity
                enabled={enabled}
                activeOpacity={enabled ? 0.5 : 1}
                onPress={() => handleAvaliar(5)}
            >
                <FontAwesome
                    name={quantidadeEstrelas >= 5 ? "star" : "star-o"}
                    size={18}
                    color={quantidadeEstrelas >= 5 ? "#f4d03f" : "#ffff"}
                />
            </TouchableOpacity>

        </View>
    );
}