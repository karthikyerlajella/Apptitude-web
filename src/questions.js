// src/questions.js

export const questionBank = {
  // --- REAL DATA FOR TOP 10 TOPICS ---
  
  // Topic 0: Problems on Train
  0: [
    { id: 1, question: "A train running at 60 km/hr crosses a pole in 9 seconds. Length of the train is?", options: ["120 m", "150 m", "180 m", "324 m"], answer: "150 m" },
    { id: 2, question: "A train 125 m long passes a man running at 5 km/hr in same direction in 10s. Speed of train?", options: ["45 km/hr", "50 km/hr", "54 km/hr", "55 km/hr"], answer: "50 km/hr" },
    { id: 3, question: "Length of bridge which a train 130 m long and traveling at 45 km/hr can cross in 30s?", options: ["200 m", "225 m", "245 m", "250 m"], answer: "245 m" }
  ],
  // Topic 1: Height and Distance
  1: [
    { id: 1, question: "Angle of elevation of a ladder leaning against a wall is 60° and foot is 4.6 m away. Length of ladder?", options: ["2.3 m", "4.6 m", "7.8 m", "9.2 m"], answer: "9.2 m" },
    { id: 2, question: "The angle of elevation of the sun, when the length of the shadow of a tree is equal to the height of the tree, is:", options: ["30°", "45°", "60°", "90°"], answer: "45°" },
    { id: 3, question: "An observer 1.6 m tall is 20.3 m away from a tower. The angle of elevation of the top of the tower from his eye is 30°. Height of tower?", options: ["21.76 m", "23.2 m", "24.72 m", "None"], answer: "None" }
  ],
  // Topic 2: Simple Interest
  2: [
    { id: 1, question: "A sum at simple interest amounts to Rs. 815 in 3 years and Rs. 854 in 4 years. The sum is:", options: ["Rs. 650", "Rs. 690", "Rs. 698", "Rs. 700"], answer: "Rs. 698" },
    { id: 2, question: "What annual payment will discharge a debt of Rs. 6450 due in 4 years at 5% simple interest?", options: ["Rs. 1400", "Rs. 1500", "Rs. 1550", "Rs. 1600"], answer: "Rs. 1500" },
    { id: 3, question: "At what rate percent per annum will a sum of money double in 16 years?", options: ["6.25%", "6%", "6.5%", "7%"], answer: "6.25%" }
  ],
  // Topic 3: Profit and Loss
  3: [
    { id: 1, question: "Alfred buys an old scooter for Rs. 4700 and spends Rs. 800 on its repairs. If he sells it for Rs. 5800, his gain percent is:", options: ["4.47%", "5.45%", "10%", "12%"], answer: "5.45%" },
    { id: 2, question: "The cost price of 20 articles is the same as the selling price of x articles. If the profit is 25%, then the value of x is:", options: ["15", "16", "18", "25"], answer: "16" },
    { id: 3, question: "A vendor bought toffees at 6 for a rupee. How many for a rupee must he sell to gain 20%?", options: ["3", "4", "5", "6"], answer: "5" }
  ],
  // Topic 4: Percentage
  4: [
    { id: 1, question: "Two students appeared at an examination. One of them secured 9 marks more than the other and his marks was 56% of the sum of their marks. The marks obtained by them are:", options: ["39, 30", "41, 32", "42, 33", "43, 34"], answer: "42, 33" },
    { id: 2, question: "If 20% of a = b, then b% of 20 is the same as:", options: ["4% of a", "5% of a", "20% of a", "None"], answer: "4% of a" },
    { id: 3, question: "The population of a town increased from 1,75,000 to 2,62,500 in a decade. The average percent increase of population per year is:", options: ["4.37%", "5%", "6%", "8.75%"], answer: "5%" }
  ],
  // Topic 5: Calendar
  5: [
    { id: 1, question: "It was Sunday on Jan 1, 2006. What was the day of the week Jan 1, 2010?", options: ["Sunday", "Saturday", "Friday", "Wednesday"], answer: "Friday" },
    { id: 2, question: "What was the day of the week on 28th May, 2006?", options: ["Thursday", "Friday", "Saturday", "Sunday"], answer: "Sunday" },
    { id: 3, question: "Which year will have the same calendar as that of 2009?", options: ["2015", "2016", "2017", "2018"], answer: "2015" }
  ],
  // Topic 6: Average
  6: [
    { id: 1, question: "The average of first 50 natural numbers is:", options: ["12.25", "21.25", "25", "25.5"], answer: "25.5" },
    { id: 2, question: "The average of 20 numbers is zero. Of them, at the most, how many may be greater than zero?", options: ["0", "1", "10", "19"], answer: "19" },
    { id: 3, question: "The captain of a cricket team of 11 members is 26 years old and the wicket keeper is 3 years older. If the ages of these two are excluded, the average age of the remaining players is one year less than the average age of the whole team. What is the average age of the team?", options: ["23 years", "24 years", "25 years", "None"], answer: "23 years" }
  ],
  // Topic 7: Volume and Surface Area
  7: [
    { id: 1, question: "A hall is 15 m long and 12 m broad. If the sum of the areas of the floor and the ceiling is equal to the sum of the areas of the four walls, the volume of the hall is:", options: ["720", "900", "1200", "1800"], answer: "1200" },
    { id: 2, question: "66 cubic cm of silver is drawn into a wire 1 mm in diameter. The length of the wire in meters will be:", options: ["84", "90", "168", "336"], answer: "84" },
    { id: 3, question: "A cone, a hemisphere and a cylinder stand on equal bases and have the same height. The ratio of their volumes is:", options: ["1:2:3", "2:1:3", "2:3:1", "3:2:1"], answer: "1:2:3" }
  ],
  // Topic 8: Numbers
  8: [
    { id: 1, question: "Which one of the following is not a prime number?", options: ["31", "61", "71", "91"], answer: "91" },
    { id: 2, question: "The difference of two numbers is 1365. On dividing the larger number by the smaller, we get 6 as quotient and 15 as remainder. What is the smaller number?", options: ["240", "270", "295", "360"], answer: "270" },
    { id: 3, question: "The sum of all two digit numbers divisible by 5 is:", options: ["1035", "1245", "1230", "945"], answer: "945" }
  ],
  // Topic 9: HCF and LCM
  9: [
    { id: 1, question: "Find the greatest number that will divide 43, 91 and 183 so as to leave the same remainder in each case.", options: ["4", "7", "9", "13"], answer: "4" },
    { id: 2, question: "The H.C.F. of two numbers is 23 and the other two factors of their L.C.M. are 13 and 14. The larger of the two numbers is:", options: ["276", "299", "322", "345"], answer: "322" },
    { id: 3, question: "The least number which should be added to 2497 so that the sum is exactly divisible by 5, 6, 4 and 3 is:", options: ["3", "13", "23", "33"], answer: "23" }
  ],

  // --- PLACEHOLDER DATA FOR REMAINING TOPICS (10-34) ---
  // This ensures the app doesn't crash when you click links.
  // You can replace these with real questions later.
  ...Array.from({ length: 25 }, (_, i) => i + 10).reduce((acc, id) => {
    acc[id] = [
      { id: 1, question: "Practice Question 1: Choose Option A", options: ["Option A", "Option B", "Option C", "Option D"], answer: "Option A" },
      { id: 2, question: "Practice Question 2: Choose Option B", options: ["Option A", "Option B", "Option C", "Option D"], answer: "Option B" },
      { id: 3, question: "Practice Question 3: Choose Option C", options: ["Option A", "Option B", "Option C", "Option D"], answer: "Option C" }
    ];
    return acc;
  }, {})
};