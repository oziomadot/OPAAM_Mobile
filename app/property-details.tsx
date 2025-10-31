import { useLocalSearchParams } from 'expo-router';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';

export default function PropertyDetails() {
  const { id } = useLocalSearchParams();
  
  // In a real app, you would fetch the property details using the id
  // For now, we'll use mock data
  const property = {
    id: id as string,
    title: 'Luxury Apartment',
    location: 'Lagos, Nigeria',
    price: '$250,000',
    description: 'Beautiful luxury apartment with modern amenities',
    bedrooms: 3,
    bathrooms: 2,
    size: '1200 sq ft',
    images: [
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    ],
  };

  return (
    <ScrollView style={styles.container}>
      <Image 
        source={{ uri: property.images[0] }} 
        style={styles.image} 
        resizeMode="cover"
      />
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{property.title}</Text>
        <Text style={styles.location}>{property.location}</Text>
        <Text style={styles.price}>{property.price}</Text>
        
        <View style={styles.features}>
          <Text style={styles.feature}>{property.bedrooms} Bedrooms</Text>
          <Text style={styles.feature}>{property.bathrooms} Bathrooms</Text>
          <Text style={styles.feature}>{property.size}</Text>
        </View>
        
        <Text style={styles.description}>{property.description}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 300,
  },
  detailsContainer: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  location: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  price: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 16,
  },
  features: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  feature: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    marginRight: 8,
    marginBottom: 8,
    fontSize: 14,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
  },
});
