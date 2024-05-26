import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import * as React from 'react';
import { Button, View } from 'react-native';
import ProductForm from './components/productform';
import ProductsManager from './components/productsmanager';

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button onPress={() => navigation.goBack()} title="Go back home" />
    </View>
  );
}

function ProductsScreen() {
  return (
    <ProductsManager />
  );
}

function ProductFormScreen() {
  return (
    <ProductForm />
  );
}

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Products">
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Products" component={ProductsScreen} />
        <Drawer.Screen name="ProductForm" component={ProductFormScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}