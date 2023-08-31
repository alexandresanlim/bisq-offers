import { StyleSheet, Button, Alert, TouchableOpacity } from 'react-native';
import { Text, View } from '@/components/Themed';
import OfferList, { Operation } from '@/components/OfferList';
import Header from '@/components/Header';
import React, { useEffect, useState } from 'react';
import { Separator } from '@/components/Separator';
import ButtonCustom from '@/components/ButtonCustom';
import FilterBottomSheet from '../filter';

export class Pair {
  pair;
  lsymbol;
  rsymbol: string;
  rtype: string;
  pairPresentation;

  constructor(pair: string, lsymbol: string, rsymbol: string, rtype: string, pairPresentation: string) {
    this.pair = pair;
    this.rtype = rtype;
    this.lsymbol = lsymbol;
    this.rsymbol = rsymbol;
    this.pairPresentation = pairPresentation;
  }

}

export default function TabOneScreen() {

  const [pairList, setPairList] = useState<Pair[]>([]);



  const getPairList = async () => {
    try {

      const response = await fetch('https://bisq.markets/api/markets');
      const json = await response.json();


      const pairValues: Pair[] = [];

      for (const key in json) {
        if (json.hasOwnProperty(key)) {

          const prop = json[key]
          const pair = new Pair(prop.pair, prop.lsymbol, prop.rsymbol, prop.rtype, `${prop.lsymbol} - ${prop.rsymbol}`)

          if (pair.rtype === 'fiat')
            pairValues.push(pair);
        }
      }

      setPairList(pairValues);

      //console.log(pairValues);

      //setData(json['pair']);

    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getPairList();
  }, []);

  const [isFilterVisible, setFilterVisible] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<Pair>(new Pair('btc_usd', 'BTC', 'USD', 'fiat', 'BTC - USD'));
  const filterItems = (filter: Pair) => {
    setSelectedFilter(filter);

    console.log(`selecionado ${filter.lsymbol}`)
    // Aplicar lógica de filtragem
    // ...
  };

  return (
    <View style={styles.containerMain}>
      <Header onPress={() => setFilterVisible(true)} />

      <Separator />
      <OfferList fiat={selectedFilter.rsymbol} crypto={selectedFilter.lsymbol} operation={Operation.Sell} />


      <FilterBottomSheet
        isVisible={isFilterVisible}
        onClose={() => setFilterVisible(false)}
        filterItems={filterItems}
        filterList={pairList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  containerMain: {
    flex: 1,
  },
  selectedPair: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black'
  }
});
