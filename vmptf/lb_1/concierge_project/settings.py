import os
from pathlib import Path

# 1. Цей блок ОБОВ'ЯЗКОВО має бути вгорі, щоб не було помилки BASE_DIR
BASE_DIR = Path(__file__).resolve().parent.parent

# 2. Налаштування додатків (тільки один блок!)
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    # Бібліотеки
    'rest_framework',

    # Ваш додаток
    'management',
]

# 3. Налаштування шаблонів
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [BASE_DIR / 'templates'],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

# 4. Налаштування бази даних SQLite
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}