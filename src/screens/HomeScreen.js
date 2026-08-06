import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Text, Card, Title, Paragraph, ActivityIndicator, Appbar } from 'react-native-paper';
import { useQuery } from '@tanstack/react-query';
import { fetchCourses } from '../services/api';
import useStore from '../store/useStore';

export default function HomeScreen() {
  const { data: courses, isLoading, error } = useQuery({
    queryKey: ['courses'],
    queryFn: fetchCourses,
  });

  const setSelectedCourse = useStore((state) => state.setSelectedCourse);

  const renderItem = ({ item }) => (
    <Card style={styles.card} onPress={() => setSelectedCourse(item)}>
      <Card.Cover source={{ uri: item.thumbnail }} />
      <Card.Content>
        <Title>{item.title}</Title>
        <Paragraph>{item.description}</Paragraph>
        <Paragraph style={styles.duration}>Duration: {item.duration}</Paragraph>
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.Content title="EduStream" />
      </Appbar.Header>
      
      {isLoading ? (
        <View style={styles.center}>
          <ActivityIndicator animating={true} size="large" />
        </View>
      ) : error ? (
        <View style={styles.center}>
          <Text style={styles.errorText}>Error loading courses.</Text>
        </View>
      ) : (
        <FlatList
          data={courses}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {
    padding: 16,
  },
  card: {
    marginBottom: 16,
  },
  duration: {
    marginTop: 8,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
  },
});
