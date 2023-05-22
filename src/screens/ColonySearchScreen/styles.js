import { StyleSheet } from "react-native";
import { Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    width: "100%",
    height: "100%",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "black",
    marginBottom: 20,
    justifyContent: "center",
    alignContent: "center",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 5,
    margin: 20,
  },
  searchInput: {
    flex: 1,
    height: 40,
    padding: 10,
    fontSize: 16,
  },
  searchButton: {
    backgroundColor: "#ffd500",
    borderRadius: 5,
    padding: 10,
    marginLeft: 10,
  },
  searchButtonText: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
  },
  table: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginTop: 20,
    width: "100%",
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#ffd500",
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    padding: 10,
    textAlign: "center",
  },
  columnHeader: {
    flex: 1,
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
  },
  tableRow: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    padding: 10,
  },
  column: {
    flex: 1,
    width: "30%",
    textAlign: "center",
  },
});

export default styles;
