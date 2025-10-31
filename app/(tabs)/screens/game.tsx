import { useRouter } from "expo-router";
import React from "react";
import { 
  FlatList, 
  StyleSheet, 
  Text, 
  TouchableOpacity, 
  View, 
  SafeAreaView,
  ImageBackground,
  Dimensions
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

type Game = {
  id: string;
  title: string;
  route: string;
  icon: keyof typeof MaterialIcons.glyphMap;
  color: string;
};

const { width } = Dimensions.get('window');

const games: Game[] = [
  { 
    id: "1", 
    title: "Word Puzzle", 
    route: "/word-puzzle",
    icon: "spellcheck",
    color: "#4CAF50"
  },
  { 
    id: "2", 
    title: "Nigeria Quiz", 
    route: "/nigeria-quiz",
    icon: "help-outline",
    color: "#2196F3"
  },
];

const GameHub = () => {
  const router = useRouter();

  const renderGameCard = ({ item }: { item: Game }) => (
    <TouchableOpacity
      style={[styles.gameCard, { backgroundColor: item.color }]}
      onPress={() => router.push(item.route as any)}
      activeOpacity={0.8}
    >
      <View style={styles.gameIcon}>
        <MaterialIcons name={item.icon} size={40} color="#fff" />
      </View>
      <Text style={styles.gameTitle}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.backgroundImage}>
        <View style={styles.overlay}>
          <Text style={styles.title}>Oramex Games</Text>
          <Text style={styles.subtitle}>Select a game to start playing</Text>
          
          <FlatList
            data={games}
            renderItem={renderGameCard}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContainer}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#121212',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    backgroundColor: '#1a1a2e',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.7)',
    textAlign: 'center',
    marginBottom: 30,
  },
  listContainer: {
    paddingBottom: 30,
    alignItems: 'center',
  },
  gameCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
    width: '100%',
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  gameIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  gameTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  arrowIcon: {
    opacity: 0.8,
  },
});

export default GameHub;
