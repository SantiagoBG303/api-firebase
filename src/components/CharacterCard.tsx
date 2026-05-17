import React, { useEffect, useRef } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Animated } from 'react-native';

type Props = {
  item: any;
  onPress?: () => void;
};

const CharacterCard: React.FC<Props> = ({ item, onPress }) => {
  const anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(anim, { toValue: 1, duration: 450, useNativeDriver: true }).start();
  }, [anim]);

  return (
    <Animated.View style={{ opacity: anim, transform: [{ translateY: Animated.multiply(Animated.subtract(1, anim), 10) }] }}>
      <TouchableOpacity style={styles.card} onPress={onPress}>
        <Image source={{ uri: item.imageUrl || item.image }} style={styles.image} />
        <View style={styles.info}>
          <Text numberOfLines={1} style={styles.name}>{item.name}</Text>
          <Text style={styles.sub}>{(item.films || []).slice(0,2).join(', ')}</Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 10,
    marginVertical: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 6,
    alignItems: 'center'
  },
  image: { width: 72, height: 72, borderRadius: 8, marginRight: 12 },
  info: { flex: 1 },
  name: { fontWeight: '700', fontSize: 16, color: '#0b3b8c' },
  sub: { color: '#666', marginTop: 4 }
});

export default CharacterCard;
