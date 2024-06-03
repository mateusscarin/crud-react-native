import { useNavigation } from '@react-navigation/native';
import { collection, deleteDoc, doc, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native';
import { Button, Card, Dialog, FAB, PaperProvider, Paragraph, Portal, Text } from 'react-native-paper';
import { db } from '../service/connectionFirebase';

export default function ProductsManager() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [visible, setVisible] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
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

    const showDialog = (product) => {
        setSelectedProduct(product);
        setVisible(true);
    };

    const hideDialog = () => {
        setSelectedProduct(null);
        setVisible(false);
    };

    async function handleDelete() {
        if (selectedProduct) {
            try {
                const docRef = doc(db, 'products', selectedProduct.key);
                await deleteDoc(docRef);
                console.log('Document successfully deleted!');
            } catch (error) {
                console.error('Error removing document: ', error);
            }
            hideDialog();
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.listar}>Listagem de Produtos</Text>
            {loading
                ? (<ActivityIndicator color="#6200ee" size={45} />)
                : (<FlatList
                    data={products}
                    keyExtractor={(item) => item.key}
                    renderItem={({ item }) => (
                        <Card style={styles.card}>
                            <Card.Title style={styles.titleCard} title={item.name} />
                            <Card.Content>
                                <Text>Marca: {item.brand}</Text>
                                <Text>Tipo: {item.type}</Text>
                                <Text>Preço: {item.price}</Text>
                            </Card.Content>
                            <Card.Actions>
                                <Button textColor='#969696' style={styles.buttonEdit} onPress={() => navigation.navigate('ProductForm', { product: item })}>Editar</Button>
                                <Button textColor='white' style={styles.buttonDelete} onPress={() => showDialog(item)}>Excluir</Button>
                            </Card.Actions>
                        </Card>
                    )}
                />)
            }
            <FAB
                style={styles.fab}
                icon="plus"
                color="white"
                onPress={() => navigation.navigate('ProductForm')}
            />
            <View style={styles.portal}>
                <PaperProvider>
                    <Portal>
                        <Dialog visible={visible} onDismiss={hideDialog}>
                            <Dialog.Title>Confirmar Exclusão</Dialog.Title>
                            <Dialog.Content>
                                <Paragraph>Tem certeza que deseja excluir o produto {selectedProduct?.name}?</Paragraph>
                            </Dialog.Content>
                            <Dialog.Actions>
                                <Button onPress={hideDialog}>Cancelar</Button>
                                <Button onPress={handleDelete}>Excluir</Button>
                            </Dialog.Actions>
                        </Dialog>
                    </Portal>
                </PaperProvider >
            </View >
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f4f4f4',
        paddingHorizontal: 16,
        paddingVertical: 24,
    },
    listar: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 20,
        color: '#6200ee',
    },
    card: {
        marginVertical: 10,
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 4,
        backgroundColor: '#fafafa'
    },
    buttonEdit: {
        borderRadius: 5,
        color: '#fff'
    },
    buttonDelete: {
        borderRadius: 5,
        backgroundColor: '#6200ee',
        color: '#fff',
    },
    titleCard: {
        color: '#000',
        textTransform: 'uppercase',
    },
    fab: {
        position: 'absolute',
        right: 16,
        bottom: 16,
        backgroundColor: '#6200ee',
    },
    portal: {
        position: 'absolute',
        bottom: '50%',
        width: '100vw',
        right: 0
    },
});
