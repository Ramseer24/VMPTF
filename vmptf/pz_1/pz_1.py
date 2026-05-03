# --- ПРАКТИЧНА РОБОТА №1 ---

# Рівень 1: Завдання 3
def task_sum():
    print("\n--- Додавання двох чисел ---")
    try:
        num1 = float(input("Введіть перше число: "))
        num2 = float(input("Введіть друге число: "))
        print(f"Сума: {num1 + num2}")
    except ValueError:
        print("Помилка: Введіть числове значення.")


# Рівень 2: Завдання 3
def is_prime_number():
    print("\n--- Перевірка на просте число ---")
    try:
        start = int(input("Введіть ціле число: "))  # [cite: 132]
        end = int (input("кінець діапазону"))

        primes = []
        for num in range(start, end + 1):
            if num <= 1:
                continue

        is_prime = True
        for i  in range (2, int(num ** 0.5) + 1):
            if num % i == 0:
                is_prime = False
                break
        if is_prime:
            primes.append(num)

        if primes:
            print(f"прості числа в діапазоні [{start}, {end}]:")
            print(primes)
            print(f"всього є : {len(primes)} простих")
        else:
            print (f"У діапазоні [{start}, {end}]нема простих чисел:")
    except ValueError:
        print("ввести цілі числа")


# Рівень 3: Завдання 3
class Calculator:  #
    def add(self, a, b): return a + b

    def sub(self, a, b): return a - b

    def mul(self, a, b): return a * b

    def div(self, a, b):
        return a / b if b != 0 else "Помилка: Ділення на нуль"


# Рівень 4: Завдання 3
class Library:
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


def main():
    task_sum()
    is_prime_number()

    calc = Calculator()
    print(f"\nКалькулятор: {calc.add(10, 5)}")

    my_lib = Library()
    my_lib.add_book("Python для профі")
    my_lib.add_book("профі")
    my_lib.show_all()
    my_lib.remove_book("Python для профі")


if __name__ == "__main__":
    main()