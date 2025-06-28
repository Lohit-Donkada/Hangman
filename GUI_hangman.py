import tkinter as tk
from tkinter import messagebox
from PIL import Image, ImageTk  # Requires `Pillow` package
import random
import nltk
from nltk.corpus import words, wordnet as wn

# Ensure NLTK corpora are available
for resource in ['words', 'wordnet', 'omw-1.4']:
    try:
        nltk.data.find(f'corpora/{resource}')
    except LookupError:
        nltk.download(resource)

# --------- Game Logic ---------
def choose_word_with_hint():
    word_list = [word.lower() for word in words.words() if word.isalpha() and len(word) >= 4]
    random.shuffle(word_list)

    for word in word_list:
        syns = wn.synsets(word)
        if syns:
            return word, syns[0].definition()

    return random.choice(word_list), "No definition found."

# --------- GUI Game Class ---------
class HangmanGUI:
    def __init__(self, root):
        self.root = root
        self.root.title("Hangman Game")
        self.root.geometry("550x500")
        self.root.configure(bg="#f0f0f0")
        self.secret_word = ''
        self.guessed_letters = set()
        self.max_attempts = 0
        self.attempts_left = 0
        self.hint = ''
        self.hint_shown = False
        self.img = None  # Placeholder for image

        self.create_intro_screen()

    def create_intro_screen(self):
        self.clear_screen()
        self.root.configure(bg="#d0eaff")

        tk.Label(
            self.root, text="🎉 Welcome to Hangman 🎉",
            font=("Comic Sans MS", 22, "bold"), fg="#003366", bg="#d0eaff"
        ).pack(pady=10)

        try:
            img = Image.open("hangman.png").resize((150, 150))
            self.img = ImageTk.PhotoImage(img)
            tk.Label(self.root, image=self.img, bg="#d0eaff").pack(pady=5)
        except:
            tk.Label(self.root, text="[Image missing: hangman.png]", bg="#d0eaff", fg="red").pack()

        tk.Label(
            self.root, text="Enter your name to begin:", font=("Arial", 14), bg="#d0eaff"
        ).pack(pady=10)

        self.name_entry = tk.Entry(self.root, font=("Arial", 14), justify="center")
        self.name_entry.pack(pady=10, ipady=5)

        self.start_button = tk.Button(
            self.root, text="Start Game", font=("Arial", 14, "bold"),
            bg="#28a745", fg="white", command=self.start_game, padx=20, pady=5
        )
        self.start_button.pack(pady=20)

    def start_game(self):
        self.player_name = self.name_entry.get().strip().title()
        if not self.player_name:
            messagebox.showwarning("Input Error", "Please enter your name.")
            return

        self.secret_word, self.hint = choose_word_with_hint()
        self.guessed_letters = set()
        self.max_attempts = len(self.secret_word)
        self.attempts_left = self.max_attempts
        self.hint_shown = False

        self.create_game_screen()

    def create_game_screen(self):
        self.clear_screen()
        self.root.configure(bg="#ffffff")

        self.status_label = tk.Label(self.root, text=f"Hello {self.player_name}! Guess the word:",
                                     font=("Arial", 14), bg="#ffffff")
        self.status_label.pack(pady=5)

        self.word_display = tk.Label(self.root, text=self.get_display_word(),
                                     font=("Courier", 30, "bold"), bg="#ffffff")
        self.word_display.pack(pady=10)

        self.attempts_label = tk.Label(self.root, text=f"Attempts Left: {self.attempts_left}",
                                       font=("Arial", 14), bg="#ffffff")
        self.attempts_label.pack(pady=5)

        self.hint_label = tk.Label(self.root, text="", font=("Arial", 12), fg="blue", bg="#ffffff")
        self.hint_label.pack(pady=5)

        self.input_frame = tk.Frame(self.root, bg="#ffffff")
        self.input_frame.pack(pady=10)

        self.guess_entry = tk.Entry(self.input_frame, width=5, font=("Arial", 18), justify="center")
        self.guess_entry.grid(row=0, column=0, padx=5)

        self.submit_button = tk.Button(self.input_frame, text="Guess", command=self.process_guess,
                                       font=("Arial", 14), bg="#007bff", fg="white")
        self.submit_button.grid(row=0, column=1)

    def get_display_word(self):
        return ' '.join([letter if letter in self.guessed_letters else '_' for letter in self.secret_word])

    def flash_color(self, color):
        original = self.root["bg"]
        self.root.configure(bg=color)
        self.root.after(1000, lambda: self.root.configure(bg=original))

    def process_guess(self):
        guess = self.guess_entry.get().lower()
        self.guess_entry.delete(0, tk.END)

        if not guess.isalpha() or len(guess) != 1:
            messagebox.showwarning("Invalid Input", "Please enter a single letter.")
            return

        if guess in self.guessed_letters:
            messagebox.showinfo("Repeated Letter", "You already guessed that letter.")
            return

        self.guessed_letters.add(guess)

        if guess in self.secret_word:
            self.word_display.config(text=self.get_display_word())
            self.flash_color("#d4edda")  # Green background for correct
            if all(letter in self.guessed_letters for letter in self.secret_word):
                self.end_game(win=True)
        else:
            self.attempts_left -= 1
            self.attempts_label.config(text=f"Attempts Left: {self.attempts_left}")
            self.flash_color("#f8d7da")  # Red background for wrong

            if not self.hint_shown and self.attempts_left <= self.max_attempts // 2:
                self.hint_label.config(text=f"💡 Hint: {self.hint}")
                self.hint_shown = True

            if self.attempts_left == 0:
                self.end_game(win=False)

    def end_game(self, win):
        result = "🎉 Congratulations!" if win else "💀 Game Over!"
        message = (
            f"{result}\n\nThe word was: {self.secret_word}\nMeaning: {self.hint}"
        )
        messagebox.showinfo("Game Result", message)
        self.create_intro_screen()

    def clear_screen(self):
        for widget in self.root.winfo_children():
            widget.destroy()

# --------- Run the App ---------
if __name__ == "__main__":
    root = tk.Tk()
    app = HangmanGUI(root)
    root.mainloop()