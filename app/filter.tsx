import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, FlatList } from 'react-native';
import Modal from 'react-native-modal';
import { Pair } from './(tabs)';


export interface FilterBottomSheetProps {
    isVisible: boolean;
    onClose: () => void;
    filterItems: (filter: Pair) => void;
    filterList: Pair[];
}


const FilterBottomSheet: React.FC<FilterBottomSheetProps> = ({ isVisible, onClose, filterItems, filterList }) => {
    const handleFilter = (selectedItem: Pair) => {
        filterItems(selectedItem);
        onClose();
    };

    return (
        <Modal isVisible={isVisible} onBackdropPress={onClose} style={styles.modal}>
            <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Select a fiat</Text>
                <FlatList
                    data={filterList}
                    keyExtractor={item => item.pair.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            onPress={() => handleFilter(item)}
                            style={styles.filterItem}
                        >
                            <Text style={styles.filterItemText}>{item.rsymbol}</Text>
                        </TouchableOpacity>
                    )}
                    style={styles.listContainer}
                />
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modal: {
        justifyContent: 'flex-end',
        margin: 0,
    },
    modalContent: {
        backgroundColor: 'white',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        padding: 20,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    listContainer: {
        maxHeight: 200,
    },
    filterItem: {
        paddingVertical: 12,
    },
    filterItemText: {
        fontSize: 16,
    },
});

export default FilterBottomSheet;
