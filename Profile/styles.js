import { StyleSheet } from 'react-native'
import Constants from 'expo-constants'


export default StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: "#000",
        paddingTop: Constants.statusBarHeight + 10,
        padding: 10,

    },
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    iconArrowLeftContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        alignItems: 'center'
    },
    iconLogo: {
        width: 50,
        height: 50
    },
    containerProfile: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    photoProfile: {
        borderWidth: 2,
        borderColor: '#fff',
        borderRadius: 100,
        padding: 20,
        width: 150,
        height: 150
    },
    textname: {
        color: '#fff',
        fontSize: 32

    },
    containerMenu: {
        flex: 1,
    },

    itemMenu: {
        width: '100%',
        alignItems: 'center',
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#fff',
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#fff'
    },
    textMenu: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    textMenuDelete: {
        color: 'red',
        fontSize: 18,
        fontWeight: 'bold'
    }
})