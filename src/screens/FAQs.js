import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Animated,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const FAQ_DATA = [
  {
    id: '1',
    question: 'What is the purpose of this app?',
    answer: 'This app helps users manage their tasks efficiently.',
  },
  {
    id: '2',
    question: 'How do I reset my password?',
    answer:
      'You can reset your password by clicking on the "Forgot Password" link on the login page.',
  },
  {
    id: '3',
    question: 'How do I contact support?',
    answer:
      'You can contact support via the "Contact Us" page in the app settings.',
  },
];

const FAQs = () => {
  const navigation = useNavigation();

  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleExpand = index => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const renderItem = ({item, index}) => {
    const isExpanded = expandedIndex === index;

    return (
      <View style={styles.faqContainer}>
        <TouchableOpacity onPress={() => toggleExpand(index)}>
          <Text style={styles.question}>{item.question}</Text>
        </TouchableOpacity>
        {isExpanded && (
          <Animated.View style={styles.answerContainer}>
            <Text style={styles.answer}>{item.answer}</Text>
          </Animated.View>
        )}
      </View>
    );
  };

  return (
    <View style={styles.Container}>
      <TouchableOpacity
        style={{left: 10, top: 10, height: 40, width: 40}}
        onPress={() => navigation.goBack()}>
        <Ionicons name="caret-back-circle-sharp" color="black" size={40} />
      </TouchableOpacity>
      <FlatList
        data={FAQ_DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.Subcontainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  Container:{
    flex:1,
    backgroundColor:'white'
  },
  Subcontainer: {
    padding: 15,
    marginTop:20
  },
  faqContainer: {
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  question: {
    fontSize: 16,
    fontWeight: 'bold',
    color:'black'
  },
  answerContainer: {
    paddingVertical: 8,
  },
  answer: {
    fontSize: 14,
    color: '#555',
  },
});

export default FAQs;
