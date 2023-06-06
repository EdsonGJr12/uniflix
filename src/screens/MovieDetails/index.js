import { View, Text, Image, ScrollView, ActivityIndicator } from "react-native";
import { styles } from "./styles";
import { useRoute } from "@react-navigation/native";
import { Stars } from "../../components/Stars";
import { useEffect, useState } from "react";
import { api } from "../../services/api";
import { getDeviceId } from "../../services/getDeviceId";

export function MovieDetails() {

    const route = useRoute();
    const { id_movie } = route.params;

    const [isLoading, setIsLoading] = useState(true);
    const [movie, setMovie] = useState();

    const [avarage, setAvarage] = useState(0);

    async function buscarDetalhesDoFilme(id_movie) {
        const response = await api.get(`/api/movies/${id_movie}`);
        setMovie(response.data);
    }

    async function buscarAvaliacaoUsuario(id_movie) {
        const device_id = await getDeviceId();

        const response = await api.get(`/api/reviews?device_id=${device_id}&id_movie=${id_movie}`);

        console.log(response.data);

        setAvarage(response.data.score);
    }

    async function carregarPagina(id_movie) {
        try {
            await Promise.all([buscarAvaliacaoUsuario(id_movie), buscarDetalhesDoFilme(id_movie)]);

        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        if (id_movie) {
            carregarPagina(id_movie);
        }
    }, [id_movie]);

    return (
        <ScrollView
            contentContainerStyle={{
                flexGrow: 1,
                backgroundColor: "#141414",
                justifyContent: isLoading ? "center" : null
            }}
        >
            {isLoading ? (
                <ActivityIndicator size="large" color="red" />
            ) : (
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
                        id_movie={id_movie}
                        enabled
                        quantidadeEstrelas={avarage}
                    />
                </View>
            )}

        </ScrollView>
    );
}