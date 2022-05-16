import React, { useState, useEffect } from "react";

import { FlatList, TouchableWithoutFeedback, View   } from "react-native";
import { NavigationScreenProps } from "../../navigation/types";
import pokeballBackgroundImage from "../../global/assets/Pokeball-bg-half.png";
import { CardPokemon } from "../../components/CardPokemon";
import { api } from "../../api";

import * as S from "./ListaScreen.styles";

type PokemonProps = {
  id: number;
  name: string;
  type: string[];
};

export function ListaScreen(props: NavigationScreenProps<"ListaScreen">)  {
  const { navigation } = props;
  const [listaPokemon, setListaPokemon] = useState<PokemonProps[]>([]);

  function handleNavigation(id: number) {
    navigation.navigate("DetalhesScreen", {id: id});
  }
  
  useEffect(() => {
    async function carregarLista() {

      const response = await api.get("pokemons");

      setListaPokemon(response.data);
      
    }
    

    carregarLista();
  }, []);

  return (
    <S.Container>
      
      <S.ContainerBackgroundImage source={pokeballBackgroundImage} />
      
      <S.Title>Pokédex</S.Title>
      <S.Paragraph>Encontre todos os pokémons em um só lugar.</S.Paragraph>
      
      <S.Content>
        <FlatList
          data={listaPokemon}
          renderItem={({ item }) => (
              <TouchableWithoutFeedback    onPress={ (e) => handleNavigation(item.id)} >
             <View>
              <CardPokemon
                key={item.id}
                id={item.id}
                nome={item.name}
                tipo={item.type}
              /></View></TouchableWithoutFeedback>
              
          )}
        />
      </S.Content>

    </S.Container>
  );
}
