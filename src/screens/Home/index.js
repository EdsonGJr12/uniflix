import { View, Text, StatusBar, FlatList, ScrollView, Image, ActivityIndicator } from "react-native";
import { styles } from "./styles";
import { Movie } from "../../components/Movie";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { api } from "../../services/api";


export function Home() {

    const navigation = useNavigation();

    const [isLoading, setIsLoading] = useState(true);
    const [top10Movies, setTop10Movies] = useState([]);
    const [moviesByCategory, setMoviesByCategory] = useState([]);

    function handlePressMovie(movie) {
        navigation.navigate("MovieDetails", {
            id_movie: movie.id_movie
        });
    }

    async function buscarTop10() {
        const response = await api.get("/api/movies/top-ten");
        setTop10Movies(response.data);
    }

    async function buscarPorCategoria() {
        const response = await api.get("/api/movies/grouped-by-category");
        setMoviesByCategory(response.data);
    }

    async function carregarPagina() {
        try {
            await Promise.all([buscarTop10(), buscarPorCategoria()]);
            console.log("terminou de carregar")
        } finally {
            setIsLoading(false);
        }
    }

    useFocusEffect(
        useCallback(() => {
            carregarPagina();
            return () => setIsLoading(true);
        }, [])
    );

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
                <View style={styles.container}>
                    <StatusBar
                        barStyle="light-content"
                        translucent
                    />

                    <View style={styles.logoContainer}>
                        <Image
                            source={require("../../assets/uniflix.jpg")}
                            style={{
                                width: 120,
                                height: 100
                            }}
                        />
                    </View>

                    <View style={styles.viewTop10}>
                        <Text style={styles.title}>Top 10 filmes mais bem avaliados</Text>


                        <FlatList
                            data={top10Movies}
                            keyExtractor={item => item.id_movie}
                            renderItem={({ item }) => (
                                <Movie
                                    movie={item}
                                    onPress={() => handlePressMovie(item)}
                                />
                            )}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                        />
                    </View>

                    {moviesByCategory.map(element => (
                        <View
                            key={element.category}
                            style={styles.viewTop10}
                        >
                            <Text style={styles.title}>{element.category}</Text>

                            <FlatList
                                data={element.movies}
                                keyExtractor={item => item.id_movie}
                                renderItem={({ item }) => (
                                    <Movie
                                        movie={item}
                                        onPress={() => handlePressMovie(item)}
                                    />
                                )}
                                horizontal
                                showsHorizontalScrollIndicator={false}

                            />
                        </View>

                    ))}

                </View>
            )}


        </ScrollView>
    );
}