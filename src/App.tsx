import React, { useState, useEffect } from 'react';
import { Sun, Moon, Lightbulb, ChevronLeft, ChevronRight, Star, Share2, Play } from 'lucide-react';
//adding the badge file
import BoltBadge from './assets/black_circle_360x360.svg'; 

interface Challenge {
  id: number;
  title: string;
  story: string;
  hint: string;
}

interface Quote {
  text: string;
  author: string;
}

const challenges: Challenge[] = [
  {
    id: 1,
    title: "The Marathon Pace Strategy",
    story: "Sarah is training for a marathon and wants to find the perfect pace. She has recorded her split times for different segments of her long runs. She needs to find the longest sequence of consecutive segments where her pace was consistent (within 10 seconds per mile). Help Sarah identify this optimal training zone.",
    hint: "Sliding Window"
  },
  {
    id: 2,
    title: "The Running Group Formation",
    story: "A running club has 50 members with different fitness levels. The coach wants to form training groups where each group has members with similar paces. Given a list of each runner's average pace, find the best way to divide them into groups so that no group has more than 8 people and the pace difference within each group is minimized.",
    hint: "Greedy Algorithm"
  },
  {
    id: 3,
    title: "The Trail Route Planner",
    story: "Emma is planning a trail run through a network of connected trails in a national park. Each trail segment has a difficulty rating and distance. She wants to start at the visitor center, visit several scenic viewpoints, and return to the parking lot while minimizing the total difficulty score. What's the optimal route?",
    hint: "Graph Algorithms (Dijkstra's)"
  },
  {
    id: 4,
    title: "The Water Station Optimization",
    story: "Race organizers need to place water stations along a 26.2-mile marathon route. They have a limited number of stations and want to ensure that no runner ever has to go more than 3 miles without access to water. What's the minimum number of stations needed and where should they be placed?",
    hint: "Dynamic Programming"
  },
  {
    id: 5,
    title: "The Personal Record Tracker",
    story: "Jake keeps track of his daily running times on his favorite 5K route. He wants to know the longest streak of days where each day's time was faster than the previous day. Given his running log for the past year, help him find his best improvement streak.",
    hint: "Longest Increasing Subsequence"
  },
  {
    id: 6,
    title: "The Relay Team Selection",
    story: "A track team needs to select 4 runners for a relay race from a pool of 12 athletes. Each runner has different strengths in different legs of the race (start, curves, straight, anchor). The coach has performance data for each athlete in each position. How should the team be selected to minimize the total race time?",
    hint: "Backtracking"
  },
  {
    id: 7,
    title: "The Training Schedule Balancer",
    story: "Maria wants to create a 16-week marathon training plan with different types of runs (easy, tempo, intervals, long runs). She has constraints on how many of each type she can do per week and wants to distribute them evenly throughout her training. How can she create a balanced schedule?",
    hint: "Heap / Priority Queue"
  },
  {
    id: 8,
    title: "The Race Bracket Tournament",
    story: "A local running club is organizing a tournament where runners compete in head-to-head races. With 64 participants, they need to create a bracket system that ensures the fastest overall runner has the best chance of winning. How should the initial bracket be seeded based on qualifying times?",
    hint: "Binary Tree"
  },
  {
    id: 9,
    title: "The Elevation Profile Analysis",
    story: "Tom is analyzing the elevation profile of his mountain trail run. He has elevation data points every 100 meters and wants to identify all the peaks and valleys in his route. He defines a peak as a point higher than both its neighbors, and a valley as a point lower than both neighbors.",
    hint: "Two Pointers"
  },
  {
    id: 10,
    title: "The Running Buddy Matcher",
    story: "A running app needs to match runners with compatible training partners. Each runner has preferences for pace, distance, and schedule. The app needs to create pairs where both runners' preferences are satisfied as much as possible. What's the optimal matching strategy?",
    hint: "Bipartite Graph Matching"
  },
  {
    id: 11,
    title: "The Hydration Strategy",
    story: "During a hot summer ultra-marathon, Lisa needs to plan her hydration strategy. She knows her sweat rate at different intensities and the temperature forecast for race day. She wants to determine the minimum amount of fluid she needs to carry while ensuring she never becomes dehydrated.",
    hint: "Greedy Algorithm"
  },
  {
    id: 12,
    title: "The Interval Training Optimizer",
    story: "Coach Johnson wants to design interval training sessions for his athletes. He has different workout intensities available and wants to create sessions where the total training stress is maximized while keeping the recovery time between intervals reasonable. Each intensity has different stress and recovery requirements.",
    hint: "Knapsack Problem"
  },
  {
    id: 13,
    title: "The Race Photo Sequence",
    story: "A race photographer wants to find the longest sequence of consecutive race photos where runners appear in order of their race numbers. Given a collection of photos with visible race bibs, help identify this sequence to create a compelling race story.",
    hint: "Longest Increasing Subsequence"
  },
  {
    id: 14,
    title: "The Sprint Workout Patterns",
    story: "Ana is analyzing her sprint workout data and notices patterns in her performance. She wants to find the most frequently occurring sequence of sprint times (within 0.1 second tolerance) across all her training sessions. This will help her identify her most consistent workout pattern.",
    hint: "Pattern Matching"
  },
  {
    id: 15,
    title: "The Running Store Inventory",
    story: "A running store needs to optimize their shoe inventory. They have sales data showing which shoe models sell together and want to arrange their display to maximize cross-selling opportunities. The store has limited display space and wants to group shoes that are frequently purchased together.",
    hint: "Graph Clustering"
  },
  {
    id: 16,
    title: "The Marathon Fueling Plan",
    story: "Roberto is planning his nutrition strategy for a marathon. He has different types of energy gels and sports drinks, each providing different amounts of carbohydrates and electrolytes. He needs to maintain steady energy levels throughout the race while minimizing the risk of gastrointestinal distress.",
    hint: "Dynamic Programming"
  },
  {
    id: 17,
    title: "The Track Lane Assignment",
    story: "A track meet organizer needs to assign runners to lanes for the 400m race. Faster runners should be in the middle lanes, but the organizer also wants to ensure competitive races by grouping runners with similar times. Given the qualifying times, how should lanes be assigned?",
    hint: "Sorting Algorithm"
  },
  {
    id: 18,
    title: "The Training Log Analysis",
    story: "Kevin has been logging his runs for 2 years and wants to find patterns in his training. He's looking for the longest period where his weekly mileage consistently increased, as this might indicate his most effective training progression. Help him analyze his training log.",
    hint: "Monotonic Stack"
  },
  {
    id: 19,
    title: "The Race Strategy Simulation",
    story: "Before a big race, Paula wants to simulate different pacing strategies. She has historical data on how her performance changes with different effort levels at various points in the race. She wants to find the strategy that gives her the best chance of achieving her goal time.",
    hint: "Dynamic Programming"
  },
  {
    id: 20,
    title: "The Running Club Routes",
    story: "A running club has mapped out various routes in their city, with different starting points, distances, and difficulty levels. They want to create a system where members can find routes that connect different landmarks while meeting their distance and difficulty preferences.",
    hint: "Graph Traversal (DFS/BFS)"
  },
  {
    id: 21,
    title: "The Recovery Time Calculator",
    story: "Dr. Smith is studying recovery patterns in endurance athletes. She has heart rate data from runners during and after their workouts and wants to identify the optimal recovery time between high-intensity sessions. The goal is to find patterns that predict when an athlete is fully recovered.",
    hint: "Sliding Window Maximum"
  },
  {
    id: 22,
    title: "The Parkrun Position Predictor",
    story: "Every Saturday, the local Parkrun attracts hundreds of runners. The organizers want to predict finishing positions based on recent performance data and current weather conditions. They need an algorithm that can quickly estimate where each runner will finish to better organize the finish line.",
    hint: "Merge Sort"
  }
];

const quotes: Quote[] = [
  { text: "Every mile begins with a single step.", author: "Unknown" },
  { text: "Running is the greatest metaphor for life, because you get out of it what you put into it.", author: "Oprah Winfrey" },
  { text: "The miracle isn't that I finished. The miracle is that I had the courage to start.", author: "John Bingham" },
  { text: "Run when you have to, walk if you have to, crawl if you have to; just never give up.", author: "Dean Karnazes" },
  { text: "Pain is temporary. Quitting lasts forever.", author: "Lance Armstrong" },
  { text: "The real purpose of running isn't to win a race, it's to test the limits of the human heart.", author: "Bill Bowerman" },
  { text: "Running is a mental sport and we're all insane.", author: "Unknown" },
  { text: "If you want to run, run a mile. If you want to experience a different life, run a marathon.", author: "Emil Zátopek" },
  { text: "Good things come slow, especially in distance running.", author: "Bill Dellinger" },
  { text: "Run often. Run long. But never outrun your joy of running.", author: "Julie Isphording" },
  { text: "Running is nothing more than a series of arguments between the part of your brain that wants to stop and the part that wants to keep going.", author: "Unknown" },
  { text: "The only bad workout is the one that didn't happen.", author: "Unknown" },
  { text: "You have to wonder at times what you're doing out there. Over the years, I've given myself a thousand reasons to keep running, but it always comes back to where it started. It comes down to self-satisfaction and a sense of achievement.", author: "Steve Prefontaine" },
  { text: "Mind is everything. Muscle - pieces of rubber. All that I am, I am because of my mind.", author: "Paavo Nurmi" },
  { text: "Racing teaches us to challenge ourselves. It teaches us to push beyond where we thought we could go.", author: "PattiSue Plumer" }
];

function App() {
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0);
  const [previousChallengeIndex, setPreviousChallengeIndex] = useState(0);
  const [viewedChallenges, setViewedChallenges] = useState(new Set([0]));
  const [showHint, setShowHint] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [favorited, setFavorited] = useState(false);
  const [currentQuote, setCurrentQuote] = useState(quotes[0]);
  const [notes, setNotes] = useState('');

  const currentChallenge = challenges[currentChallengeIndex];
  const totalChallenges = challenges.length;
  const progressPercentage = Math.round((viewedChallenges.size / totalChallenges) * 100);

  useEffect(() => {
    const randomQuoteIndex = Math.floor(Math.random() * quotes.length);
    setCurrentQuote(quotes[randomQuoteIndex]);
    setShowHint(false);
    setFavorited(false);
    setNotes('');
  }, [currentChallengeIndex]);

  const goToNextChallenge = () => {
    let nextIndex;
    do {
      nextIndex = Math.floor(Math.random() * challenges.length);
    } while (nextIndex === currentChallengeIndex);
    
    setPreviousChallengeIndex(currentChallengeIndex);
    setCurrentChallengeIndex(nextIndex);
    setViewedChallenges(prev => new Set([...prev, nextIndex]));
  };

  const goToPreviousChallenge = () => {
    setCurrentChallengeIndex(previousChallengeIndex);
    setViewedChallenges(prev => new Set([...prev, previousChallengeIndex]));
  };

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      darkMode 
        ? 'bg-gray-900 text-white' 
        : 'bg-gradient-to-br from-orange-50 via-teal-50 to-blue-50 text-gray-900'
    }`}>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Play className="w-8 h-8 text-orange-500" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-500 via-teal-500 to-blue-500 bg-clip-text text-transparent">
              Sprint & Solve
            </h1>
            <Play className="w-8 h-8 text-blue-500 scale-x-[-1]" />
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            🏃‍♂️ Fitness-Themed Coding Challenges ⚡
          </p>
        </div>

        {/* Theme Toggle */}
        <div className="flex justify-end mb-6">
          <button
            onClick={toggleTheme}
            className={`p-3 rounded-full transition-colors duration-300 ${
              darkMode 
                ? 'bg-gray-800 hover:bg-gray-700 text-yellow-400' 
                : 'bg-white hover:bg-gray-50 text-gray-600 shadow-md'
            }`}
          >
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>

        {/* Progress Section */}
        <div className={`p-6 rounded-xl mb-8 ${
          darkMode ? 'bg-gray-800' : 'bg-white shadow-lg'
        }`}>
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
              Progress: {viewedChallenges.size} out of {totalChallenges} challenges
            </span>
            <span className="text-sm font-medium text-orange-500">
              {progressPercentage}% Complete
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-orange-500 to-teal-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>

        {/* Challenge Card */}
        <div className={`p-8 rounded-xl mb-8 transition-all duration-300 transform hover:scale-[1.02] ${
          darkMode ? 'bg-gray-800 shadow-2xl' : 'bg-white shadow-xl'
        }`}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-orange-500">
              🏁 {currentChallenge.title}
            </h2>
            <div className="flex gap-2">
              <button
                onClick={() => setFavorited(!favorited)}
                className={`p-2 rounded-full transition-colors ${
                  favorited 
                    ? 'text-yellow-500 bg-yellow-50 dark:bg-yellow-900' 
                    : 'text-gray-400 hover:text-yellow-500'
                }`}
              >
                <Star className={`w-5 h-5 ${favorited ? 'fill-current' : ''}`} />
              </button>
              <button
                onClick={() => {}}
                className="p-2 rounded-full text-gray-400 hover:text-blue-500 transition-colors"
              >
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="prose max-w-none mb-6">
            <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
              {currentChallenge.story}
            </p>
          </div>

          {/* Hint Section */}
          <div className="mb-6">
            <button
              onClick={() => setShowHint(!showHint)}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-teal-500 to-blue-500 text-white rounded-lg hover:from-teal-600 hover:to-blue-600 transition-all"
            >
              <Lightbulb className="w-4 h-4" />
              {showHint ? 'Hide Hint' : 'Show Hint 💡'}
            </button>
            
            {showHint && (
              <div className={`mt-3 p-4 rounded-lg border-l-4 border-teal-500 ${
                darkMode ? 'bg-teal-900/20' : 'bg-teal-50'
              }`}>
                <p className="font-medium text-teal-700 dark:text-teal-300">
                  💡 DSA Concept: <span className="font-bold">{currentChallenge.hint}</span>
                </p>
              </div>
            )}
          </div>

          {/* Notes Section */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              📝 Jot down your approach:
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Write your solution ideas here..."
              className={`w-full p-3 rounded-lg border-2 transition-colors ${
                darkMode 
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-orange-500' 
                  : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-500 focus:border-orange-500'
              } focus:outline-none focus:ring-2 focus:ring-orange-200`}
              rows={4}
            />
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between">
            <button
              onClick={goToPreviousChallenge}
              className="flex items-center gap-2 px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous Challenge
            </button>
            
            <button
              onClick={goToNextChallenge}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-teal-500 hover:from-orange-600 hover:to-teal-600 text-white rounded-lg transition-all"
            >
              Next Challenge
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Motivational Quote */}
        <div className={`p-6 rounded-xl mb-8 ${
          darkMode ? 'bg-gray-800' : 'bg-white shadow-lg'
        }`}>
          <div className="text-center">
            <p className="text-lg italic text-gray-700 dark:text-gray-300 mb-2">
              "{currentQuote.text}"
            </p>
            <p className="text-sm font-medium text-orange-500">
              — {currentQuote.author}
            </p>
          </div>
        </div>

        {/* Bolt Badge */}
        <div className="fixed bottom-4 right-4 z-50">
          <a 
            href="https://bolt.new/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block hover:scale-110 transition-transform"
          >
            <img
              src={BoltBadge}
              alt="Built with Bolt"
              style={{ width: '50px', height: '50px' }}
            />
          </a>
        </div>
      </div>
    </div>
  );
}

export default App;