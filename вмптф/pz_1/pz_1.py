# --- ПРАКТИЧНА РОБОТА №1 ---

# Рівень 1: Завдання 3
def task_sum():
    print("\n--- Додавання двох чисел ---")
    try:
        # Отримуємо введення від користувача [cite: 126]
        num1 = float(input("Введіть перше число: "))
        num2 = float(input("Введіть друге число: "))
        # Виводимо суму [cite: 185]
        print(f"Сума: {num1 + num2}")
    except ValueError:
        print("Помилка: Введіть числове значення.")


# Рівень 2: Завдання 3
def is_prime_number():
    print("\n--- Перевірка на просте число ---")
    try:
        n = int(input("Введіть ціле число: "))  # [cite: 132]
        if n <= 1:
            print(f"Число {n} не є простим.")  # [cite: 190]
            return

        for i in range(2, int(n ** 0.5) + 1):
            if n % i == 0:
                print(f"Число {n} не є простим.")
                return
        print(f"Число {n} — просте!")
    except ValueError:
        print("Помилка: Потрібно ввести ціле число.")


# Рівень 3: Завдання 3
class Calculator:  #
    def add(self, a, b): return a + b

    def sub(self, a, b): return a - b

    def mul(self, a, b): return a * b

    def div(self, a, b):
        return a / b if b != 0 else "Помилка: Ділення на нуль"


# Рівень 4: Завдання 3
class Library:  # Клас "Книготека" [cite: 200]
    def __init__(self):
        self.books = []  # [cite: 28]

    def add_book(self, title):
        self.books.append(title)
        print(f"Книгу '{title}' додано.")

    def remove_book(self, title):
        if title in self.books:
            self.books.remove(title)
            print(f"Книгу '{title}' видалено.")
        else:
            print("Такої книги немає.")

    def show_all(self):
        print(f"Список книг: {self.books}" if self.books else "Бібліотека порожня.")


# Головна функція для запуску всього проєкту
def main():
    # Виклик функцій рівнів 1 та 2
    task_sum()
    is_prime_number()

    # Демонстрація Калькулятора (Рівень 3)
    calc = Calculator()
    print(f"\nКалькулятор: {calc.mul(10, 5)}")

    # Демонстрація Книготеки (Рівень 4)
    my_lib = Library()
    my_lib.add_book("Python для профі")
    my_lib.add_book("профі")
    my_lib.show_all()
    my_lib.remove_book("Python для профі")


if __name__ == "__main__":
    main()