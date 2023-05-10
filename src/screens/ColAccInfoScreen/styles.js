import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      backgroundColor: "#f0f0f0",
      borderRadius: 50,
      paddingHorizontal: 10,
      paddingVertical: 5,
    },
    button: {
      width: 30,
      height: 30,
      backgroundColor: "#e0e0e0",
      borderRadius: 15,
      alignItems: "center",
      justifyContent: "center",
    },
    buttonText: {
      fontSize: 20,
      fontWeight: "bold",
    },
    count: {
      fontSize: 20,
      fontWeight: "bold",
    },
  });

export default styles;