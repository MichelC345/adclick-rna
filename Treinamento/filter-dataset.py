# Arquivo para filtrar as informações da base de dados
# O arquivo salva terá a base de dados apenas com as informações relevantes e sem valores nulos
import pandas as pd

# Read the original dataset
df = pd.read_csv('ad_click_dataset.csv')

# Select the relevant columns
df_filtered = df[['age', 'gender', 'device_type', 'ad_position', 'browsing_history', 'time_of_day', 'click']]

# Remove rows with any null values
df_filtered = df_filtered.dropna()

# Save the filtered dataset to a new CSV file
df_filtered.to_csv('ad_click_dataset_filtered.csv', index=False)

print("Base de dados filtrada e salva em 'ad_click_dataset_filtered.csv'.")
