import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
    backgroundColor: "#F1E7AB",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#f2f2f2",
    height: 60,
  },
  pickerContainer: {
    backgroundColor: "#FFED87",

    marginBottom: 2,

    borderRadius: 10,
    padding: 3,
    width: "100%",
    borderColor: "#ccc",
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
    backgroundColor: "#FFE449",
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
    backgroundColor: "#ffebd5",
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
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    flex: 1, // Add flex property
    justifyContent: "center", // Add justifyContent property
  },

  text: {
    backgroundColor: "#ffebd5",
    width: "50%",
    alignItems: "center",
  },

  row: {
    backgroundColor: "#FFED87",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 2,
    alignItems: "center",
    borderRadius: 10,

    padding: 3,
  },
  row2: {
    backgroundColor: "#FFE449",
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
    marginLeft: 8,
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
    backgroundColor: "#FFE449",
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 20,
  },
  tableHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#FFED87",
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 20,
  },
  tableHeaderText: {
    fontWeight: "bold",
    fontSize: 16,
    flex: 1, // Add flex property
    textAlign: "center",
    alignSelf: "center", // Add alignSelf property
  },

  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#ffebd5",
  },
  tableCell: {
    fontSize: 16,
    textAlign: "center",
    flex: 1, // Add flex property
    justifyContent: "center", // Add justifyContent property
  },

  Deletebutton: {
    backgroundColor: "#FFED87",
    borderRadius: 10,
    padding: 10,
    marginLeft: 50,
    marginRight: 50,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  editbutton: {
    backgroundColor: "#FFED87",
    borderRadius: 10,
    padding: 10,
    marginLeft: 50,
    marginRight: 50,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 5,
  },
});

export default styles;
