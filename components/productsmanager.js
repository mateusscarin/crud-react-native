import { useNavigation } from '@react-navigation/native';
import { collection, deleteDoc, doc, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-paper';
import { db } from '../service/connectionFirebase';

export default function ProductsManager() {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();

    useEffect(() => {
        function search() {
            setLoading(true);
            onSnapshot(collection(db, 'products'), (snapshot) => {
                const prods = [];
                snapshot.forEach(documentSnapshot => {
                    prods.push({
                        ...documentSnapshot.data(),
                        key: documentSnapshot.id,
                    });
                });
                setProducts(prods.reverse());
                setLoading(false);
            });
        }
        search();
    }, []);

    async function handleDelete(key) {
        try {
            const docRef = doc(db, 'products', key);
            await deleteDoc(docRef);
            console.log('Document successfully deleted!');
        } catch (error) {
            console.error('Error removing document: ', error);
        }
    }

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.listar}>Listagem de Produtos</Text>
            </View>
            <TouchableOpacity
                style={{ bottom: 20, right: 20, backgroundColor: 'blue', padding: 10, borderRadius: 50 }}
                onPress={() => navigation.navigate('ProductForm')}
            >
                <Text style={{ color: 'white' }}>Novo</Text>
            </TouchableOpacity>
            {loading
                ? (<ActivityIndicator color="#121212" size={45} />)
                : (<FlatList
                    data={products}
                    keyExtractor={(item) => item.key}
                    renderItem={({ item }) => (
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10 }}>
                            <Text>{item.name}</Text>
                            <View style={{ flexDirection: 'row' }}>
                                <TouchableOpacity onPress={() => navigation.navigate('ProductForm', { product: item })}>
                                    <Text style={{ marginRight: 10 }}>Editar</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => handleDelete(item.key)}>
                                    <Text style={{ color: 'red' }}>Excluir</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                />

                )
            }

        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: '#121212',
        height: 40,
        fontSize: 13,
        borderRadius: 8
    },
    separator: {
        marginVertical: 5,
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#3ea6f2',
        borderWidth: 0.5,
        borderColor: '#fff',
        height: 40,
        borderRadius: 5,
    },
    buttonImageIconStyle: {
        padding: 10,
        margin: 5,
        height: 25,
        width: 25,
        resizeMode: 'stretch',
    },
    buttonTextStyle: {
        color: '#fff',
        fontSize: 20
    },
    buttonIconSeparatorStyle: {
        backgroundColor: '#fff',
        width: 1,
        height: 20,
    },
    listar: {
        fontSize: 20,
        textAlign: 'center',
        marginTop: 20
    },
    title: {
        textAlign: 'center',
    },
}); 