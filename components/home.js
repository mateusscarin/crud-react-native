import * as React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Card } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Image } from 'react-native-web';
export default function App() {
  return (
    <ScrollView style={{ height: '100%' }}>
      <View style={styles.container}>
        <Text style={styles.titleHome}>Bem vindo, <b>Mateus Scarin</b>!</Text>
        <Image style={styles.imageHome} source={require('./../assets/favicon_symptoscan_concept.png')} />
        <Text style={styles.services}><b>Serviços</b></Text>
        <View style={styles.containerCards}> {/* view cards */}
          <Card style={styles.card}>
            <Card.Content style={styles.containerCard}>
              <Icon name="plus-circle" color="#4682B4" style={styles.iconCard} />
              <Text variant="titleLarge" style={styles.titleCard}>Atendimento</Text>
            </Card.Content>
          </Card>
          <Card style={styles.card}>
            <Card.Content style={styles.containerCard}>
              <Icon name="history" color="#4682B4" style={styles.iconCard} />
              <Text variant="titleLarge" style={styles.titleCard}>Histórico</Text>
            </Card.Content>
          </Card>
        </View>
        <View style={styles.containerCards}> {/* view cards */}
          <Card style={styles.card}>
            <Card.Content style={styles.containerCard}>
              <Icon name="map-marker" color="#4682B4" style={styles.iconCard} />
              <Text variant="titleLarge" style={styles.titleCard}>Mapa</Text>
            </Card.Content>
          </Card>
          <Card style={styles.card}>
            <Card.Content style={styles.containerCard}>
              <Icon name="hospital" color="#4682B4" style={styles.iconCard} />
              <Text variant="titleLarge" style={styles.titleCard}>Unidades</Text>
            </Card.Content>
          </Card>
        </View>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  iconTabRound: {
    width: 60,
    height: 90,
    borderRadius: 30,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 6,
    shadowColor: '#9C27B0',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  titleHome: {
    display: 'flex',
    fontSize: 20,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  imageHome: {
    width: 200,
    height: 200,
    justifyContent: 'center',
  },
  services: {
    display: 'flex',
    fontSize: 25,
    marginTop: 20,
    marginBottom: 10
  },
  containerCards: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  containerCard: {
    display: 'flex',
    alignItems: 'center',
    width: 150
  },
  card: {
    marginRight: 10,
  },
  titleCard: {
    fontSize: 16,
  },
  iconCard: {
    fontSize: 20,
  }
});