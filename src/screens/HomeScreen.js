import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import VideoPlayer from '../components/VideoPlayer';
import { fetchCourses } from '../services/supabase';

export default function HomeScreen() {
  const [courses, setCourses] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(() => {
    // Mock fetching courses from Supabase
    const loadCourses = async () => {
      // In a real app, this would use fetchCourses()
      // const data = await fetchCourses();
      
      // Using mock data for the MVP
      const mockData = [
        { id: '1', title: 'React Native Basics', videoUri: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4' },
        { id: '2', title: 'Advanced Expo Routing', videoUri: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4' },
        { id: '3', title: 'Supabase Integration', videoUri: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4' },
      ];
      setCourses(mockData);
    };

    loadCourses();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity 
        style={styles.courseCard} 
        onPress={() => setSelectedVideo(item.videoUri)}
    >
      <Text style={styles.courseTitle}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>EduStream</Text>
      
      {selectedVideo ? (
        <View style={styles.playerContainer}>
            <VideoPlayer videoUri={selectedVideo} />
            <TouchableOpacity style={styles.closeButton} onPress={() => setSelectedVideo(null)}>
                <Text style={styles.closeButtonText}>Close Video</Text>
            </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={courses}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: '#f5f5f5',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  listContainer: {
    paddingHorizontal: 20,
  },
  courseCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  courseTitle: {
    fontSize: 18,
    fontWeight: '500',
  },
  playerContainer: {
    flex: 1,
  },
  closeButton: {
    padding: 15,
    backgroundColor: '#e74c3c',
    alignItems: 'center',
    margin: 20,
    borderRadius: 8,
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  }
});
