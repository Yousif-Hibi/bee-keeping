import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    width: "100%",
  },
  button: {
    borderRadius: 5,
    padding: 10,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "balck",
    fontWeight: "bold",
  },
  square: {
    backgroundColor: "#FFD700",
    borderRadius: 5,
    padding: 10,
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginTop: 10,
  },
  textRed: {
    color: "red",
  },
  textBlue: {
    color: "blue",
  },
  text: {
    color: "black",
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "right",
  },
  image: {
    width: 30,
    height: 30,
    textAlign: "left",
  },
  imagePop: {
    width: "100%",
    height: "90%",
    textAlign: "left",
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "100%",
    height: "100%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sendButton: {
    backgroundColor: "#FFD700",
    padding: 10,
    borderRadius: 10,
    overflow: "hidden",
    marginRight: 10,
  },
  closeButton: {
    backgroundColor: "#FFD700",
    padding: 10,
    borderRadius: 10,
    overflow: "hidden",
  },
  inputContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#CCCCCC",
    backgroundColor: "#ffffff",
  },
});

export default styles;
