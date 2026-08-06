import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Platform, SafeAreaView, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import VideoPlayer from '../components/VideoPlayer';

const API_URL = Platform.OS === 'android' ? 'http://10.0.2.2:3000/api/courses' : 'http://localhost:3000/api/courses';

export default function HomeScreen() {
  const [courses, setCourses] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCourses = async () => {
      try {
        setLoading(true);
        const response = await fetch(API_URL);
        const data = await response.json();
        setCourses(data.courses || []);
      } catch (error) {
        console.error("Failed to fetch courses:", error);
      } finally {
        setLoading(false);
      }
    };
    loadCourses();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity 
        style={styles.courseCard} 
        onPress={() => setSelectedVideo(item)}
        activeOpacity={0.9}
    >
      <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />
      <View style={styles.cardContent}>
        <Text style={styles.courseTitle} numberOfLines={1}>{item.title}</Text>
        <Text style={styles.courseDescription} numberOfLines={2}>{item.description}</Text>
        <View style={styles.metaContainer}>
          <View style={styles.durationBadge}>
            <Ionicons name="time-outline" size={14} color="#a0a0a0" />
            <Text style={styles.durationText}>{item.duration}</Text>
          </View>
          <Ionicons name="play-circle" size={32} color="#4ade80" />
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>EduStream</Text>
          <Text style={styles.headerSubtitle}>Discover Premium Courses</Text>
        </View>
        
        {selectedVideo ? (
          <View style={styles.playerContainer}>
            <TouchableOpacity style={styles.backButton} onPress={() => setSelectedVideo(null)}>
              <Ionicons name="chevron-back" size={24} color="#fff" />
              <Text style={styles.backButtonText}>Back to Courses</Text>
            </TouchableOpacity>
            <VideoPlayer videoUri={selectedVideo.videoUri} title={selectedVideo.title} />
          </View>
        ) : loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#4ade80" />
          </View>
        ) : (
          <FlatList
            data={courses}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
            contentContainerStyle={styles.listContainer}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0f172a', // Slate 900
  },
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 10,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#f8fafc',
    letterSpacing: 0.5,
  },
  headerSubtitle: {
    fontSize: 15,
    color: '#94a3b8',
    marginTop: 4,
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 40,
  },
  courseCard: {
    backgroundColor: '#1e293b', // Slate 800
    borderRadius: 20,
    marginBottom: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#334155', // Slate 700
  },
  thumbnail: {
    width: '100%',
    height: 180,
    backgroundColor: '#334155',
  },
  cardContent: {
    padding: 20,
  },
  courseTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#f8fafc',
    marginBottom: 6,
  },
  courseDescription: {
    fontSize: 14,
    color: '#94a3b8',
    lineHeight: 20,
    marginBottom: 16,
  },
  metaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  durationBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0f172a',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
  },
  durationText: {
    color: '#a0a0a0',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 6,
  },
  playerContainer: {
    flex: 1,
    backgroundColor: '#000',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    paddingTop: Platform.OS === 'android' ? 16 : 0,
    backgroundColor: '#0f172a',
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 4,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
