# 🎮 Advanced Hangman Game

A classic word-guessing game built with a modern twist using HTML, CSS, and vanilla JavaScript. This project goes beyond a simple Hangman clone, incorporating multiple themes, dynamic difficulty, strategic power-ups, and a real-time accuracy tracker to create a polished and engaging user experience.

-----

## ✨ Features

  * **Multi-Screen UI Flow:** A clean, step-by-step process from entering your name to reading instructions, choosing settings, and finally playing the game.
  * **Dynamic Themes:** Choose from **6 unique themes** (General, Animals, Technology, Food, Sports, Science), each with a distinct visual style and color palette.
  * **Customizable Difficulty:** Set the word length (from 4 to 10 letters) and the number of chances (from 3 to 10) for a tailored challenge.
  * **Guaranteed Word Availability:** The curated word lists ensure that a word matching your chosen theme and length is always available.
  * **No Repeats:** The game tracks words used during your session to ensure you get a fresh word every time you play.
  * **Strategic Power-Ups:** Use a variety of one-time power-ups to help you win:
      * **Show Hint:** Reveals a clue about the word.
      * **Reveal Letter:** Fills in one correct letter for you.
      * **Remove Mistake:** Erases your last wrong guess.
      * **50/50:** Removes half of the remaining incorrect letters from the keyboard.
  * **Conditional Logic:** Power-ups and hints are adjusted based on the difficulty you select.
  * **Timed Challenge Mode:** Add a 90-second timer for an extra layer of excitement.
  * **Live Accuracy Chart:** An animated bar chart provides real-time feedback on your guessing accuracy after every move.
  * **Full Keyboard Support:** Play using either the responsive on-screen keyboard or your physical keyboard.
  * **Sleek Animations:** Smooth screen transitions, animations for the hangman figure, and a celebratory effect for winning.

-----

## 🛠️ Technologies Used

  * **HTML5:** For the structure and content of the game.
  * **CSS3:** For all styling, including Flexbox layouts, gradients, transitions, and animations.
  * **JavaScript (ES6+):** For all game logic, state management, and DOM manipulation.

-----

## 🚀 How to Play

1.  **Enter Your Name:** Start by personalizing the game.
2.  **Read the Instructions:** Get a quick overview of the rules and power-ups.
3.  **Choose Your Settings:**
      * Select a **theme**.
      * Pick a **word length**.
      * Set the **number of chances**.
      * Optionally, enable **timed mode**.
4.  **Start Guessing:** Click letters on the on-screen keyboard or use your computer's keyboard.
5.  **Win\!** Guess all the letters in the word before the hangman is complete.

-----

## 📂 How to Run Locally

1.  Clone this repository or download the ZIP file.
    ```sh
    git clone https://github.com/your-username/advanced-hangman-game.git
    ```
2.  Navigate to the project directory.
    ```sh
    cd advanced-hangman-game
    ```
3.  Open the **`index.html`** file in your favorite web browser.

-----

## 📁 File Structure

  * **`index.html`**: The main HTML document that defines the structure for all the different screens of the application (Intro, Instructions, Settings, Game).
  * **`style.css`**: The stylesheet responsible for all visual elements. It includes general styling, dynamic theme colors, animations, and the layout for all components.
  * **`script.js`**: The core of the project. This file contains all the JavaScript logic for managing the game state, handling the UI flow, processing user input, and implementing all the game features like themes, power-ups, and the accuracy chart.
