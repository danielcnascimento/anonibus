import { StyleSheet } from 'react-native'


export default StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',

    },
    containerLogo: {
        flex: 1,
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '90%'
    },
    input: {
        backgroundColor: '#fff',
        width: '90%',
        height: 50,
        marginBottom: 15,
        color: '#222',
        fontSize: 18,
        borderRadius: 7,
        padding: 10
    },

    btnSubmit: {
        backgroundColor: '#fff',
        width: '90%',
        height: 55,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 7,
        marginBottom: 15,
    },
    submitText: {
        fontSize: 22,
        fontWeight: 'bold'
    },

    btnContainer: {
        flexDirection: 'row',
        width: '90%',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    btnIcon: {
        width: 35,
        height: 35,
    },
    btnIconMenu: {
        width: 35,
        height: 35,

    },
    arrowRight: {
        width: 25,
        height: 25,
    },
    containerMenu: {
        flex: 1,
        width: '80%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        marginBottom: 15,
    }
})