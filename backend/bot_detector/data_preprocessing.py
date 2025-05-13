# src/data_preprocessing.py

import pandas as pd
import numpy as np
import re
import logging
from datetime import datetime, timezone
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import OneHotEncoder, StandardScaler
from sklearn.impute import SimpleImputer
from sklearn.feature_extraction.text import TfidfVectorizer
import yaml
import os

# Настройка логгирования
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def load_config(config_path="config.yaml"):
    """Загрузка конфигурации"""
    with open(config_path, 'r') as file:
        return yaml.safe_load(file)

cfg = load_config()

class DataPreprocessor:
    def __init__(self, config):
        self.config = config
        self.text_transformer = TfidfVectorizer(
            max_features=500,
            stop_words='english',
            lowercase=True,
            strip_accents='unicode',
            tokenizer=self._custom_tokenize
        )
        self.categorical_features = config['features']['categorical']
        self.numerical_features = config['features']['numerical']
        self.target_col = config['target_column']

    def _remove_emojis(self, text):
        emoji_pattern = re.compile("["
                                   u"\U0001F600-\U0001F64F"  # эмодзи (смайлики)
                                   u"\U0001F300-\U0001F5FF"  # символы и пиктограммы
                                   u"\U0001F680-\U0001F6FF"  # транспорт и символы
                                   u"\U0001F1E0-\U0001F1FF"  # флаги
                                   "]+", flags=re.UNICODE)
        return emoji_pattern.sub(r'', str(text))

    def _custom_tokenize(self, text):
        # Удаление специальных символов и разделение по словам
        text = re.sub(r'[^a-zA-Z\s]', '', str(text))
        return text.lower().split()

    def load_data(self):
        logger.info("Загрузка сырых данных...")
        df = pd.read_csv(self.config['data']['input_path'])
        return df

    def clean_data(self, df):
        logger.info("Очистка данных от дубликатов и пропусков...")
        df.drop_duplicates(inplace=True)
        required_cols = self.config['features']['datetime_fields'] + self.config['features']['text_fields']
        df.dropna(subset=required_cols, inplace=True)
        return df

    def standardize_timestamps(self, df):
        logger.info("Приведение временных меток к UTC...")
        for col in self.config['features']['datetime_fields']:
            df[col] = pd.to_datetime(df[col], errors='coerce')
            df[col] = df[col].dt.tz_localize(None)  # убираем часовой пояс
        df['account_age_days'] = (datetime.now(timezone.utc) - pd.to_datetime(df['created_at'], utc=True)).dt.days
        return df

    def clean_text(self, df):
        logger.info("Очистка текстовых данных...")
        for col in self.config['features']['text_fields']:
            df[col] = df[col].apply(lambda x: self._remove_emojis(x))
        return df

    def extract_additional_features(self, df):
        logger.info("Извлечение новых признаков...")
        df['avg_time_between_actions'] = np.random.uniform(0, 24, len(df))  # пример извлечения
        df['unique_interactions_count'] = np.random.randint(1, 50, len(df))
        df['activity_regularity'] = np.random.rand(len(df))
        return df

    def build_preprocessor(self):
        logger.info("Создание препроцессора...")
        preprocessor = ColumnTransformer(
            transformers=[
                ('num', Pipeline([
                    ('imputer', SimpleImputer(strategy='median')),
                    ('scaler', StandardScaler())
                ]), self.numerical_features),
                ('cat', Pipeline([
                    ('imputer', SimpleImputer(strategy='most_frequent')),
                    ('onehot', OneHotEncoder(handle_unknown='ignore'))
                ]), self.categorical_features),
                ('txt', self.text_transformer, self.config['features']['text_fields'][0])
            ])
        return preprocessor

    def run(self):
        df = self.load_data()
        df = self.clean_data(df)
        df = self.standardize_timestamps(df)
        df = self.clean_text(df)
        df = self.extract_additional_features(df)

        X = df[self.categorical_features + self.numerical_features + self.config['features']['text_fields']]
        y = df[self.target_col]

        preprocessor = self.build_preprocessor()
        X_processed = preprocessor.fit_transform(X)

        logger.info("Сохранение обработанных данных...")
        processed_df = pd.DataFrame(X_processed.toarray() if hasattr(X_processed, "toarray") else X_processed)
        processed_df[self.target_col] = y.reset_index(drop=True)
        os.makedirs(os.path.dirname(self.config['data']['output_path']), exist_ok=True)
        processed_df.to_parquet(self.config['data']['output_path'])

        return X_processed, y