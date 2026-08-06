import React, { useRef, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Dimensions } from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function VideoPlayer({ videoUri, title }) {
  const video = useRef(null);
  const [status, setStatus] = useState({});

  return (
    <View style={styles.container}>
      <View style={styles.videoWrapper}>
        <Video
          ref={video}
          style={styles.video}
          source={{ uri: videoUri }}
          useNativeControls
          resizeMode={ResizeMode.CONTAIN}
          isLooping
          onPlaybackStatusUpdate={status => setStatus(() => status)}
        />
      </View>
      
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>Now Playing</Text>
        
        <View style={styles.controlsContainer}>
          <TouchableOpacity 
            style={styles.playPauseButton}
            onPress={() => status.isPlaying ? video.current.pauseAsync() : video.current.playAsync()}
          >
            <Ionicons 
              name={status.isPlaying ? 'pause' : 'play'} 
              size={32} 
              color="#0f172a" 
              style={styles.iconStyle}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  videoWrapper: {
    width: width,
    height: width * (9/16), // 16:9 aspect ratio
    backgroundColor: '#111',
  },
  video: {
    width: '100%',
    height: '100%',
  },
  infoContainer: {
    padding: 24,
    flex: 1,
    backgroundColor: '#0f172a',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -20,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#f8fafc',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#94a3b8',
    marginBottom: 32,
  },
  controlsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  playPauseButton: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#4ade80',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#4ade80',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  iconStyle: {
    marginLeft: 4, // slight offset for play icon visual centering
  }
});
