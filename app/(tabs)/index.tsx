import { StyleSheet, Button, Alert, TouchableOpacity } from 'react-native';
import { Text, View } from '@/components/Themed';
import OfferList, { Operation } from '@/components/OfferList';
import Header from '@/components/Header';
import FilterBottomSheet, { FilterItem } from '../filter';
import React, { useState } from 'react';
import { Separator } from '@/components/Separator';
import ButtonCustom from '@/components/ButtonCustom';



export default function TabOneScreen() {

  const [isFilterVisible, setFilterVisible] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<FilterItem | null>(null);
  const filterItems = (filter: FilterItem) => {
    setSelectedFilter(filter);
    // Aplicar lógica de filtragem
    // ...
  };

  return (
    <View style={styles.containerMain}>
      <Header onPress={() => setFilterVisible(true)} />
      
      <Separator />
      <OfferList fiat='brl' crypto='btc' operation={Operation.Sell} />


      <FilterBottomSheet
        isVisible={isFilterVisible}
        onClose={() => setFilterVisible(false)}
        filterItems={filterItems}
        filterList={[
          { id: 1, name: 'Item 1' },
          { id: 2, name: 'Item 2' },
          // ... adicionar mais itens
        ]}
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
