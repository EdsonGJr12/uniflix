import { View, Text, StatusBar, FlatList, ScrollView, Image } from "react-native";
import { styles } from "./styles";
import { Movie } from "../../components/Movie";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { api } from "../../services/api";


export function Home() {

    const navigation = useNavigation();

    const [top10Movies, setTop10Movies] = useState([]);
    const [moviesByCategory, setMoviesByCategory] = useState([]);

    function handlePressMovie(movie) {
        navigation.navigate("MovieDetails", {
            id_movie: movie.id_movie
        });
    }

    async function buscarTop10() {
        const response = await api.get("/api/movies/top-ten");
        console.log(response.data);
        setTop10Movies(response.data);
    }

    async function buscarPorCategoria() {
        const response = await api.get("/api/movies/grouped-by-category");
        setMoviesByCategory(response.data);
    }

    useEffect(() => {
        buscarTop10();
        buscarPorCategoria();
    }, []);

    return (
        <ScrollView
            contentContainerStyle={{
                flexGrow: 1
            }}
        >
            <View style={styles.container}>
                <StatusBar
                    barStyle="light-content"
                    backgroundColor="#141414"
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

        </ScrollView>
    );
}