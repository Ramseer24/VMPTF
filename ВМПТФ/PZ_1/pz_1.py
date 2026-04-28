# ПРАКТИЧНЕ ЗАНЯТТЯ № 1. ОСНОВИ PYTHON ТА РОБОТА З ДАНИМИ

# --- Рівень 1 ---

# Завдання 1: Виведення чисел від 1 до 10 [cite: 183]
print("--- Завдання 1: Числа від 1 до 10 ---")
for i in range(1, 11):
    print(i)
print("-" * 30)


# --- Рівень 2 ---

# Завдання 2: Список чисел від 1 до 20 та їх квадрати [cite: 189]
# Списки — це змінювані послідовності
print("\n--- Завдання 2: Числа та їх квадрати (1-20) ---")
numbers = list(range(1, 21))
for n in numbers:
    square = n ** 2
    print(f"Число: {n}, Квадрат: {square}")
print("-" * 30)


# --- Рівень 3 ---

# Завдання 1: Розрахунок віку за роком народження [cite: 193]
# Для отримання даних використовуємо input(),
# а для математичних операцій перетворюємо рядок у ціле число за допомогою int().
print("\n--- Завдання 3: Розрахунок віку ---")
try:
    birth_year = int(input("Введіть ваш рік народження: "))
    current_year = 2026  # Поточний рік за умовами системи
    age = current_year - birth_year
    print(f"Ваш вік: {age} років.")
except ValueError:
    print("Помилка: будь ласка, введіть числове значення року.")
print("-" * 30)


# --- Рівень 4 ---

# Завдання 4: Алгоритм швидкого сортування (QuickSort)
print("\n--- Завдання 4: Швидке сортування (QuickSort) ---")

def quicksort(arr):
    if len(arr) <= 1:
        return arr
    pivot = arr[len(arr) // 2]  # Вибір опорного елемента
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    return quicksort(left) + middle + quicksort(right)

# Приклад виконання
unsorted_array = [12, 4, 5, 6, 7, 3, 1, 15, 2, 8]
sorted_array = quicksort(unsorted_array)

print(f"Початковий масив: {unsorted_array}")
print(f"Відсортований масив: {sorted_array}")
print("-" * 30)