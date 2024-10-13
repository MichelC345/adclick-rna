import pandas as pd
#from imblearn.over_sampling import RandomOverSampler

# Load the dataset
#df = pd.read_csv('ad_click_dataset_filtered.csv')
df = pd.read_csv('ad_click_dataset_balanced.csv')

#print("Balanced dataset saved as 'dataset_balanced.csv'.")
print(df['click'].value_counts())