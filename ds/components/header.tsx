import Entypo from '@expo/vector-icons/Entypo';
import { useInject } from "core/di/screens";
import { Navigator } from "core/navigation/api";
import React from "react";
import {
    Pressable,
    SafeAreaView,
    StyleSheet,
    Text,
    View,
} from "react-native";

interface HeaderProps {
  title?: string;
  showBackButton?: boolean;
  showCloseButton?: boolean;
  onBackPress?: () => void;
  onClosePress?: () => void;
  elevated?: boolean;
}

const BUTTON_SIZE = 48;

export const Header = ({
  title,
  showBackButton = false,
  showCloseButton = false,
  onBackPress,
  onClosePress,
  elevated,
}: HeaderProps) => {
  const navigator = useInject<Navigator>("Navigator");

  const handleOnBackPress = () => {
    if (onBackPress) {
      onBackPress();
    } else {
      navigator.goBack();
    }
  };

  function handleClosePress() {
    if (onClosePress) {
      return onClosePress();
    } else {
      return navigator.goBack();
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={[
        styles.container,
        elevated && styles.elevated,
      ]}>
        {showBackButton && (
          <Pressable
            onPress={handleOnBackPress}
            style={[styles.button, !showBackButton && styles.hidden]}
            disabled={!showBackButton}
          >
            <Entypo name="chevron-left" size={24} color="black" />
          </Pressable>
        )}
        {title && (
          <Text
            style={[
              styles.title,
              !showCloseButton && { marginRight: BUTTON_SIZE },
              !showBackButton && { marginLeft: BUTTON_SIZE },
            ]}
          >
            {title}
          </Text>
        )}
        {showCloseButton && (
          <Pressable
            onPress={handleClosePress}
            style={[styles.button, styles.right, !showCloseButton && styles.hidden]}
            disabled={!showCloseButton}
          >
            <Text> Fechar </Text>
          </Pressable>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    elevated: {
      elevation: 5,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 5,
      },
      shadowOpacity: 0.1,
    },
    safeArea: {
      backgroundColor: "transparent",
    },
    container: {
      flexDirection: "row",
      alignItems: "center",
      minHeight: 64,
      backgroundColor: "white",
    },
    containerWithLogo: {
      minHeight: 80,
    },
    title: {
      flex: 1,
      fontWeight: "700",
      fontSize: 14,
      lineHeight: 19.6,
      textAlign: "center",
    },
    button: {
      width: BUTTON_SIZE,
      height: BUTTON_SIZE,
      alignItems: "center",
      justifyContent: "center",
    },
    hidden: {
      opacity: 0,
    },
    icon: {
      width: 24,
      height: 24,
    },
    logoContainer: {
      flex: 1,
      paddingHorizontal: 16,
    },
    logoWithVariantContainer: {
      marginRight: 44,
      alignItems: "center",
      justifyContent: "center",
    },
    actionArea: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-end",
      gap: 8,
      paddingHorizontal: 8,
    },
    right: {
      marginLeft: "auto",
    }
  });
