from time import sleep
import pandas as pd
from sqlalchemy import create_engine
from datetime import datetime

engine = create_engine("postgresql://postgres:ada2022@localhost:5433/ada")

dtype = {
    'channel': 'object',
    'category': 'object',
    'datetime': 'object',
    'views': 'float64',
    'delta_views': 'float64',
    'subs': 'float64',
    'delta_subs': 'float64',
    'videos': 'int64',
    'delta_videos': 'int64',
    'activity': 'int64'
}

pd.set_option('display.max_columns', None)
i = 0
with pd.read_csv("/mnt/slow-disk/ada-dataset/df_timeseries_en.tsv.gz", dtype=dtype, sep="\t", chunksize=10_000) as reader:
    for chunk in reader:
        chunk.to_sql('df_timeseries_en', if_exists='append', con=engine)
        #print(chunk)
        print(f"{i} Processed 10'000 rows")
        i += 1
