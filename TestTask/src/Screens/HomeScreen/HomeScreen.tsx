import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
  Pressable,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import { db } from '../../config/config';
import { doc, setDoc, updateDoc, getDoc } from 'firebase/firestore';
import { styles } from './styles';
import VideosRenderItem from '../../componenets/VideosRenderItem';

interface Video {
  id: string;
  videoId: string;
  title: string;
  isLiked?: boolean;
  isSaved?: boolean;
  comments?: string[];
  likesCount?: number;
  commentsCount?: number;
}

const HomeScreen = ({ navigation }: any) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [videos, setVideos] = useState<Video[]>([]);
  const [filteredVideos, setFilteredVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentVideoId, setCurrentVideoId] = useState<string | null>(null);
  const [newComment, setNewComment] = useState('');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    fetchVideos();
  }, []);

  useEffect(() => {
    if (searchQuery) {
      const filtered = videos.filter(video =>
        video.title.toLowerCase().includes(searchQuery.toLowerCase()),
      );
      setFilteredVideos(filtered);
    } else {
      setFilteredVideos(videos);
    }
  }, [searchQuery, videos]);

  const fetchVideos = async (query: string = 'trending') => {
    setLoading(true);
    setError('');

    try {
      const response = await axios.get(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&q=songs&key=AIzaSyBztIhtNkmY1hSqpYS0Iev747xET5lmsSo&type=video`,
      );

      if (response.data.items.length === 0) {
        setError('No videos found for the search query.');
      }

      const videoList = await Promise.all(
        response.data.items.map(async (item: any) => {
          const videoId = item.id.videoId;

          const videoRef = doc(db, 'videos', videoId);
          const videoDoc = await getDoc(videoRef);

          return {
            id: videoId,
            videoId: videoId,
            title: item.snippet.title,
            isLiked: videoDoc.exists()
              ? videoDoc.data().isLiked || false
              : false,
            isSaved: videoDoc.exists()
              ? videoDoc.data().isSaved || false
              : false,
            likesCount: videoDoc.exists() ? videoDoc.data().likesCount || 0 : 0,
            commentsCount: videoDoc.exists()
              ? videoDoc.data().commentsCount || 0
              : 0,
          };
        }),
      );

      setVideos(videoList);
      setFilteredVideos(videoList);
    } catch (error) {
      console.error('Error fetching videos:', error);
      setError('Failed to fetch videos.');
    } finally {
      setLoading(false);
    }
  };

  const toggleLike = async (videoId: string) => {
    setVideos(prevVideos =>
      prevVideos.map(video =>
        video.id === videoId
          ? {
            ...video,
            isLiked: !video.isLiked,
            likesCount: video.isLiked
              ? video.likesCount - 1
              : video.likesCount + 1,
          }
          : video,
      ),
    );

    const videoRef = doc(db, 'videos', videoId);
    const videoDoc = await getDoc(videoRef);

    if (videoDoc.exists()) {
      await updateDoc(videoRef, {
        likes: videoDoc.data().likes + (video.isLiked ? -1 : 1),
      });
    } else {
      await setDoc(videoRef, {
        likes: 1,
      });
    }
  };

  const toggleSave = async (videoId: string) => {
    const videoToSave = videos.find(video => video.id === videoId);

    if (!videoToSave) {
      console.error('Video not found!');
      return;
    }

    try {
      setVideos(prevVideos =>
        prevVideos.map(video =>
          video.id === videoId ? { ...video, isSaved: !video.isSaved } : video,
        ),
      );
      const videoRef = doc(db, 'videos', videoId);
      const videoDoc = await getDoc(videoRef);
      if (videoDoc.exists()) {
        await updateDoc(videoRef, {
          isSaved: !videoToSave.isSaved,
        });
      } else {
        await setDoc(videoRef, {
          id: videoToSave.id,
          videoId: videoToSave.videoId,
          title: videoToSave.title,
          isLiked: false,
          isSaved: videoToSave.videoId,
          likesCount: 0,
          commentsCount: 0,
          comments: [],
        });
      }
    } catch (error) {
      console.error('Error toggling save status:', error);
    }
  };
  const addComment = async () => {
    if (!newComment.trim()) {
      console.error('Comment cannot be empty');
      return;
    }
    try {
      const videoRef = doc(db, 'videos', currentVideoId!);
      const videoDoc = await getDoc(videoRef);
      if (videoDoc.exists()) {
        const existingComments = videoDoc.data().comments || [];
        await updateDoc(videoRef, {
          comments: [...existingComments, newComment],
          commentsCount: existingComments.length + 1,
        });
      } else {
        await setDoc(videoRef, {
          comments: [newComment],
          commentsCount: 1,
        });
      }
      setVideos(prevVideos =>
        prevVideos.map(video =>
          video.id === currentVideoId
            ? {
              ...video,
              comments: [...(video.comments || []), newComment],
              commentsCount: (video.commentsCount || 0) + 1,
            }
            : video,
        ),
      );
      setNewComment('');
      setModalVisible(false);
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };
  const openCommentModal = (videoId: string) => {
    setCurrentVideoId(videoId);
    setModalVisible(true);
  };

  const renderVideoItem = ({ item }: { item: Video }) => (
    <VideosRenderItem
      item={item}
      onCommentsPress={() => openCommentModal(item.id)}
      onToggleLikePress={() => toggleLike(item.id)}
      onToggleSavePress={() => toggleSave(item.id)}
      onGotoPress={() => navigation.navigate('VideoDetail', { videoId: item.id })}
    />
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.logoContainer}>
          <Text style={styles.logoText}>YouTube</Text>
        </TouchableOpacity>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchBar}
            placeholder="Search"
            placeholderTextColor={'#000'}
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmitEditing={() => fetchVideos(searchQuery)}
          />
          <TouchableOpacity
            style={styles.searchIconContainer}
            onPress={() => fetchVideos(searchQuery)}>
            <FontAwesome name="search" size={24} color="#000" />
          </TouchableOpacity>
        </View>
      </View>

      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#FF0000" />
        </View>
      ) : error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : (
        <FlatList
          data={filteredVideos}
          renderItem={renderVideoItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContainer}
        />
      )}
      <Modal visible={modalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add a Comment</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Type your comment..."
              value={newComment}
              onChangeText={setNewComment}
            />
            <View style={styles.modalButtons}>
              <Pressable style={[styles.modalButton, styles.cancelButton]} onPress={() => setModalVisible(false)}>
                <Text style={styles.modalButtonText}>Cancel</Text>
              </Pressable>
              <Pressable style={[styles.modalButton, styles.addButton]} onPress={addComment}>
                <Text style={styles.modalButtonText}> Comment</Text>
              </Pressable>
            </View>
          </View>
        </View>

      </Modal>
    </View>
  );
};

export default HomeScreen;
