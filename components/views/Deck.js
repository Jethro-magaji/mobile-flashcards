import React from "react";
import { View, Text } from "react-native";
import Styles from "../../utils/styles";
import { useSelector } from "react-redux";
import { TouchableOpacity } from "react-native-gesture-handler";
import { RemoveDeck } from "../../utils/api";
import { DeleteDeck } from "../actions";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
const Deck = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const { deck } = route.params;
  const state = useSelector((state) => state);
  let cards = 0;
  if (state[deck] !== undefined) {
    cards = state[deck].questions.length;
  }
  const removeDeck = () => {
    RemoveDeck(deck);
    navigation.navigate("Home");
  };
  useEffect(() => {
    navigation.setOptions({ title: deck });
  }, []);
  return (
    <View style={Styles.main}>
      <Text style={Styles.header}>{deck}</Text>
      <Text style={Styles.cards}>
        {cards === 1
          ? cards + " Card"
          : cards === 0
          ? "No card"
          : cards + " cards"}
      </Text>

      <View style={Styles.deckOptions}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Add Card", { deck: state[deck] })}
        >
          <Text style={Styles.button}>Add Card</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("Quiz", { deck: state[deck] })}
        >
          <Text style={Styles.button}>Start Quiz</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={removeDeck}>
          <Text style={Styles.delete}>Delete Deck</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Deck;
