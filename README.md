# Hangman
This is small interactive hangman game

# 🎮 Hangman Game - Python Tkinter GUI

This is a fully interactive **Hangman Game** built with **Python's Tkinter GUI toolkit**. The game randomly selects an English word (with a guaranteed real dictionary definition from WordNet) and allows the player to guess it letter by letter.

---

## 🖥️ Features

- ✅ GUI built with Tkinter for a smooth and colorful experience
- ✅ Word is randomly picked from the official NLTK English corpus
- ✅ Guaranteed **dictionary definition** for the selected word (shown as a hint)
- ✅ Hints automatically shown at **half of the allowed attempts**
- ✅ Colorful feedback: **green flash** for correct guess, **red flash** for wrong
- ✅ Personalized player experience: enter your name before starting
- 🖼️ Intro screen includes a Hangman image to make the game more engaging

---

## 📦 Requirements

- Python 3.x
- Required Python packages:
  - `nltk`
  - `pillow` (for image display in GUI)

### 🔧 Installation
Clone the repository

or

import nltk
nltk.download('words')
nltk.download('wordnet')
nltk.download('omw-1.4')
