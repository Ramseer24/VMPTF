import java.io.File
import java.util.Scanner

// Головна функція програми (точка входу)
fun main() {
    val scanner = Scanner(System.`in`)
    var isRunning = true

    while (isRunning) {
        println("\n=================================")
        println("Оберіть завдання для запуску:")
        println("1 -> Рівень 1: Список свят за місяцем")
        println("2 -> Рівень 2: Гра «Вгадай карту»")
        println("3 -> Рівень 3: Аналіз файлу (літери, пробіли, знаки)")
        println("4 -> Рівень 4: Шифр Цезаря (файли)")
        println("0 -> Вийти з програми")
        println("=================================")
        print("Ваш вибір: ")

        val choice = scanner.next()

        // Вираз when для вибору блоку коду [cite: 173-175]
        when (choice) {
            "1" -> task1Holidays()
            "2" -> task2Cards()
            "3" -> task3FileAnalysis()
            "4" -> task4CaesarCipher()
            "0" -> {
                println("Програма завершена. До побачення!")
                isRunning = false
            }
            else -> println("Невірний вибір. Спробуйте ще раз.")
        }
    }
}

// --- Функції для кожного із завдань ---

fun task1Holidays() {
    println("\n--- Рівень 1: Список свят ---")
    val scanner = Scanner(System.`in`)
    print("Введіть номер місяця (1-12): ")
    val month = scanner.nextInt()

    when (month) {
        1 -> println("Свята: Новий рік (1 січня), День Соборності України (22 січня)")
        2 -> println("Свята: День святого Валентина (14 лютого), День Героїв Небесної Сотні (20 лютого)")
        3 -> println("Свята: Міжнародний жіночий день (8 березня), Міжнародний день щастя (20 березня)")
        4 -> println("Свята: День сміху (1 квітня), Міжнародний день Землі (22 квітня)")
        5 -> println("Свята: День праці (1 травня), День пам'яті та перемоги над нацизмом (8 травня)")
        6 -> println("Свята: Міжнародний день захисту дітей (1 червня), День Конституції України (28 червня)")
        7 -> println("Свята: День Української Державності (15 липня), Міжнародний день шахів (20 липня)")
        8 -> println("Свята: День Державного Прапора України (23 серпня), День Незалежності України (24 серпня)")
        9 -> println("Свята: День знань (1 вересня), Міжнародний день миру (21 вересня)")
        10 -> println("Свята: День захисників і захисниць України (1 жовтня), Геловін (31 жовтня)")
        11 -> println("Свята: Міжнародний день студентів (17 листопада), День Гідності та Свободи (21 листопада)")
        12 -> println("Свята: День Збройних Сил України (6 грудня), Різдво Христове (25 грудня)")
        else -> println("Не знаю, що за день або місяць") // [cite: 177]
    }
}

fun task2Cards() {
    println("\n--- Рівень 2: Гра «Вгадай карту» ---")
    val suits = listOf("Піки", "Хрести", "Бубни", "Черви")
    val ranks = listOf("6", "7", "8", "9", "10", "Валет", "Дама", "Король", "Туз")

    // Створюємо колоду
    val deck = suits.flatMap { suit -> ranks.map { rank -> "$rank $suit" } }

    // Вибираємо 3 випадкові карти
    val hiddenCards = deck.shuffled().take(3)

    println("На столі 3 закриті карти.")
    print("Введіть номінал та масть (наприклад, 'Туз Піки'): ")
    val userGuess = readLine() ?: ""

    if (hiddenCards.contains(userGuess)) {
        println("Вітаємо! Ви вгадали карту.")
    } else {
        println("На жаль, ви не вгадали.")
    }
    println("Закриті карти були: $hiddenCards")
}

fun task3FileAnalysis() {
    println("\n--- Рівень 3: Аналіз файлу ---")
    print("Введіть ім'я файлу (наприклад, input.txt): ")
    val filePath = readLine() ?: return
    val file = File(filePath)

    // Перевірка існування файлу [cite: 220-221]
    if (!file.exists()) {
        println("Помилка: Файл не існує")
        return
    }

    // Читання тексту з файлу [cite: 214-215]
    val text = file.readText()
    var lettersCount = 0
    var spacesCount = 0
    var symbolsCount = 0

    for (char in text) {
        when {
            char.isLetter() -> lettersCount++
            char.isWhitespace() -> spacesCount++
            else -> symbolsCount++
        }
    }

    println("Результати аналізу файлу '$filePath':")
    println("Літер: $lettersCount")
    println("Пробілів/переносів: $spacesCount")
    println("Інших знаків: $symbolsCount")
}

fun task4CaesarCipher() {
    println("\n--- Рівень 4: Шифр Цезаря ---")
    print("Дія (1 - Шифрувати, 2 - Дешифрувати): ")
    val action = readLine()?.toIntOrNull() ?: return

    print("Введіть шлях до вхідного файлу (наприклад, input.txt): ")
    val inputFilePath = readLine() ?: return
    val inputFile = File(inputFilePath)

    if (!inputFile.exists()) {
        println("Помилка: Файл не існує")
        return
    }

    print("Введіть зсув (ціле число, наприклад, 3): ")
    val shift = readLine()?.toIntOrNull() ?: 0

    val text = inputFile.readText()

    val resultText = if (action == 1) {
        caesarLogic(text, shift)
    } else {
        caesarLogic(text, -shift)
    }

    print("Введіть файл для збереження (наприклад, output.txt): ")
    val outputFilePath = readLine() ?: return
    val outputFile = File(outputFilePath)

    // Запис тексту у файл [cite: 217-218]
    outputFile.writeText(resultText)
    println("Успішно! Збережено у файл '$outputFilePath'.")
}

// Допоміжна функція для математики шифру
fun caesarLogic(text: String, shift: Int): String {
    return text.map { char ->
        when {
            char in 'a'..'z' -> {
                val offset = (char - 'a' + shift) % 26
                val finalOffset = if (offset < 0) offset + 26 else offset
                ('a' + finalOffset).toChar()
            }
            char in 'A'..'Z' -> {
                val offset = (char - 'A' + shift) % 26
                val finalOffset = if (offset < 0) offset + 26 else offset
                ('A' + finalOffset).toChar()
            }
            else -> char
        }
    }.joinToString("")
}