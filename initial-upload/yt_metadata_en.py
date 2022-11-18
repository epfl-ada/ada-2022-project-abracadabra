from time import sleep
import pandas as pd
from sqlalchemy import create_engine
from datetime import datetime

engine = create_engine("postgresql://postgres:ada2022@localhost:5433/ada")

next_tag_id = 0
rel_tag_video_meta_id = 0
tag_dict = dict()
pd.set_option('display.max_columns', None)
chunk_id = 0
with pd.read_json("/mnt/slow-disk/ada-dataset/yt_metadata_en.jsonl.gz", lines=True, chunksize=20_000) as reader:
    for chunk in reader:
        rel_video_tag_meta = []
        video_tags = []

        if chunk_id <= 3382:
            for record in chunk.iterrows():
                for tag in record[1]['tags'].split(','):
                    if tag not in tag_dict:
                        tag_dict[tag] = next_tag_id
                        next_tag_id += 1
                    rel_tag_video_meta_id += 1
            print(f"Completed metadata for chunk id {chunk_id}")
            chunk_id += 1
            continue

        for record in chunk.iterrows():
            for tag in record[1]['tags'].split(','):
                tag_id = tag_dict.get(tag, None)
                if tag_id is None:
                    tag_dict[tag] = next_tag_id
                    tag_id = next_tag_id
                    next_tag_id += 1
                    video_tags.append((tag_id, tag))
                rel_video_tag_meta.append((rel_tag_video_meta_id, record[0], tag_id))
                rel_tag_video_meta_id += 1

        df_rel_video_tag_meta = pd.DataFrame(rel_video_tag_meta, columns=['index', 'video_index', 'tag_index'])
        df_rel_video_tag_meta.to_sql('rel_video_tag_meta', index=False, if_exists='append', con=engine)
        rel_video_tag_meta.clear()
        df_video_tags = pd.DataFrame(video_tags, columns=['index', 'tag'])
        df_video_tags.to_sql('video_tags', index=False, if_exists='append', con=engine)
        video_tags.clear()

        chunk.drop(labels=['tags'], axis=1, inplace=True)
        chunk.to_sql('video_metadata', if_exists='append', con=engine)

        print(f"Chunk id {chunk_id}")
        chunk_id += 1
