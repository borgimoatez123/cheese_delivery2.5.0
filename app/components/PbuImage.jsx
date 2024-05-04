import React, { useState, useEffect, useRef } from 'react';
import { ScrollView, View, Image, StyleSheet, Dimensions } from 'react-native';
import {Pubimg} from '../constants/uidata'



  const { width } = Dimensions.get('window');
const PbuImage = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
  const scrollViewRef = useRef();
  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = currentIndex === Pubimg.length - 1 ? 0 : currentIndex + 1;
      scrollViewRef.current.scrollTo({ animated: true, x: nextIndex * width });
      setCurrentIndex(nextIndex);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, [currentIndex]);

  const handleScroll = event => {
    const x = event.nativeEvent.contentOffset.x;
    const index = Math.round(x / width);
    setCurrentIndex(index);
  };
  const renderPagination = () => {
    return (
      <View style={styles.paginationWrapper}>
        {Pubimg.map((_, index) => (
          <View key={index} style={[styles.dot, currentIndex === index ? styles.activeDot : null]} />
        ))}
      </View>
    );
  };
  return (
    <View style={styles.container}>
    <ScrollView
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      onScroll={handleScroll}
        scrollEventThrottle={16}
        ref={scrollViewRef}
      style={styles.scrollViewStyle}
    >
      {Pubimg.map((image, index) => (
        <Image
          key={index}
          source={{ uri: image }}
          style={styles.imageStyle}
        />
      ))}
    </ScrollView>
    {renderPagination()}
  </View>
  )
};
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 50,
    },
    scrollViewStyle: {
      flexDirection: 'row',
    },
    imageStyle: {
      width: width,
      height: 300,
      resizeMode: 'cover',
    }
  });

export default PbuImage