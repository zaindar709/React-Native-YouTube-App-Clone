import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import YoutubeIframe from 'react-native-youtube-iframe';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const VideosRenderItem = props => {
  const {
    onCommentsPress,
    onToggleLikePress,
    onToggleSavePress,
    item,
    onGotoPress,
  } = props;
  return (
    <View style={styles.videoContainer}>
      <Text style={styles.videoTitle}>{item.title}</Text>
      <YoutubeIframe height={200} videoId={item.videoId} />
      <View style={styles.actionsContainer}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={onToggleLikePress}>
          <FontAwesome
            name="thumbs-up"
            size={20}
            color={item.isLiked ? '#FF0000' : '#000'}
          />
          <Text style={styles.actionText}>
            {item.isLiked ? 'Liked' : 'Like'} ({item.likesCount})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={onCommentsPress}>
          <FontAwesome name="comment" size={20} color="#000" />
          <Text style={styles.actionText}>Comment ({item.commentsCount})</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={onToggleSavePress}>
          <FontAwesome
            name="bookmark"
            size={20}
            color={item.isSaved ? '#FF0000' : '#000'}
          />
          <Text style={styles.actionText}>
            {item.isSaved ? 'Saved' : 'Save'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={onGotoPress}>
          <Text style={styles.actionText}>Go to</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default VideosRenderItem;

const styles = StyleSheet.create({
  videoContainer: {
    marginBottom: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  videoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  actionsContainer: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'space-between',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  actionText: {
    marginLeft: 5,
    fontSize: 14,
  },
  commentsContainer: {
    marginTop: 10,
  },
  commentText: {
    fontSize: 14,
    color: '#555',
  },
  listContainer: {
    paddingBottom: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalInput: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 10,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
