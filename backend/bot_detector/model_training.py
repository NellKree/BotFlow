# src/model_training.py

import logging
import yaml
import joblib
import os
import numpy as np
from sklearn.model_selection import train_test_split, cross_validate
from sklearn.ensemble import RandomForestClassifier
from xgboost import XGBClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import classification_report

# Настройка логгирования
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def load_config(config_path="config.yaml"):
    """Загрузка конфигурации"""
    with open(config_path, 'r') as file:
        return yaml.safe_load(file)

cfg = load_config()

class ModelTrainer:
    def __init__(self, config):
        self.config = config
        self.models = {
            'RandomForest': RandomForestClassifier(**config['models']['random_forest']),
            'XGBoost': XGBClassifier(**config['models']['xgboost']),
            'LogisticRegression': LogisticRegression(**config['models']['logistic_regression'])
        }
        self.scoring = config['validation']['scoring_metrics']
        self.cv = config['validation']['cv_folds']
        self.model_dir = "models/"
        os.makedirs(self.model_dir, exist_ok=True)

    def load_data(self):
        logger.info("Загрузка обработанных данных...")
        df = pd.read_parquet(self.config['data']['output_path'])
        X = df.drop(columns=[self.config['target_column']])
        y = df[self.config['target_column']]
        return train_test_split(X, y, test_size=self.config['validation']['test_size'], random_state=42)

    def train_and_evaluate(self):
        X_train, X_test, y_train, y_test = self.load_data()
        results = {}

        for name, model in self.models.items():
            logger.info(f"Обучение модели {name}...")

            try:
                model.fit(X_train, y_train)
                preds = model.predict(X_test)

                logger.info(f"Метрики модели {name}:")
                print(classification_report(y_test, preds))

                scores = cross_validate(model, X_train, y_train, cv=self.cv, scoring=self.scoring)
                metrics = {metric: (np.mean(scores[f'test_{metric}']), np.std(scores[f'test_{metric}'])) for metric in self.scoring}
                results[name] = metrics

                joblib.dump(model, os.path.join(self.model_dir, f"{name}.pkl"))
                logger.info(f"Модель {name} сохранена.")

            except Exception as e:
                logger.error(f"Ошибка при обучении модели {name}: {e}")

        return results

if __name__ == "__main__":
    trainer = ModelTrainer(cfg)
    training_results = trainer.train_and_evaluate()
    print("Результаты кросс-валидации:")
    for model_name, metrics in training_results.items():
        print(f"\n{model_name}:")
        for metric, (mean, std) in metrics.items():
            print(f"  {metric}: {mean:.4f} ± {std:.4f}")