import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  TextInput,
  Image,
  SafeAreaView,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";

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
];

const money = (amount) => `UGX ${amount.toLocaleString()}`;

export default function App() {
  const [screen, setScreen] = useState("home");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState([]);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      const matchesCategory =
        category === "All" || product.category === category;

      const matchesSearch = product.name
        .toLowerCase()
        .includes(search.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [category, search]);

  const openProduct = (product) => {
    setSelectedProduct(product);
    setScreen("product");
  };

  const addToCart = (product) => {
    setCart([...cart, product]);
    Alert.alert(
      "Added to cart",
      `${product.name} has been added to your cart.`
    );
  };

  if (screen === "product" && selectedProduct) {
    return (
      <SafeAreaView style={styles.safe}>
        <StatusBar style="light" />

        <View style={styles.topBar}>
          <Pressable onPress={() => setScreen("home")}>
            <Ionicons name="arrow-back" size={26} color="#fff" />
          </Pressable>

          <Text style={styles.topTitle}>Product Details</Text>

          <Pressable onPress={() => setScreen("cart")}>
            <Ionicons name="cart-outline" size={26} color="#fff" />
          </Pressable>
        </View>

        <FlatList
          data={[selectedProduct]}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View>
              <Image source={{ uri: item.image }} style={styles.heroImage} />

              <View style={styles.productDetails}>
                <Text style={styles.categoryLabel}>{item.category}</Text>

                <Text style={styles.heroName}>{item.name}</Text>

                <Text style={styles.heroPrice}>
                  {money(item.price)}
                </Text>

                <Text style={styles.description}>
                  Quality product available from Mobile Shop UGA.
                  Contact us for availability, delivery and payment
                  options.
                </Text>

                <Pressable
                  style={styles.buyButton}
                  onPress={() => addToCart(item)}
                >
                  <Ionicons
                    name="cart"
                    size={21}
                    color="#fff"
                  />
                  <Text style={styles.buyText}>Add to Cart</Text>
                </Pressable>
              </View>
            </View>
          )}
        />
      </SafeAreaView>
    );
  }

  if (screen === "cart") {
    return (
      <SafeAreaView style={styles.safe}>
        <StatusBar style="light" />

        <View style={styles.topBar}>
          <Pressable onPress={() => setScreen("home")}>
            <Ionicons name="arrow-back" size={26} color="#fff" />
          </Pressable>

          <Text style={styles.topTitle}>My Cart</Text>

          <View />
        </View>

        {cart.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Ionicons
              name="cart-outline"
              size={75}
              color="#2563eb"
            />

            <Text style={styles.emptyTitle}>
              Your cart is empty
            </Text>

            <Text style={styles.emptyText}>
              Choose a phone, TV or laptop to start shopping.
            </Text>

            <Pressable
              style={styles.buyButton}
              onPress={() => setScreen("home")}
            >
              <Text style={styles.buyText}>
                Continue Shopping
              </Text>
            </Pressable>
          </View>
        ) : (
          <FlatList
            data={cart}
            keyExtractor={(_, index) => index.toString()}
            contentContainerStyle={{ padding: 15 }}
            renderItem={({ item }) => (
              <View style={styles.cartItem}>
                <Image
                  source={{ uri: item.image }}
                  style={styles.cartImage}
                />

                <View style={{ flex: 1 }}>
                  <Text style={styles.cartName}>
                    {item.name}
                  </Text>

                  <Text style={styles.price}>
                    {money(item.price)}
                  </Text>
                </View>
              </View>
            )}
            ListFooterComponent={
              <Pressable
                style={styles.buyButton}
                onPress={() =>
                  Alert.alert(
                    "Checkout",
                    "Payment and delivery integration can be added next."
                  )
                }
              >
                <Text style={styles.buyText}>
                  Checkout
                </Text>
              </Pressable>
            }
          />
        )}
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="light" />

      <View style={styles.header}>
        <View>
          <Text style={styles.brand}>Mobile Shop UGA</Text>

          <Text style={styles.sub}>
            Phones • TVs • Laptops
          </Text>
        </View>

        <Pressable
          style={styles.cartButton}
          onPress={() => setScreen("cart")}
        >
          <Ionicons
            name="cart-outline"
            size={25}
            color="#fff"
          />

          {cart.length > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>
                {cart.length}
              </Text>
            </View>
          )}
        </Pressable>
      </View>

      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <>
            <Text style={styles.welcome}>
              Find your next device
            </Text>

            <View style={styles.searchBox}>
              <Ionicons
                name="search"
                size={20}
                color="#64748b"
              />

              <TextInput
                placeholder="Search phones, TVs, laptops"
                value={search}
                onChangeText={setSearch}
                style={styles.searchInput}
              />
            </View>

            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={["All", "Phones", "TVs", "Laptops"]}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <Pressable
                  onPress={() => setCategory(item)}
                  style={[
                    styles.chip,
                    category === item &&
                      styles.chipActive,
                  ]}
                >
                  <Text
                    style={[
                      styles.chipText,
                      category === item &&
                        styles.chipTextActive,
                    ]}
                  >
                    {item}
                  </Text>
                </Pressable>
              )}
            />
          </>
        }
        renderItem={({ item }) => (
          <Pressable
            style={styles.card}
            onPress={() => openProduct(item)}
          >
            <Image
              source={{ uri: item.image }}
              style={styles.productImage}
            />

            <Text style={styles.categoryLabel}>
              {item.category}
            </Text>

            <Text
              style={styles.productName}
              numberOfLines={2}
            >
              {item.name}
            </Text>

            <Text style={styles.price}>
              {money(item.price)}
            </Text>
          </Pressable>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
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
    paddingHorizontal: 18,
    paddingVertical: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  brand: {
    color: "#fff",
    fontSize: 23,
    fontWeight: "900",
  },

  sub: {
    color: "#cbd5e1",
    marginTop: 4,
  },

  cartButton: {
    backgroundColor: "#1e293b",
    padding: 11,
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
    fontWeight: "900",
  },

  list: {
    padding: 14,
  },

  welcome: {
    fontSize: 24,
    fontWeight: "900",
    color: "#0f172a",
    marginBottom: 12,
  },

  searchBox: {
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 14,
    paddingHorizontal: 13,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },

  searchInput: {
    flex: 1,
    marginLeft: 9,
    fontSize: 15,
  },

  chip: {
    paddingHorizontal: 17,
    paddingVertical: 10,
    borderRadius: 22,
    backgroundColor: "#e2e8f0",
    marginRight: 8,
    marginBottom: 14,
  },

  chipActive: {
    backgroundColor: "#2563eb",
  },

  chipText: {
    color: "#334155",
    fontWeight: "800",
  },

  chipTextActive: {
    color: "#fff",
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 17,
    padding: 9,
    margin: 5,
    flex: 1,
    elevation: 2,
  },

  productImage: {
    width: "100%",
    height: 145,
    borderRadius: 12,
    backgroundColor: "#e2e8f0",
  },

  categoryLabel: {
    color: "#2563eb",
    fontSize: 12,
    fontWeight: "900",
    marginTop: 8,
    textTransform: "uppercase",
  },

  productName: {
    fontSize: 15,
    fontWeight: "800",
    marginTop: 3,
    color: "#0f172a",
  },

  price: {
    fontSize: 15,
    fontWeight: "900",
    marginTop: 7,
    color: "#0f172a",
  },

  topBar: {
    height: 60,
    paddingHorizontal: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#0f172a",
  },

  topTitle: {
    color: "#fff",
    fontSize: 19,
    fontWeight: "900",
  },

  heroImage: {
    width: "100%",
    height: 330,
    backgroundColor: "#e2e8f0",
  },

  productDetails: {
    padding: 18,
  },

  heroName: {
    fontSize: 28,
    fontWeight: "900",
    marginTop: 5,
    color: "#0f172a",
  },

  heroPrice: {
    fontSize: 22,
    fontWeight: "900",
    color: "#2563eb",
    marginTop: 10,
  },

  description: {
    fontSize: 16,
    lineHeight: 24,
    color: "#475569",
    marginVertical: 18,
  },

  buyButton: {
    backgroundColor: "#2563eb",
    padding: 16,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
    marginTop: 10,
  },

  buyText: {
    color: "#fff",
    fontWeight: "900",
    fontSize: 16,
  },

  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 30,
  },

  emptyTitle: {
    fontSize: 23,
    fontWeight: "900",
    marginTop: 15,
  },

  emptyText: {
    textAlign: "center",
    color: "#64748b",
    margin: 18,
    fontSize: 15,
  },

  cartItem: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 10,
    marginBottom: 10,
    flexDirection: "row",
    gap: 12,
  },

  cartImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },

  cartName: {
    fontWeight: "800",
    fontSize: 16,
    marginTop: 8,
  },
});
