import { useNavigation, useRoute } from '@react-navigation/native';
import 'firebase/firestore';
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Button, Keyboard, StyleSheet, View } from 'react-native';
import { TextInput } from 'react-native-paper';
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
        <View style={{ flex: 1, padding: 20 }}>
            <TextInput
                placeholder="Nome"
                left={< TextInput.Icon icon="briefcase" />}
                maxLength={40}
                style={styles.input}
                onChangeText={setName}
                value={name}
            />
            <Separator />
            <TextInput
                placeholder="Marca"
                left={<TextInput.Icon icon="sale" />}
                style={styles.input}
                onChangeText={(texto) => setBrand(texto)}
                value={brand}
            />
            <Separator />
            <TextInput
                placeholder="Tipo"
                left={<TextInput.Icon icon="sack" />}
                style={styles.input}
                onChangeText={(texto) => setType(texto)}
                value={type}
            />
            <Separator />
            <TextInput
                placeholder="Valor"
                left={<TextInput.Icon icon="cash" />}
                style={styles.input}
                onChangeText={setPrice}
                value={price}
            />
            <Separator />
            <Button title="Salvar" onPress={insertUpdate} />
        </View >
    );
};


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

export default ProductForm;

