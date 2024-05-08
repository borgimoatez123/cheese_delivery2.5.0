import React, { useState, useRef, useEffect } from 'react';
import { View, ScrollView, Image, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const Carousel = ({ images = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollViewRef = useRef();

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
      scrollViewRef.current.scrollTo({ animated: true, x: nextIndex * width });
      setCurrentIndex(nextIndex);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, [currentIndex, images.length]);

  const handleScroll = event => {
    const x = event.nativeEvent.contentOffset.x;
    const index = Math.round(x / width);
    setCurrentIndex(index);
  };

  const renderPagination = () => (
    <View style={styles.paginationWrapper}>
      {images.map((_, index) => (
        <View key={index} style={[styles.dot, currentIndex === index ? styles.activeDot : null]} />
      ))}
    </View>
  );

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
        {images.map((image, index) => (
          <Image
            key={index}
            source={{ uri: image }}
            style={styles.imageStyle}
          />
        ))}
      </ScrollView>
      {renderPagination()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent', // Ensures no background issues
    padding: 0, // Make sure no padding is affecting the layout
    margin: 0, // 
  },
  scrollViewStyle: {
    flexGrow: 0,
    backgroundColor: 'transparent', // Ensures no background issues
    margin: 0, // Explicitly removing margin
  },
  imageStyle: {
    width: width,
    height: 300, // Adjust the height as needed
  },
  paginationWrapper: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent', // Ensures no background issues
  },
  dot: {
    height: 8,
    width: 8,
    borderRadius: 4,
    backgroundColor: 'gray',
    margin: 3
  },
  activeDot: {
    backgroundColor: 'white'
  }
});

export default Carousel;
