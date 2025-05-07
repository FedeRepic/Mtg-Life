import { Dimensions, StyleSheet, View } from "react-native";
import React, { useState } from "react";

import PlayerCounter from "../components/PlayerCounter2";

const { height } = Dimensions.get("window");  

export default function HomeScreen() {
  const [player1Life, setPlayer1Life] = useState(20);
  const [player2Life, setPlayer2Life] = useState(20);

interface HandleLifeChangeProps {
    newLife: number;      
    playerNumber: number;
} 
 
const handleLifeChange = ({ newLife, playerNumber }: HandleLifeChangeProps) => {
    if (playerNumber === 1) {
        setPlayer1Life(newLife);
        //toast(`Player 1 life: ${newLife}`);
    } else {
        setPlayer2Life(newLife);
        //toast(`Player 2 life: ${newLife}`);
    }
};

  return (
    <View style={styles.container}>
      <PlayerCounter
        life={player2Life}
        setLife={setPlayer2Life}
        isInverted={true}
        playerName="Player 2"
        playerColor="#58c4f7"
      />
      <PlayerCounter
        life={player1Life}
        setLife={setPlayer1Life}
        isInverted={false}
        playerName="Player 1"
        playerColor="#70e37a"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 10,
    backgroundColor: "#000000",
  },
});
