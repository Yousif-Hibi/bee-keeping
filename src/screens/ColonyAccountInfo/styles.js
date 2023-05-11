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
    width: 150,
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
});

export default styles;
