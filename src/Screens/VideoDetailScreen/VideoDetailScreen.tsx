import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import {doc, getDoc} from 'firebase/firestore';
import {db} from '../../config/config'; 
import { styles } from './style';

const VideoDetailScreen = ({route}: any) => {
  const {videoId} = route?.params || '';
  const [videoData, setVideoData] = useState<any>(null); 
  const [loading, setLoading] = useState(true);
  console.log({videoId});

  useEffect(() => {
    const fetchVideoData = async () => {
      try {
        const videoRef = doc(db, 'videos', videoId);
        const videoDoc = await getDoc(videoRef);

        if (videoDoc.exists()) {
          setVideoData(videoDoc.data());
          console.log('vedio data', videoData);
        } else {
          console.log('Video not found!');
        }
      } catch (error) {
        console.error('Error fetching video data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchVideoData();
  }, [videoId]);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#FF0000" />
      </View>
    );
  }
  if (!videoData) {
    return (
      <View style={styles.container}>
        <Text>No video data available.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.videoDetails}>Video Detials</Text>
      <Text style={styles.title}>{videoData.title}</Text>
      <Text>Likes: {videoData.likes}</Text>
      <Text style={{fontSize: 20, fontWeight: '700'}}>
        Comments: {videoData.commentsCount}
      </Text>
      <Text>Saved: {videoData.isSaved ? 'Yes' : 'No'}</Text>
      <Text>Comments:</Text>
      {videoData.comments && videoData.comments.length > 0 ? (
        videoData.comments.map((comment: string, index: number) => (
          <Text key={index} style={styles.commentText}>
            {comment}
          </Text>
        ))
      ) : (
        <Text>No comments yet.</Text>
      )}
    </View>
  );
};

export default VideoDetailScreen;
