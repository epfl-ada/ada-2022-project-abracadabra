from time import sleep
import pandas as pd
from sqlalchemy import create_engine
from datetime import datetime

engine = create_engine("postgresql://postgres:ada2022@localhost:5433/ada")

dtype = {'category_cc ': 'object',
         'join_date': 'object',
         'channel': 'object',
         'name_cc': 'object',
         'subscribers_cc': 'int64',
         'videos_cc': 'int64',
         'subscriber_rank_sb': 'int64',
         'weights': 'float64',
         }

i = 0
with pd.read_csv("/mnt/slow-disk/ada-dataset/df_channels_en.tsv.gz", sep="\t", dtype=dtype, chunksize=10_000) as reader:
    for chunk in reader:
        chunk.to_sql('df_channels_en', if_exists='append', con=engine)
        print(f"{i} processed 10'000 rows")
        i += 1
