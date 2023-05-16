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
  button: {
    width: 80,
    height: 80,
    backgroundColor: "#FFD700",
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    flexDirection: "row",
    // marginHorizontal: ,
  },
  buttonText: {
    fontSize: 25,
    fontWeight: "bold",
    color: "black",
    alignItems: "center",
  },
  count: {
    fontSize: 30,
    marginTop: 20,
    fontWeight: "bold",
    alignItems: "center",
    justifyContent: "center",
  },
  submitButton: {
    width: '100%',
    height: 80,
    margin: 40,
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
  },
  row: {
    flexDirection: "row",
    width: '100%',
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
});

export default styles;