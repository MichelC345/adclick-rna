import pandas as pd
from imblearn.over_sampling import RandomOverSampler

# Load the dataset
df = pd.read_csv('ad_click_dataset_filtered.csv')

# Separate the features and the target variable
X = df.drop('click', axis=1)
y = df['click']

# Initialize the oversampler
ros = RandomOverSampler(random_state=42)

# Resample the dataset to balance the classes
X_resampled, y_resampled = ros.fit_resample(X, y)

# Combine the resampled features and target into a new DataFrame
df_balanced = pd.DataFrame(X_resampled, columns=X.columns)
df_balanced['click'] = y_resampled

# Save the balanced dataset
df_balanced.to_csv('ad_click_dataset_balanced.csv', index=False)

print("A base de dados está balanceada e salva em 'ad_click_dataset_balanced.csv'.")
