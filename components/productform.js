import { useNavigation, useRoute } from '@react-navigation/native';
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Keyboard, StyleSheet, View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import { db } from '../service/connectionFirebase';

const ProductForm = () => {
    const [name, setName] = useState('');
    const [brand, setBrand] = useState('');
    const [type, setType] = useState('');
    const [price, setPrice] = useState('');
    const [key, setKey] = useState('');
    const navigation = useNavigation();
    const route = useRoute();

    const Separator = () => {
        return <View style={styles.separator} />;
    }

    useEffect(() => {
        if (route.params?.product) {
            setKey(route.params.product.key),
                setName(route.params.product.name),
                setBrand(route.params.product.brand),
                setType(route.params.product.type),
                setPrice(route.params.product.price)
        }
    }, [route.params?.product]);

    async function insertUpdate() {
        if (name === '') { alert('Nome deve ser informado!'); return; }
        if (brand === '') { alert('Marca deve ser informada!'); return; }
        if (price === '') { alert('Preço deve ser informado!'); return; }
        if (type === '') { alert('Tipo deve ser informado!'); return; }
        if (name.length < 4) { alert('Nome deve possuir mais de 3 caracteres!'); return; }
        if (brand.length < 4) { alert('Marca deve possuir mais de 3 caracteres!'); return; }
        if (price.length < 4) { alert('Preço deve possuir mais de 3 caracteres!'); return; }
        if (type.length < 4) { alert('Tipo deve possuir mais de 3 caracteres!'); return; }
        if (key) {
            const productRef = doc(db, 'products', key);
            await updateDoc(productRef, {
                name: name,
                brand: brand,
                type: type,
                price: price
            });
        } else {
            await addDoc(collection(db, 'products'), {
                name: name,
                brand: brand,
                type: type,
                price: price
            });
        }
        clearData();
        Keyboard.dismiss();
        setKey('');
        navigation.navigate('Products')
    }

    function clearData() {
        setName('');
        setBrand('');
        setType('');
        setPrice('');
    }

    return (
        <View style={styles.container}>
            <TextInput
                label="Nome"
                mode="outlined"
                left={<TextInput.Icon icon="briefcase" />}
                maxLength={40}
                style={styles.input}
                onChangeText={setName}
                value={name}
            />
            <Separator />
            <TextInput
                label="Marca"
                mode="outlined"
                left={<TextInput.Icon icon="sale" />}
                style={styles.input}
                onChangeText={setBrand}
                value={brand}
            />
            <Separator />
            <TextInput
                label="Tipo"
                mode="outlined"
                left={<TextInput.Icon icon="sack" />}
                style={styles.input}
                onChangeText={setType}
                value={type}
            />
            <Separator />
            <TextInput
                label="Valor"
                mode="outlined"
                left={<TextInput.Icon icon="cash" />}
                style={styles.input}
                onChangeText={setPrice}
                value={price}
            />
            <Separator />
            <Button mode="contained" onPress={insertUpdate} style={styles.button}>
                <Text style={styles.textButton}>Salvar</Text>
            </Button>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    input: {
        marginBottom: 5,
        backgroundColor: '#d6d6d6'
    },
    separator: {
        height: 5,
    },
    button: {
        marginTop: 20,
        padding: 10,
        borderRadius: 5,
    },
    textButton: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#ffffff'
    }
});

export default ProductForm;
