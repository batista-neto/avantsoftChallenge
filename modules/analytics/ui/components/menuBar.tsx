// components/Sidebar.tsx
import AntDesign from '@expo/vector-icons/AntDesign';
import { useInject } from 'core/di/screens';
import { AuthController } from 'modules/account/business/api';
import React from 'react';
import {
  Animated,
  Dimensions,
  Pressable,
  StyleSheet,
  Text,
  View
} from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;

interface menuBarProps {
  visible: boolean;
  onClose: () => void;
}

const MenuItem = ({ label, onPress, icon }: { label: string; onPress: () => void; icon: React.ReactNode }) => (
  <Pressable style={styles.menuItem} onPress={onPress}>
    {icon}
    <Text style={styles.menuItemText}>{label}</Text>
  </Pressable>
);


export const MenuBar = ({ visible, onClose }: menuBarProps) => {
  const translateX = React.useRef(new Animated.Value(-SCREEN_WIDTH)).current;

  const authController = useInject<AuthController>("AuthController");

  React.useEffect(() => {
    Animated.timing(translateX, {
      toValue: visible ? 0 : -SCREEN_WIDTH,
      duration: 250,
      useNativeDriver: true,
    }).start();
  }, [visible]);

  if (!visible) return null;

  return (
    <View style={StyleSheet.absoluteFillObject}>
      {/* Overlay clicável */}
      <Pressable style={styles.overlay} onPress={onClose} />

      {/* Menu deslizante */}
      <Animated.View style={[styles.sidebar, { transform: [{ translateX }] }]}>
        <Text style={styles.title}>Menu</Text>

        <MenuItem
          label="Logout"
          onPress={() => {
            authController.logout();
            onClose();
          }}
          icon={<AntDesign name="logout" size={24} color="black" />}
        />

        {/* Mais opções aqui... */}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
    zIndex: 1,
  },
  sidebar: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: SCREEN_WIDTH * 0.7,
    height: '100%',
    backgroundColor: '#fff',
    paddingTop: 60,
    paddingHorizontal: 20,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    zIndex: 2,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  item: {
    marginVertical: 10,
  },
  text: {
    fontSize: 16,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  menuItemText: {
    fontSize: 16,
    marginLeft: 12,
    color: '#333',
  },
  title2: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff',
    backgroundColor: '#00aaff',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
});
