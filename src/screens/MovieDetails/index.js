import { View, Text, Image, ScrollView } from "react-native";
import { styles } from "./styles";
import { useRoute } from "@react-navigation/native";
import { Stars } from "../../components/Stars";
import { useEffect, useState } from "react";
import { api } from "../../services/api";

export function MovieDetails() {

    const route = useRoute();
    const { id_movie } = route.params;

    const [movie, setMovie] = useState();

    const avarege = movie?.avarege ?? 0;

    async function buscarDetalhesDoFilme(id_movie) {
        const response = await api.get(`/api/movies/${id_movie}`);
        setMovie(response.data);
    }

    useEffect(() => {
        if (id_movie) {
            buscarDetalhesDoFilme(id_movie);
        }
    }, [id_movie]);

    return (
        <ScrollView
            contentContainerStyle={{
                flexGrow: 1
            }}
        >
            <View
                style={styles.container}
            >
                <Text style={styles.title}>
                    {movie?.title}
                </Text>

                <View style={styles.viewCapa}>
                    <Image
                        source={{
                            uri: movie?.image_path
                        }}
                        style={styles.capa}
                    />
                </View>

                <Text style={styles.textElenco}>
                    Ano
                </Text>

                <Text style={styles.textAvaliacao}>
                    {movie?.release_year}
                </Text>

                <Text style={styles.textElenco}>
                    Elenco
                </Text>

                <View style={styles.viewElenco}>
                    {movie?.actors.map(ator => (
                        <Text key={ator.actor_id} style={styles.textActor}>
                            {ator.actor_name}
                        </Text>
                    ))}
                </View>

                <Text style={styles.textSinopse}>
                    Sinopse
                </Text>

                <Text style={styles.textAvaliacao}>
                    {movie?.synopsis}
                </Text>

                <Text style={styles.textAvaliacao}>
                    Sua avaliação
                </Text>

                <Stars
                    enabled
                    quantidadeEstrelas={avarege}
                />
            </View>

        </ScrollView>
    );
}