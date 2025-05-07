import {
  Animated,
  Dimensions,
  PanResponder,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";

//hellos
import { MaterialCommunityIcons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");
const SWIPE_THRESHOLD = 100;

interface PlayerCounterProps {
  life: number;
  setLife: (life: number) => void;
  isInverted: boolean;
  playerName: string;
  playerColor: string;
}

export default function PlayerCounter({
  life,
  setLife,
  isInverted,
  playerName,
  playerColor,
}: PlayerCounterProps) {
  const [menuPosition] = useState(new Animated.Value(0));
  const [menuVisible, setMenuVisible] = useState(false);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (_, gestureState) => {
        const x = gestureState.dx;
        
        if(isInverted) {
            if (x < 0 && x >= -width * 0.6) {
                menuPosition.setValue(-x);
            }
        } else
      if (x > 0 && x <= width * 0.6) {
        menuPosition.setValue(x);
      }
    },
    onPanResponderRelease: (_, gestureState) => {
      if(isInverted) {
          if (gestureState.dx < -SWIPE_THRESHOLD) {
              showMenu();
          } else {
              hideMenu();
          }
      } else
        if (gestureState.dx > SWIPE_THRESHOLD) {
        showMenu();
      } else {
        hideMenu();
      }
    },
  });

  const showMenu = () => {
    setMenuVisible(true);
    Animated.spring(menuPosition, {
      toValue: width * 0.6,
      useNativeDriver: true,
    }).start();
  };

  const hideMenu = () => {
    Animated.spring(menuPosition, {
      toValue: 0,
      useNativeDriver: true,
    }).start(() => setMenuVisible(false));
  };

const containerStyle = [
  styles.container,
  isInverted && styles.inverted,
    {
        height: height / 2,
  },
];
    
  const mainContentStyle = [
    styles.mainContent,
    playerColor && { backgroundColor: playerColor },
  ];

  const menuStyle = {
    transform: [{ translateX: menuPosition }],
  };

  return (
    <View style={containerStyle}>
      
        <Animated.View
          style={[styles.mainContent, menuStyle, mainContentStyle]}
          {...panResponder.panHandlers}
        >
          <Text style={styles.playerName}>{playerName}</Text>
          <Text style={styles.lifeCounter}>{life}</Text>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity
            style={styles.button}
            onPress={() => setLife(life - 1)} // Decrease life by 1
          >
            <MaterialCommunityIcons
              name="minus"
              size={30}
              color="white"
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setLife(life + 1)}
          >
            <MaterialCommunityIcons
              name="plus"
              size={30}
              color="white"
            />
            </TouchableOpacity>
          </View>
        </Animated.View>
      

      <Animated.View
        style={[
          styles.menu,
          {
            transform: [{ translateX: Animated.multiply(menuPosition, 0) }],
          },
        ]}
      >
        <TouchableOpacity style={styles.menuItem} onPress={() => setLife(20)}>
          <Text style={styles.menuText}>Reset to 20</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => setLife(40)}>
          <Text style={styles.menuText}>Reset to 40</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => setLife(life - 5)}
        >
          <Text style={styles.menuText}>-5 Life</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
        flex: 1,
      flexDirection: "row",
      flexGrow: 1,
        overflow: "hidden",
        padding: 10,
    paddingTop: 5,
  },
  inverted: {
    transform: [{ rotate: "180deg" }],
  },
  mainContent: {
    flex: 1,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    zIndex: 1,
  },
  playerName: {
    color: "#ffffff80",
    fontSize: 20,
    marginBottom: 10,
  },
  lifeCounter: {
    color: "white",
    fontSize: 72,
      fontWeight: "bold",
  },
  buttonsContainer: {
    flexDirection: "row",
    marginTop: 20,
      gap: 20,
  },
  button: {
    backgroundColor: "#ffffff20",
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
    menu: {
    zIndex: 0,
    position: "absolute",
    left: 10,
    top: 5,
    bottom: 10,
    width: width * 0.575,
    backgroundColor: "#404040",
    borderRadius: 20,
    padding: 20,
    justifyContent: "center",
  },
  menuItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ffffff20",
  },
  menuText: {
    color: "white",
      fontSize: 18,
  },
});
