import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import YoutubeIframe from 'react-native-youtube-iframe';
import {db} from '../../config/config';
import {collection, query, where, getDocs} from 'firebase/firestore';
import {useIsFocused} from '@react-navigation/native';
import { styles } from './style';

interface Video {
  id: string;
  videoId: string;
  title: string;
}
const SavedVideoScreen = ({navigation}: any) => {
  const isFocused = useIsFocused();
  const [savedVideos, setSavedVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  useEffect(() => {
    fetchSavedVideos();
  }, [isFocused]);

  const fetchSavedVideos = async () => {
    setLoading(true);
    setError('');
    try {
      const savedVideosQuery = query(
        collection(db, 'videos'),
        where('isSaved', '==', true),
      );
      const querySnapshot = await getDocs(savedVideosQuery);
      const savedVideosList: Video[] = [];
      querySnapshot.forEach(doc => {
        savedVideosList.push({
          id: doc.id,
          videoId: doc.data()?.videoId,
          title: doc.data().title,
        });
      });
      setSavedVideos(savedVideosList);
    } catch (error) {
      console.error('Error fetching saved videos:', error);
      setError('Failed to fetch saved videos.');
    } finally {
      setLoading(false);
    }
  };
  const renderSavedVideoItem = ({item}: {item: Video}) => {
    console.log({item});
    return (
      <TouchableOpacity
        style={styles.videoContainer}
        onPress={() =>
          navigation.navigate('VideoDetailScreen', {videoId: item.id})
        }>
        <Text style={styles.videoTitle}>{item.title}</Text>
        <YoutubeIframe height={200} videoId={item.id} />
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
      <Text style={styles.savedText}>Saved Videos</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#FF0000" />
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        <FlatList
          data={savedVideos}
          renderItem={renderSavedVideoItem}
          keyExtractor={item => item.id}
        />
      )}
    </View>
  );
};

export default SavedVideoScreen;
