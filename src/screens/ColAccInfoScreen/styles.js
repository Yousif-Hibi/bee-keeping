import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    // justifyContent: 'flex-start', // align items at the top
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    alignItems: "center",
    textAlign: "center",
    margin: 30,
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  button: {
    width: 50,
    height: 50,
    backgroundColor: "#FFD700",
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 10,
  },
  count: {
    fontSize: 30,
    fontWeight: "bold",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 25,
    fontWeight: "bold",
    color: "black",
    alignItems: "center",
  },
  submitButton: {
    width: "70%",
    height: 50,
    margin: 70,
    backgroundColor: "#FFD700",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 4,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  submitButtonText: {
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 25,
  },
  homeIcon: {
    marginRight: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginBottom: 20,
  },
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  table: {
    marginTop: 20,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5,
    padding: 10,
    backgroundColor: "white",
    opacity:0.6,
  },
  row: {
    flexDirection: "row",
    width: "100%",
    marginBottom: 10,
  },
  column: {
    flex: 1,
    alignItems: "center",
  },
  columnText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5,
    padding: 10,
    backgroundColor: "white",
  },
});

export default styles;
