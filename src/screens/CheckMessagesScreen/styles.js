import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f9f9f9",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  flyingBee: {
    width: 150,
    height: 150,
    marginTop: 16,
  },
  itemContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 8,
  },
  itemSeparator: {
    marginTop: 8,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  itemLastMessage: {
    fontSize: 12,
    color: "#888888",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#f2f2f2",
    height: 60,
  },
  footerButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  footerIcon: {
    width: 24,
    height: 24,
    marginBottom: 5,
  },
  footerButtonText: {
    fontSize: 12,
  },
});

export default styles;
