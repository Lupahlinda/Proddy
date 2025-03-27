import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Sobre = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Sobre o Aplicativo</Text>
            <Text style={styles.description}>
                Este aplicativo é um projeto desenvolvido para fins de estudo no ensino superior. 
                Ele tem como objetivo explorar conceitos de desenvolvimento de software e aprimorar 
                habilidades práticas em programação.
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    description: {
        fontSize: 16,
        textAlign: 'center',
        color: '#333',
    },
});

export default Sobre;