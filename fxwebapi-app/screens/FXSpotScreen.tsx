import React, { useState } from 'react';
import { NavigationStackScreenProps } from "react-navigation-stack";
import { View, Text } from "react-native";
import { text, colors } from '../styles';
import { MaterialIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { UIAddRound } from '../components/Buttons';
import { FilterList } from '../components/FilterList';
import { TransactionItem } from '../components/TransactionItem';

interface FXSpotScreenProps extends NavigationStackScreenProps { };

const MOCK_TRANSACTIONS = [
  {
    currencies: 'EUR USD',
    date: '07.10.2019 | 16:00',
    amount: 250
  },
  {
    currencies: 'EUR GBP',
    date: '13.12.2019 | 15:00',
    amount: 340.5
  },
  {
    currencies: 'USD EUR',
    date: '22.12.2019 | 09:00',
    amount: 250
  },
  {
    currencies: 'USD EUR',
    date: '22.12.2019 | 09:00',
    amount: 250
  },
  {
    currencies: 'USD EUR',
    date: '22.12.2019 | 09:00',
    amount: 250
  },
  {
    currencies: 'USD EUR',
    date: '22.12.2019 | 09:00',
    amount: 250
  },
  {
    currencies: 'USD EUR',
    date: '22.12.2019 | 09:00',
    amount: 250
  },
  {
    currencies: 'USD EUR',
    date: '22.12.2019 | 09:00',
    amount: 250
  },
];

export default function FXSpotScreen(props: FXSpotScreenProps) {
  const [focusedTrans, setFocusedTrans] = useState(0);

  return (
    <View style={{
      backgroundColor: '#EFF2F5',
      flex: 1,
    }}>
      {/* Header */}
      <View style={{
        flex: 0,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        justifyContent: 'space-between'
      }}>
        <Text style={{
          ...text.hAlt
        }}>FX Spot / Forward</Text>
        <TouchableOpacity style={{
          alignSelf: 'flex-end'
        }}>
          <MaterialIcons name='search' size={24} color={colors.darkIcons} />
        </TouchableOpacity>
      </View>

      <View style={{
        flex: 0,
        flexDirection: 'column',
        alignContent: 'center',
        alignItems: 'center',
        paddingTop: 32,
        paddingBottom: 40,
      }}>
        <UIAddRound size={48} fill={colors.btnPrimary} color={colors.btnText} />
        <Text style={{
          ...text.p,
          fontSize: 16,
          paddingTop: 16
        }}>New transaction</Text>
      </View>

      <FilterList title='Last transactions' items={
        MOCK_TRANSACTIONS.map((trans, i) =>
          <TransactionItem
            {...trans}
            key={i}
            focused={focusedTrans === i}
            onPress={() => setFocusedTrans(i)}
          />
        )
      } />
    </View>
  );
};