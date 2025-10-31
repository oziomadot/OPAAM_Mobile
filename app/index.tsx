import { useRouter } from "expo-router"; // 👈 navigation
import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    FlatList,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { API_BASE_URL } from "../src/config";
import AppHeader from "./components/AppHeader";

const categories = [
  "Duplex",
  "Four bedroom flats",
  "Three bedroom flats",
  "Two bedroom flats",
  "One bedroom flats",
  "Selfcon",
  "One room",
];

const Index = () => {
  const [minAmount, setMinAmount] = useState("");
  const [maxAmount, setMaxAmount] = useState("");
  const [search, setSearch] = useState("");
  const [properties, setProperties] = useState<Record<string, any[]>>({});
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const loadProperty = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${API_BASE_URL}/properties`, {
          headers: { 
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        // Log the structure to help with debugging
        console.log('API Response:', JSON.stringify(data, null, 2));
        
        if (data.properties) {
          setProperties(data.properties);
        }

      } catch (error) {
        console.error("Error loading properties:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadProperty();
  }, []);

  const getByCategory = (category: string) => {
    const categoryKey = category.toLowerCase().replace(/\s+/g, '');
    return properties[categoryKey] || [];
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3b82f6" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>

<AppHeader />
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>
          FIND HOUSE/LAND TO BUY/RENT IN {properties.length} STATES OF NIGERIA
        </Text>
        <Text style={styles.subtitle}>WE MAKE IT EASY FOR YOU and y will </Text>
      </View>

      {/* Filters */}
      <View style={styles.filters}>
        <TextInput
          style={styles.input}
          placeholder="Min Amount"
          keyboardType="numeric"
          value={minAmount}
          onChangeText={setMinAmount}
        />
        <TextInput
          style={styles.input}
          placeholder="Max Amount"
          keyboardType="numeric"
          value={maxAmount}
          onChangeText={setMaxAmount}
        />
        <TextInput
          style={styles.input}
          placeholder="Find something"
          value={search}
          onChangeText={setSearch}
        />
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "red" }]}
          onPress={() => {
            setMinAmount("");
            setMaxAmount("");
            setSearch("");
          }}
        >
          <Text style={styles.buttonText}>Clear Filters</Text>
        </TouchableOpacity>
      </View>

      {/* Categories with Horizontal Images */}
      {categories.map((category) => {
        const items = getByCategory(category);
        if (!items.length) return null;

        return (
          <View key={category} style={{ marginBottom: 20 }}>
            <Text style={styles.sectionTitle}>{category}</Text>
            <FlatList
              horizontal
              data={items}
              keyExtractor={(item) => item.id.toString()}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.card}
                  onPress={() =>
                    router.push({
                      pathname: "/property-details",
                      params: { id: item.id },
                    } as any) // Type assertion needed for now
                  }
                >
                  <Image
                    source={{ uri: item.image }}
                    style={styles.image}
                  />
                  <View style={styles.cardContent}>
                    <Text style={styles.cardText}>{item.state}</Text>
                    <Text style={styles.cardText}>{item.amount}</Text>
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8fafc", padding: 10 },
  branding: { alignItems: "center", marginVertical: 10 },
  logo: { width: 70, height: 70, resizeMode: "contain" },
  appName: { fontSize: 18, fontWeight: "bold", marginTop: 5 },
  menu: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
    borderBottomWidth: 1,
    borderColor: "#e5e7eb",
    paddingBottom: 5,
  },
  menuItem: { fontSize: 14, fontWeight: "600", color: "#3b82f6" },
  header: { marginVertical: 20, alignItems: "center" },
  title: { fontSize: 18, fontWeight: "bold", textAlign: "center" },
  subtitle: { marginTop: 5, fontSize: 14, color: "#84cc16" },
  filters: {
    marginVertical: 20,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  input: {
    backgroundColor: "#e5e7eb",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    width: "30%",
  },
  button: {
    backgroundColor: "#3b82f6",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: { color: "white", fontWeight: "bold" },
  sectionTitle: { fontSize: 16, fontWeight: "bold", marginVertical: 10 },
  card: {
    backgroundColor: "#f1f5f9",
    borderRadius: 15,
    marginRight: 15,
    width: 200,
    overflow: "hidden",
  },
  image: { width: "100%", height: 120 },
  cardContent: { padding: 8 },
  cardText: { fontSize: 12 },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
  },
});

export default Index;