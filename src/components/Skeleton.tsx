import React from 'react';
import { StyleSheet, Dimensions, View } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const { width } = Dimensions.get('window');

const SkeletonLoader = () => {
  return (
    <View style={styles.skeletonContainer}>
      <SkeletonPlaceholder>
        <SkeletonPlaceholder.Item flexDirection="column" alignItems="stretch">
          <SkeletonPlaceholder.Item width="100%" height={220} borderRadius={16} marginBottom={24} />
          <SkeletonPlaceholder.Item width="60%" height={24} borderRadius={4} marginBottom={16} />
          <SkeletonPlaceholder.Item flexDirection="row" marginBottom={24}>
            <SkeletonPlaceholder.Item width={width * 0.6 - 16} height={200} borderRadius={16} marginRight={16} />
            <SkeletonPlaceholder.Item width={width * 0.6 - 16} height={200} borderRadius={16} />
          </SkeletonPlaceholder.Item>
          <SkeletonPlaceholder.Item width="60%" height={24} borderRadius={4} marginBottom={16} />
          <SkeletonPlaceholder.Item>
            <SkeletonPlaceholder.Item width="100%" height={180} borderRadius={12} marginBottom={16} />
            <SkeletonPlaceholder.Item width="100%" height={180} borderRadius={12} marginBottom={16} />
          </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder>
    </View>
  );
};

const styles = StyleSheet.create({
  skeletonContainer: {
    flex: 1,
    padding: 16,
  },
});

export default SkeletonLoader;