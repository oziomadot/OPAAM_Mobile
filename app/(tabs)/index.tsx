import { useRouter } from "expo-router"; // 👈 navigation
import React, { useEffect, useState } from "react";
import {
    FlatList,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { API_BASE_URL } from "../../src/config";
import AppHeader from "../components/AppHeader";

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
  const [properties, setProperties] = useState<any>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const loadProperty = async () => {
      setIsLoading(true);
      try {
        const url = `${API_BASE_URL}/properties`;
        const response = await fetch(url, {
          method: 'GET',
          headers: { 
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });
  
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  
        const data = await response.json();
        console.log("Fetched properties:", data);
  
        setProperties(data.properties); // Keep categories as keys
  
      } catch (err) {
        console.error("Error loading properties:", err);
        setError(err instanceof Error ? err.message : "Failed to load properties");
        setProperties({});
      } finally {
        setIsLoading(false);
      }
    };
  
    loadProperty();
  }, []);
  

  const getByCategory = (category: string) => {
    const keyMap: Record<string, string> = {
      "Duplex": "duplex",
      "Four bedroom flats": "bedroom4",
      "Three bedroom flats": "bedroom3",
      "Two bedroom flats": "bedroom2",
      "One bedroom flats": "bedroom1",
      "Selfcon": "selfcon",
      "One room": "singleroom",
      "Public House": "publichouse",
      "Public Land": "publicland",
    };
  
    const key = keyMap[category];
    if (!key || !properties[key]) return [];
  
    // Flatten nested arrays
    return properties[key].flat();
  };
  
  
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

      {/* Loading and Error States */}
      {isLoading ? (
        <Text style={styles.loadingText}>Loading properties...</Text>
      ) : error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Error: {error}</Text>
          <Text style={styles.note}>Note: Using mock data for development</Text>
        </View>
      ) : null}

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
  keyExtractor={(item) => item?.id?.toString() || Math.random().toString()}
  renderItem={({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        router.push({
          pathname: "/(tabs)/screens/PropertyDetailScreen",
          params: { id: item?.id },
        })
      }
    >
      <View style={[styles.image, !item?.image && { backgroundColor: '#e1e4e8' }]}>
        {item?.image && (
          <Image 
            source={{ uri: item.image }} 
            style={styles.image} 
            resizeMode="cover"
          />
        )}
      </View>
      <View style={styles.cardContent}>
        <Text style={styles.cardText} numberOfLines={1}>
          {typeof item?.state === 'object' ? item.state?.name || 'N/A' : item?.state || 'N/A'}
        </Text>
        <Text style={styles.cardText} >
          {typeof item?.area === 'object' ? item.area?.name || 'N/A' : item?.area || 'N/A'}
        </Text>
        <Text style={styles.cardText}>
          {typeof item?.amount === 'object' ? 
            item.amount?.toString() || 'Price not available' : 
            `₦${item?.amount?.toLocaleString()}` || 'Price not available'}
        </Text>
        <Text style={styles.cardText} >
          {typeof item?.agent === 'object' ? item.agent?.name || 'N/A' : item?.agent || 'N/A'}
        </Text>
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
  loadingText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#666',
  },
  errorContainer: {
    backgroundColor: '#fee2e2',
    padding: 15,
    margin: 10,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#ef4444',
  },
  errorText: {
    color: '#b91c1c',
    marginBottom: 5,
    fontWeight: '500',
  },
  note: {
    color: '#666',
    fontSize: 12,
    fontStyle: 'italic',
  },
});

export default Index;