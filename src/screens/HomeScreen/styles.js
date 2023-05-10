import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    background: {
      flex: 1,
      resizeMode: "cover",
      justifyContent: "center"
    },
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      padding: 20
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20
    },
    input: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      padding: 10,
      marginBottom: 10,
      width: '100%'
    },
    button: {
      backgroundColor: '#FFD700',
      borderRadius: 5,
      padding: 10,
      width: '100%',
      alignItems: 'center',
      marginTop: 10
    },
    buttonText: {
      color: '#fff',
      fontWeight: 'bold'
    }
  });

  export default styles;