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
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "black",
    marginBottom: 20,
    justifyContent: "center",
    alignContent: "center",
    textAlign: "center",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 10,
    justifyContent: "space-between", // Align items with space between them
  },
  searchInput: {
    flex: 1, // Let the search input take available space
    height: 40,
    padding: 10,
    fontSize: 16,
  },
  searchButton: {
    backgroundColor: "#ffd500",
    borderRadius: 5,
    marginLeft: 5,

    width: 150,
    alignItems: "center",
    alignContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  cont: {
    borderColor: "#ccc",
    borderRadius: 2,
    height: "100%",
    width: 150,
  },
  filterPicker: {
    backgroundColor: "#fff",
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
    marginLeft: 2,
    marginRight: 2,
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
