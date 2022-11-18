from time import sleep
import pandas as pd
from sqlalchemy import create_engine
import sys
engine = create_engine("postgresql://postgres:ada2022@localhost:5433/ada")

dtype = {
    'author': 'object',
    'video_id': 'object',
    'likes': 'int64',
    'replies': 'int64'
}

pd.set_option('display.max_columns', None)
i = 1
with pd.read_csv("/mnt/slow-disk/ada-dataset/youtube_comments.tsv.gz",
                 sep="\t", chunksize=100_000, on_bad_lines='warn') as reader:
    for chunk in reader:
        if i > 63220:
            chunk['likes'] = pd.to_numeric(chunk['likes'], errors='coerce')
            chunk['replies'] = pd.to_numeric(chunk['replies'], errors='coerce')
            len_before = len(chunk)
            chunk.dropna(inplace=True)
            chunk = chunk.astype(dtype, copy=True, errors='raise')
            len_diff = len_before - len(chunk)
            if len_diff != 0:
                print(f"Removed {len_diff} rows from batch {i} due to malformed input", file=sys.stderr)
            chunk.to_sql('youtube_comments', if_exists='append', con=engine)
            print(f"{i} Processed 100'000 rows")
        else:
            print(f"{i} Catching up 100'000 rows")
        i += 1
