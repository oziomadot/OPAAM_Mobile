import { AdMobBanner } from 'expo-ads-admob';
import { getBannerAdUnitId } from '@/utils/admob';
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Button, StyleSheet, Text, View, Alert } from "react-native";
import { useCoinSystem } from "@/utils/coinSystem";
import { MaterialIcons } from "@expo/vector-icons";

const NigeriaQuiz = () => {
  const [questions, setQuestions] = useState<Array<{q: string, a: string, options: string[]}>>([]);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [gameOver, setGameOver] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedback, setFeedback] = useState({ correct: false, message: '' });
  
  const {
    coins,
    formatCoins,
    startTimer,
    stopTimer,
    resetCoins,
    currentTimeSpent
  } = useCoinSystem();

  const fetchQuestions = async () => {
    setLoading(true);
    // Replace this with your Laravel API later
    const quiz = [
      { 
        q: "What is the capital of Nigeria?", 
        a: "Abuja", 
        options: ["Lagos", "Abuja", "Kano"],
        difficulty: 'easy'
      },
      { 
        q: "Nigeria gained independence in?", 
        a: "1960", 
        options: ["1957", "1960", "1970"],
        difficulty: 'medium'
      },
      { 
        q: "Which river is the longest in Nigeria?", 
        a: "River Niger", 
        options: ["River Benue", "River Niger", "Cross River"],
        difficulty: 'medium'
      },
    ];
    setQuestions(quiz);
    resetCoins();
    setLoading(false);
    startTimer();
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const handleAnswer = async (answer) => {
    setSelectedAnswer(answer);
    const isCorrect = answer === questions[index].a;
    const coinsEarned = stopTimer(isCorrect);
    
    if (isCorrect) {
      setScore(score + 1);
      setFeedback({
        correct: true,
        message: `Correct! +${coinsEarned} coins`
      });
    } else {
      setFeedback({
        correct: false,
        message: `Incorrect! The answer was ${questions[index].a}`
      });
    }
    
    setShowFeedback(true);
    
    // Move to next question or end game
    setTimeout(() => {
      if (index + 1 < questions.length) {
        setIndex(prev => prev + 1);
        setSelectedAnswer(null);
        setShowFeedback(false);
        startTimer();
      } else {
        const finalScore = isCorrect ? score + 1 : score;
        setGameOver(true);
        Alert.alert(
          '🎯 Game Over!', 
          `Your score: ${finalScore}/${questions.length}\nTotal Coins: ${formatCoins(coins + (isCorrect ? coinsEarned : 0))}`, 
          [
            { 
              text: 'Play Again', 
              onPress: () => {
                setIndex(0);
                setScore(0);
                setGameOver(false);
                setSelectedAnswer(null);
                setShowFeedback(false);
                fetchQuestions();
              } 
            }
          ]
        );
      }
    }, 1500);
  };

  if (loading) return <ActivityIndicator size="large" color="#3b82f6" />;

  if (loading) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color="#3b82f6" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.score}>Score: {score}/{questions.length}</Text>
        <View style={styles.coinContainer}>
          <MaterialIcons name="monetization-on" size={24} color="#FFD700" />
          <Text style={styles.coinText}>{formatCoins(coins)}</Text>
        </View>
      </View>

      <View style={styles.questionContainer}>
        <Text style={styles.questionNumber}>Question {index + 1} of {questions.length}</Text>
        <Text style={styles.question}>{questions[index].q}</Text>
        
        {showFeedback && (
          <View style={[
            styles.feedbackContainer, 
            feedback.correct ? styles.correctFeedback : styles.incorrectFeedback
          ]}>
            <Text style={styles.feedbackText}>{feedback.message}</Text>
          </View>
        )}

        <View style={styles.optionsContainer}>
          {questions[index].options.map((opt, i) => {
            let buttonStyle = styles.optionButton;
            let textStyle = styles.optionText;
            
            if (selectedAnswer) {
              if (opt === questions[index].a) {
                buttonStyle = styles.correctOption;
                textStyle = styles.optionText;
              } else if (opt === selectedAnswer && opt !== questions[index].a) {
                buttonStyle = styles.incorrectOption;
                textStyle = styles.optionText;
              }
            }
            
            return (
              <TouchableOpacity
                key={i}
                style={[
                  buttonStyle,
                  selectedAnswer === opt && styles.selectedOption,
                  selectedAnswer && { opacity: opt === questions[index].a ? 1 : 0.6 }
                ]}
                onPress={() => !selectedAnswer && handleAnswer(opt)}
                disabled={!!selectedAnswer}
              >
                <Text style={textStyle}>{opt}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.timeSpent}>Time: {currentTimeSpent()}s</Text>
        <View style={styles.adContainer}>
          <AdMobBanner
            bannerSize="banner"
            adUnitID={getBannerAdUnitId()}
            servePersonalizedAds
            onDidFailToReceiveAdWithError={(error: any) => {
              console.warn('Ad failed to load:', error);
            }}
            onAdViewDidReceiveAd={() => {
              console.log('Ad loaded successfully');
            }}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 3,
  },
  score: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  coinContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff8e1',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ffe0b2',
  },
  coinText: {
    marginLeft: 5,
    fontWeight: 'bold',
    color: '#f9a825',
  },
  questionContainer: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    elevation: 2,
  },
  questionNumber: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  question: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 30,
    color: '#1a1a1a',
    lineHeight: 28,
  },
  optionsContainer: {
    marginTop: 10,
  },
  optionButton: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  optionText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#333',
  },
  selectedOption: {
    borderColor: '#3b82f6',
    borderWidth: 2,
  },
  correctOption: {
    backgroundColor: '#d4edda',
    borderColor: '#c3e6cb',
  },
  incorrectOption: {
    backgroundColor: '#f8d7da',
    borderColor: '#f5c6cb',
    opacity: 0.7,
  },
  feedbackContainer: {
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
    alignItems: 'center',
  },
  correctFeedback: {
    backgroundColor: '#d4edda',
    borderColor: '#c3e6cb',
  },
  incorrectFeedback: {
    backgroundColor: '#f8d7da',
    borderColor: '#f5c6cb',
  },
  feedbackText: {
    fontSize: 16,
    fontWeight: '500',
  },
  timeSpent: {
    textAlign: 'center',
    color: '#666',
    marginBottom: 10,
  },
  footer: {
    marginTop: 'auto',
    width: '100%',
    alignItems: 'center',
  },
  adContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    minHeight: 50, // Ensure the container has a minimum height
  },
});

export default NigeriaQuiz;
