import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    // padding: 20,
  },
  title: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: "100%",
  },
  button: {
    backgroundColor: "#FFD700",
    borderRadius: 5,
    padding: 10,
    width: "100%",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  buttonText: {
    color: "black",
    fontWeight: "bold",
  },
  head: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  square: {
    backgroundColor: "#FFD700",
    borderRadius: 5,
    padding: 2.5,
    alignItems: "center",
    margin: 5,
  },

  image: {
    width: 90,
    height: 90,
    resizeMode: "contain",
  },

  texts: {
   
  },
  text: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    backgroundColor: "#FFD700",
    width: "50%",
    alignItems: "center",
    borderRadius: 10,
    padding: 2.5,
    marginRight: 5,
  },
  row: {
    backgroundColor: "#FFD700",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 2,
    alignItems: "center",
    borderRadius: 10,

    padding: 3,
  },
  label: {
    color: "black",
    flex: 2,
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 8,
  },
  txt: {
    color: "black",
    flex: 1,
    fontSize: 16,
    textAlign: "center",
  },
  sendimage: {
    width: 20,
    height: 20,
    color: "black",
  },
  titleSend: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 20,
  },
  tableHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#FFD700",
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 20,
  },
  tableHeaderText: {
    fontWeight: "bold",
    fontSize: 16,
  },
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  tableCell: {
    fontSize: 16,
  },
  Deletebutton:{
  backgroundColor: "#FFD700",
  borderRadius: 5,
  padding: 10,
  width: "100%",
  alignItems: "center",
  
  marginBottom: 20,
  },
});

export default styles;
