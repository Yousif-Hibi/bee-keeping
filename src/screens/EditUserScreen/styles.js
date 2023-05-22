import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    labelContainer: {
        backgroundColor: '#FFD700',
        borderRadius: 5,
        marginBottom: 5,
        // width: '15%',
        alignSelf: 'flex-start',
    },
    labelText: {
        fontSize: 16,
        fontWeight: 'bold',
        margin: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 4,
        padding: 10,
        marginBottom: 10,
        backgroundColor: "white",
    },
    saveButton: {
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
    loadingText: {
        fontSize: 18,
        textAlign: "center",
        marginTop: 20,
    
    },
    toggleContainer: {
        backgroundColor: '#FFD700',
        borderRadius: 5,
        marginBottom: 5,
       paddingRight: 5,
        alignSelf: 'flex-start',
        flexDirection: "row",
        alignItems: "center",
        
    },
    switch: {
        marginLeft: 10,
    },



    tableContainer: {
        marginTop: 16,
        borderWidth: 1,
        borderColor: "#ccc",
    },
    tableHeader: {
        flexDirection: "row",
        backgroundColor: '#FFD700',
        paddingVertical: 8,
        paddingHorizontal: 16,
    },
    tableHeaderText: {
        flex: 1,
        fontWeight: "bold",
    },
    tableRow: {
        flexDirection: "row",
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
        paddingVertical: 8,
        paddingHorizontal: 16,
    },
    tableCell: {
        flex: 1,
        width: '33%',
        backgroundColor:'white',
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 8,
    },
});

export default styles;