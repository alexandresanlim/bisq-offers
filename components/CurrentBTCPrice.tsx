import Formatter from '@/models/static/Formatter';
import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, View } from 'react-native';

const CurrentBTCPrice = () => {

    const [currntBTCPrice, setCurrentBTCPrice] = useState<string>('');

    const getCurrentPrice = async () => {
        try {
    
            const tradeWs = new WebSocket('wss://ws.coincap.io/prices?assets=bitcoin')
    
            tradeWs.onmessage = function (msg) {

                var data = JSON.parse(msg.data);
                const value = Formatter.toCurrency(data.bitcoin);
                setCurrentBTCPrice(value);
            }
    
        } catch (error) {
            console.error(error);
        }
    };
    
    useEffect(() => {
        getCurrentPrice();
      }, []);

      return(

        <Text style={styles.title}>{currntBTCPrice}</Text>
      );

}

const styles = StyleSheet.create({
    title: {
      fontSize: 40,
      fontWeight: 'bold',
      color: '#fff'
    }
  });


export default CurrentBTCPrice;