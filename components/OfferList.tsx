import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, FlatList, NativeModules, Platform, Image } from 'react-native';
import { Text, View } from '@/components/Themed';
import { Separator } from './Separator';
import Formatter from '@/models/static/Formatter';
import Offer from '@/models/Offer';


export enum Operation {
  Sell = "sells",
  Buy = "buys"
}

type Market = {
  fiat: string;
  crypto: string;
  operation: Operation;
};

const OfferList = (props: Market) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState<Offer[]>([]);

  const market = `${props.crypto.toLowerCase()}_${props.fiat.toLowerCase()}`;

  let locale =
    Platform.OS === 'ios'
      ? NativeModules.SettingsManager.settings.AppleLocale
      : NativeModules.I18nManager.localeIdentifier;

  locale = locale.toString().replace('_', '-');

  let lastPrice = 2;

  const getLastPrice = async () => {
    try {

      const reponsePrice = await fetch(`https://bisq.markets/api/trades?market=${market}&limit=1`);
      const jsonPrice = await reponsePrice.json();
      lastPrice = Math.floor(jsonPrice[0].price);

      console.log(lastPrice);

    } catch (error) {
      console.error(error);
    }
  }

  const getOffers = async () => {
    try {

      const response = await fetch(`https://bisq.markets/api/offers?market=${market}`);
      const json = await response.json();

      console.log("load list");

      setData(json[market][props.operation]);

    } catch (error) {
      console.error(error);
    }
  };

  const loadData = async () => {
    try {

      await getOffers();
      await getLastPrice();

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <View style={styles.containerMain}>


      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={data}
          keyExtractor={({ offer_id }) => offer_id}
          renderItem={({ item }) => (

            <View style={{ paddingVertical: 8, paddingHorizontal: 20 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={styles.title}>
                  {Formatter.toCurrency(item.price, props.fiat.toLowerCase(), locale)}
                </Text>

                <View style={{ backgroundColor: '#2cb43870', height: 30, width: 110, justifyContent: 'center', borderRadius: 4 }}>
                  <Text style={{ textAlign: 'center', fontSize: 10, fontWeight: 'bold' }}>{item.payment_method}</Text>
                </View>

              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={styles.content}>
                  ₿TC (min~max):
                </Text>
                <Text style={[styles.content, styles.fontWeightBold]}>
                  {item.min_amount} ~ {item.amount}
                </Text>
              </View>
              <Separator />
            </View>
          )}
        />
      )}
    </View>
  );
};


const styles = StyleSheet.create({
  containerMain: {
    flex: 5,
  },
  content: {
    fontSize: 15,
    marginTop: 8
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold'
  },
  fontWeightBold: {
    fontWeight: 'bold'
  }
});


export default OfferList;