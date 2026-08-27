import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TextInput,
  Pressable,
  SafeAreaView,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";

/*
====================================================
MOBILE SHOP UGA
ADD YOUR PRODUCTS HERE
====================================================

To add a product, copy this example:

{
  id: "7",
  name: "Tecno Camon 30",
  category: "Phones",
  price: 850000,
  image: "IMAGE_URL_HERE",
},

Use:
Phones
TVs
Laptops

Price must be written as a number in UGX.
====================================================
*/

const PRODUCTS = [
  {
    id: "1",
    name: "Samsung Galaxy A15",
    category: "Phones",
    price: 650000,
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=700",
  },

  {
    id: "2",
    name: "iPhone 15",
    category: "Phones",
    price: 2850000,
    image:
      "https://images.unsplash.com/photo-1591337676887-a217a6970a8a?w=700",
  },

  {
    id: "3",
    name: 'Samsung Smart TV 43"',
    category: "TVs",
    price: 1250000,
    image:
      "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=700",
  },

  {
    id: "4",
    name: 'LG Smart TV 55"',
    category: "TVs",
    price: 2100000,
    image:
      "https://images.unsplash.com/photo-1593784991095-a205069470b6?w=700",
  },

  {
    id: "5",
    name: "HP Laptop 15",
    category: "Laptops",
    price: 1850000,
    image:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=700",
  },

  {
    id: "6",
    name: "MacBook Air M2",
    category: "Laptops",
    price: 3900000,
    image:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=700",
  },

  // ==================================================
  // ADD NEW PRODUCTS BELOW THIS LINE
  // ==================================================

  // {
  //   id: "7",
  //   name: "Tecno Camon 30",
  //   category: "Phones",
  //   price: 850000,
  //   image: "IMAGE_URL_HERE",
  // },

  // {
  //   id: "8",
  //   name: "HP EliteBook",
  //   category: "Laptops",
  //   price: 1800000,
  //   image: "IMAGE_URL_HERE",
  // },
  {
    id: "7",
    name: "iPhone 11 Pro Max",
    category: "Phones",
    price: 950000,
    image:
      "https://raw.githubusercontent.com/Shafiqkabala/mobile-shop-uga/main/iphone-11-pro-max.jpg",
  },
  {
    id: "8",
    name: "Samsung Note 10",
    category: "Phones",
    price: 950000,
    image:
      "https://raw.githubusercontent.com/Shafiqkabala/mobile-shop-uga/main/samsung-note-10.jpg",
  },
];
const formatPrice = (price) => {
  return "UGX " + price.toLocaleString();
};

export default function App() {
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState([]);

  const filteredProducts = PRODUCTS.filter((product) => {
    const categoryMatch =
      category === "All" || product.category === category;

    const searchMatch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    return categoryMatch && searchMatch;
  });

  const addToCart = (product) => {
    setCart([...cart, product]);

    Alert.alert(
      "Added to Cart",
      product.name + " has been added to your cart."
    );
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="light" />

      {/* HEADER */}
      <View style={styles.header}>
        <View>
          <Text style={styles.logo}>Mobile Shop UGA</Text>
          <Text style={styles.subtitle}>
            Phones • TVs • Laptops
          </Text>
        </View>

        <View style={styles.cart}>
          <Ionicons
            name="cart-outline"
            size={27}
            color="#fff"
          />

          {cart.length > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>
                {cart.length}
              </Text>
            </View>
          )}
        </View>
      </View>

      {/* CONTENT */}
      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <View>
            <Text style={styles.title}>
              Find your next device
            </Text>

            {/* SEARCH */}
            <View style={styles.searchBox}>
              <Ionicons
                name="search"
                size={20}
                color="#64748b"
              />

              <TextInput
                placeholder="Search products"
                value={search}
                onChangeText={setSearch}
                style={styles.searchInput}
              />
            </View>

            {/* CATEGORIES */}
            <View style={styles.categories}>
              {["All", "Phones", "TVs", "Laptops"].map(
                (item) => (
                  <Pressable
                    key={item}
                    onPress={() => setCategory(item)}
                    style={[
                      styles.categoryButton,
                      category === item &&
                        styles.categoryActive,
                    ]}
                  >
                    <Text
                      style={[
                        styles.categoryText,
                        category === item &&
                          styles.categoryTextActive,
                      ]}
                    >
                      {item}
                    </Text>
                  </Pressable>
                )
              )}
            </View>
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image
              source={{ uri: item.image }}
              style={styles.productImage}
            />

            <Text style={styles.productCategory}>
              {item.category}
            </Text>

            <Text
              style={styles.productName}
              numberOfLines={2}
            >
              {item.name}
            </Text>

            <Text style={styles.price}>
              {formatPrice(item.price)}
            </Text>

            <Pressable
              style={styles.addButton}
              onPress={() => addToCart(item)}
            >
              <Ionicons
                name="cart"
                size={17}
                color="#fff"
              />

              <Text style={styles.addText}>
                Add to Cart
              </Text>
            </Pressable>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.noProducts}>
            No products found.
          </Text>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },

  header: {
    backgroundColor: "#0f172a",
    padding: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  logo: {
    color: "#fff",
    fontSize: 23,
    fontWeight: "bold",
  },

  subtitle: {
    color: "#cbd5e1",
    marginTop: 4,
  },

  cart: {
    position: "relative",
    backgroundColor: "#1e293b",
    padding: 12,
    borderRadius: 14,
  },

  badge: {
    position: "absolute",
    right: -5,
    top: -5,
    backgroundColor: "#ef4444",
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  badgeText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "bold",
  },

  list: {
    padding: 12,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#0f172a",
    marginBottom: 12,
  },

  searchBox: {
    backgroundColor: "#fff",
    height: 50,
    borderRadius: 14,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e2e8f0",
    marginBottom: 12,
  },

  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 15,
  },

  categories: {
    flexDirection: "row",
    marginBottom: 12,
  },

  categoryButton: {
    backgroundColor: "#e2e8f0",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 7,
  },

  categoryActive: {
    backgroundColor: "#2563eb",
  },

  categoryText: {
    color: "#334155",
    fontWeight: "bold",
  },

  categoryTextActive: {
    color: "#fff",
  },

  card: {
    flex: 1,
    backgroundColor: "#fff",
    margin: 5,
    padding: 9,
    borderRadius: 16,
    elevation: 2,
  },

  productImage: {
    width: "100%",
    height: 140,
    borderRadius: 12,
    backgroundColor: "#e2e8f0",
  },

  productCategory: {
    color: "#2563eb",
    fontSize: 11,
    fontWeight: "bold",
    marginTop: 7,
  },

  productName: {
    color: "#0f172a",
    fontSize: 15,
    fontWeight: "bold",
    marginTop: 3,
  },

  price: {
    color: "#0f172a",
    fontSize: 15,
    fontWeight: "bold",
    marginTop: 7,
  },

  addButton: {
    backgroundColor: "#2563eb",
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 9,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },

  addText: {
    color: "#fff",
    fontWeight: "bold",
    marginLeft: 5,
  },

  noProducts: {
    textAlign: "center",
    marginTop: 30,
    color: "#64748b",
    fontSize: 16,
  },
});
