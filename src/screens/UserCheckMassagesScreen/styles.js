import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    senderMessageContainer: {
        backgroundColor: '#DCF8C5',
        borderRadius: 10,
        padding: 10,
        marginBottom: 10,
        alignSelf: 'flex-end',
        marginRight: 10,
    },
    receiverMessageContainer: {
        backgroundColor: '#F4F4F4',
        borderRadius: 10,
        padding: 10,
        marginBottom: 10,
        alignSelf: 'flex-start',
        marginLeft: 10,
    },
    messageText: {
        fontSize: 16,
    },
    timestamp: {
        fontSize: 12,
        color: 'gray',
        marginTop: 5,
    },
});
