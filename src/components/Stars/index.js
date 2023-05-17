import { TouchableOpacity, View } from "react-native";

import { FontAwesome } from '@expo/vector-icons';
import { styles } from "./styles";

export function Stars({ quantidadeEstrelas, enabled = false }) {
    return (
        <View style={styles.estrelas}>
            <TouchableOpacity enabled={enabled} activeOpacity={enabled ? 0.5 : 1}>
                <FontAwesome
                    name={quantidadeEstrelas >= 1 ? "star" : "star-o"}
                    size={18}
                    color={quantidadeEstrelas >= 1 ? "#f4d03f" : "#ffff"}
                />
            </TouchableOpacity>

            <TouchableOpacity enabled={enabled} activeOpacity={enabled ? 0.5 : 1}>
                <FontAwesome
                    name={quantidadeEstrelas >= 2 ? "star" : "star-o"}
                    size={18}
                    color={quantidadeEstrelas >= 2 ? "#f4d03f" : "#ffff"}
                />
            </TouchableOpacity>

            <TouchableOpacity enabled={enabled} activeOpacity={enabled ? 0.5 : 1}>
                <FontAwesome
                    name={quantidadeEstrelas >= 3 ? "star" : "star-o"}
                    size={18}
                    color={quantidadeEstrelas >= 3 ? "#f4d03f" : "#ffff"}
                />
            </TouchableOpacity>

            <TouchableOpacity enabled={enabled} activeOpacity={enabled ? 0.5 : 1}>
                <FontAwesome
                    name={quantidadeEstrelas >= 4 ? "star" : "star-o"}
                    size={18}
                    color={quantidadeEstrelas >= 4 ? "#f4d03f" : "#ffff"}
                />
            </TouchableOpacity>

            <TouchableOpacity enabled={enabled} activeOpacity={enabled ? 0.5 : 1}>
                <FontAwesome
                    name={quantidadeEstrelas >= 5 ? "star" : "star-o"}
                    size={18}
                    color={quantidadeEstrelas >= 5 ? "#f4d03f" : "#ffff"}
                />
            </TouchableOpacity>

        </View>
    );
}