-- get (video_id, vid_category, author_id, video_title) where commenter commented on both gaming and News & politics video channel

CREATE TABLE comments_gaming_politics AS
with filter_comment_authors_2cat as (SELECT yc.author
FROM (select title, video_id, category_e
      from video_metadata where category_e in ('News & Politics', 'Gaming')
) as "vm"
INNER JOIN youtube_comments yc on vm.video_id = yc.video_id
group by yc.author
having count(distinct category_e) = 2),

author_vid_id as (select yc.author, yc.video_id from youtube_comments yc inner join filter_comment_authors_2cat
    on yc.author = filter_comment_authors_2cat.author)

select vm.video_id, vm.category_e, author_vid_id.author, vm.title, vm.description from video_metadata vm
    inner join author_vid_id on author_vid_id.video_id = vm.video_id
    where category_e in ('News & Politics', 'Gaming');
         

--
CREATE TABLE video_id_in_description AS
  SELECT vm.video_id as source_video_id,
       (regexp_matches(vm.description,
           '(?:(?:https?:)?\/\/)?(?:(?:www|m)\.)?(?:youtube(-nocookie)?\.com|youtu.be)' ||
           '\/(?:[\w\-]+\?v=|embed\/|v\/)?([\w\-]{11})', 'g'))[2]::varchar(11) as contained_video_id

from video_metadata vm;

--
CREATE TABLE channel_id_in_description AS
  SELECT vm.video_id as source_video_id,
       (regexp_matches(vm.description,
        '(?:(?:https?:)?\/\/)?(?:(?:www|m)\.)?(?:youtube(-nocookie)?\.com|youtu.be)\/(?:channel|c\/)(\w+)',
           'g'))[2] as contained_channel_id, vm.description

from video_metadata vm;


CREATE TABLE links_betwenn_gaming_poli_channels AS
with filter_comment_authors_2cat as
         (SELECT yc.author, ARRAY_AGG(distinct ch_id_enum) as channel_ids
          FROM (select video_id, category_e, channel_id::channels_200_most_popular as ch_id_enum --optimisation enum are smaller and much faster to compare
                from video_metadata
                where
                  -- category_e in ('News & Politics', 'Gaming') and
                  channel_id in ('UCcmpeVbSSQlZRvHfdC-CRwg', 'UCsgC5cbz3DE2Shh34gNKiog', 'UCBi2mrWuNuyYy4gbM6fU18Q', 'UC_2irx_BQR7RsBKmUV9fePQ', 'UCv3rFzn-GHGtqzXiaq3sWNg', 'UCH7nv1A9xIrAifZJNvt7cgA', 'UCRWFSbif-RFENbBrSiez1DA', 'UCmphdqZNmqL72WJ2uyiNw5w', 'UCHTK-2W11Vh1V4uwofOfR4w', 'UCMmpLL2ucRHAXbNHiCPyIyg', 'UCNye-wNBqNL5ZzHSJj3l8Bg', 'UCYVinkwSX7szARULgYpvhLw', 'UCzYfz8uibvnB7Yc1LjePi4g', 'UCiwIAU4SNlrcv47504JrJeQ', 'UCw-qpEGN-NutDLSdbJ364UQ', 'UC16niRr50-MSBwiO3YDb3RA', 'UCBw-Dz6wHRkxiXKCLoWqDzA', 'UCuj1Ms9_LCsQPSJ4p8nvOVA', 'UCfwx98Wty7LhdlkxL5PZyLA', 'UCbgtuRStKI_5ACSjubSTUPA', 'UCrwE8kVqtIUVUzKui2WVpuQ', 'UCUMZ7gohGI9HcU9VNsr2FJQ', 'UCcyq283he07B7_KUX07mmtA', 'UCuFFtHWoLl5fauMMD5Ww2jA', 'UC8p1vwvWtl6T73JiExfWs1g', 'UCupvZG-5ko_eiXAupbDfxWw', 'UC9YydG57epLqxA9cTzZXSeQ', 'UCshoKvlZGZ20rVgazZp5vnQ', 'UCZyxY8Q7xgUCXfFViWkjrSw', 'UCnzbVkknmqhRqUKg7RDTDeg', 'UCoSNIVBEIX6EIateDDKVlBA', 'UC_F8DoJf9MZogEOU51TpTbQ', 'UCD1Em4q90ZUK2R5HKesszJg', 'UCiYcA0gJzg855iSKMrX3oHg', 'UCEaReYkPVfExkfXptk0bSPw', 'UCKwucPzHZ7zCUIf7If-Wo1g', 'UCbJ9W-EexsJSMc4wMPOA9pA', 'UCdDDI_RspwNf_0AADlThxYQ', 'UCvPW1W4WlpTgNezZzwIstLA', 'UCS5Oz6CHmeoF7vSad0qqXfw', 'UCERUmrDh9hmqEXBsnYFNTIA', 'UCQRIKdVEcMTIBaoHLMEN5uA', 'UCOaMOXfe8EWH1GJyhqhXrAA', 'UC-CSyyi47VX1lD9zyeABW3w', 'UC7oRQA4vxSXoZE1MKk_Vh2Q', 'UC11PvrGPzo6Y7Zc6-e9cAKg', 'UCnMBV5Iw4WqKILKue1nP6Hg', 'UCqNH56x9g4QYVpzmWTzqVYg', 'UCJi8M0hRKjz8SLPvJKEVTOg', 'UCHtehvb3p55uRCQBDCwF-ow', 'UC2nZMhZ2qG5-xpqb440WLYg', 'UCTur7oM6mLL0rM2k0znuZpQ', 'UCC-RHF_77zQdKcA75hr5oTQ', 'UCa7507M549AiDKN8J89tn5A', 'UCNdpD9V0PIrH1glUJ6RG4-w', 'UCxaVOVnhmT0-HCUv72jtOTA', 'UCChwR7eLKtbl1KyI7VFASzQ', 'UCtb8P4rf_1n8KS8eZk_lNNw', 'UClG8odDC8TS6Zpqk9CGVQiQ', 'UCXIJgqnII2ZOINSWNOGFThA', 'UCqYw-CTd1dU2yGI71sEyqNw', 'UCj5RwDivLksanrNvkW0FB4w', 'UC9CuvdOVfMPvKCiwdGKL3cQ', 'UC_ItCy-BTDCULPpDPlieUKA', 'UCrkfdiZ4pF3f5waQaJtjXew', 'UC_vt34wimdCzdkrzVejwX9g', 'UCR9Gcq0CMm6YgTzsDxAxjOQ', 'UCClNRixXlagwAd--5MwJKCw', 'UCH6caKt8TcswUZRk_JUz7TA', 'UC-kOXc3gBwksVfmndSEz7jg', 'UCKy1dAqELo0zrOtPkf0eTMw', 'UCWew_LbiRfU_pn71wjfHV4g', 'UCEwlPFzuck7KyNAnsujkkFg', 'UCYPvAwZP8pZhSMW8qs7cVCw', 'UCttspZesZIDEwwpVIgoZtWQ', 'UCS7b93ZwoL1xt2hR7a7l2mg', 'UC9k-yiEpRHMNVOnOi_aQK8w', 'UCUk7VggtJdo9XYTy3Z5QVAw', 'UC0DZmkupLYwc0yDsfocLh0A', 'UCrYnLkVfvVf0Qy0YOUQdk2A', 'UCEa-JnNdYCIFn3HMhjGEWpQ', 'UCdJdEguB1F1CiYe7OEi3SBg', 'UCfPhyExfcaqJBKc3HO3cNBw', 'UCwcH94eG9YYAn1G2nfw3j-w', 'UCGmnsW623G1r-Chmo5RB4Yw', 'UC90RW5ZmBBqp4r2QIQxfACA', 'UCP-CAwOG0AiieZNFdONsN5Q', 'UCzTlXb7ivVzuFlugVCv3Kvg', 'UCh7EqOZt7EvO2osuKbIlpGg', 'UC7FjKhLqAnYZcYGhjnHtU7Q', 'UCw1SQ6QRRtfAhrN_cjkrOgA', 'UCxJf49T4iTO_jtzWX3rW_jg', 'UC2t5bjwHdUX4vM2g8TRDq5g', 'UCgrA08uO7JR9h6Xr-ONjPkA', 'UCcWl6q7rcJ9WoF_Kwmxg23A', 'UCaXkIU1QidjPwiAYu6GcHjg', 'UCP0uG-mcMImgKnJz-VjJZmQ', 'UCzUV5283-l5c0oKRtyenj6Q', 'UC7_YxT-KID8kRbqZo7MyscQ', 'UCEdvpU2pFRCVqU6yIPyTpMQ', 'UCrSgaO6xOY8YV1EoCbD51HA', 'UCQCnMFr8uHBaMTaNBhych_A', 'UCWZmCMB7mmKWcXJSIPRhzZw', 'UCyeVfsThIHM_mEZq7YXIQSQ', 'UChFur_NwVSbUozOcF_F2kMg', 'UCd534c_ehOvrLVL2v7Nl61w', 'UCYgT6J0U3pxRQngmVwpha1w', 'UCvQczq3aHiHRBGEx-BKdrcg', 'UCeY0bbntWzzVIaj2z3QigXg', 'UCZFMm1mMw0F81Z37aaEzTUA', 'UC9CYT9gSNLevX5ey2_6CK0Q', 'UCumtYpCY26F6Jr3satUgMvA', 'UCWccuWvLF2-q53g_liVLxBg', 'UC7yRILFFJ2QZCykymr8LPwA', 'UCsNdeLwEZf86swPD3qJJ7Dw', 'UCPP3etACgdUWvizcES1dJ8Q', 'UCuzS3rPQAYqHcLWqOFuY0pw', 'UCGyZswzm4G-wEfRQHgMSAuw', 'UCiqE4DQsQ0zlwjOV04s2gEA', 'UCt9nYeSz90lnOnaVFjxFJzw', 'UCAW-NpUFkMyCNrvRSSGIvDQ', 'UCGIY_O-8vW4rfX98KlMkvRg', 'UCgRvm1yLFoaQKhmaTqXk9SA', 'UCCgLMMp4lv7fSD2sBz1Ai6Q', 'UCittVh8imKanO_5KohzDbpg', 'UC-lHJZR3Gqxm24_Vd_AJ5Yw', 'UClFSU9_bUb4Rc6OYfTt5SPw', 'UC-2Y8dQb0S6DtpxNgAKoJKA', 'UCpGdL9Sn3Q5YWUH2DVUW1Ug', 'UC_X03U7OQQZcdOVxtR9HcLA', 'UCl_Ksy6Yi1b4eEZ46FInb_w', 'UCC-uu-OqgYEx52KYQ-nJLRw', 'UCl-OodciBGZ0k8K8rBZGe4w', 'UCpwvZwUam-URkxB7g4USKpg', 'UCISgnSNwqQ2i8lhCun3KtQg', 'UCz_yk8mDSAnxJq0ar66L4sw', 'UC6VcWc1rAoWdBCM0JxrRQ3A', 'UCJekW1Vj5fCVEGdye_mBN6Q', 'UCxHoBXkY88Tb8z1Ssj6CWsQ', 'UCUI2t1rGG2bzhwBOS4pZAeQ', 'UCke6I9N4KfC968-yRcd5YRg', 'UC1NB1xUQ8ItM5VoA4101lUQ', 'UCq54nlcoX-0pLcN5RhxHyug', 'UCKIZCD7ljjbzaWSrDMT0QPw', 'UCoz3Kpu5lv-ALhR4h9bDvcw', 'UCKlhpmbHGxBE6uw9B_uLeqQ', 'UCJ2ZDzMRgSrxmwphstrm8Ww', 'UC_gE-kg7JvuwCNlbZ1-shlA', 'UCCp4IWg4A_JLexo30Jlf-UQ', 'UCYlh4lH762HvHt6mmiecyWQ', 'UCNAz5Ut1Swwg6h6ysBtWFog', 'UCAR3h_9fLV82N2FH4cE4RKw', 'UCPXTXMecYqnRKNdqdVOGSFg', 'UC25Ntv5IrTD-B0eZ92O50Tg', 'UCm3hAp1m1xlAz0ve_EKAo4g', 'UCQC1wGbOOIoC23fRGxt4kbg', 'UC9lSZSYpDDE18hoFA7YlBpw', 'UCaeO5vkdj5xOQHp4UmIN6dw', 'UCo_IB5145EVNcf8hw1Kku7w', 'UCx8Z14PpntdaxCt2hakbQLQ', 'UCqnbDFdCpuN8CMEg0VuEBqA', 'UCSaf-7p3J_N-02p7jHzm5tA', 'UChWtJey46brNr7qHQpN6KLQ', 'UC1yBKRuGpC1tSM73A0ZjYjQ', 'UC4f1zAG2BTkfOQV4_nFbpBQ', 'UCWVuy4NPohItH9-Gr7e8wqw', 'UC1ieoHqKW-yYgDhLHIcx28w', 'UChd1FPXykD4pust3ljzq6hQ', 'UCLCmJiSbIoa_ZFiBOBDf6ZA', 'UC69uYUqvx-vw4luuX7aHNLQ', 'UC8dnBi4WUErqYQHZ4PfsLTg', 'UC2wKfjlioOCLP4xQMOWNcgg', 'UCKYb5XBe-5OSEgLijLSoDtw', 'UCDCMjD1XIAsCZsYHNMGVcog', 'UCZaT_X_mc0BI-djXOlfhqWQ', 'UCvjqPU2VieP_BtYNtnrNatQ', 'UCKqH_9mk1waLgBiL2vT5b9g', 'UCEhsOgK2u8GDDoynMCj78Ng', 'UCvwgF_0NOZe2vN4Q3g1bY-A', 'UCLXo7UDZvByw2ixzpQCufnA', 'UCK7tptUDHh-RYDsdxO1-5QQ', 'UCDwujczvdxbbVHg-V4-kC-A', 'UCH-_hzb2ILSCo9ftVSnrCIQ', 'UCJ97pLhPp-CU9Tj4-dp9B6g', 'UC6ejCxeEjpMIjHRPD8o5prg', 'UCULkRHBdLC5ZcEQBaL0oYHQ', 'UCjFKMoAk3qhRkW4eOqNm6dw', 'UCIvaYmXn910QMdemBG3v1pQ', 'UCh715KhLM7vbOwozSXLWI_w', 'UCf8w5m0YsRa8MHQ5bwSGmbw', 'UCNvzD7Z-g64bPXxGzaQaa4g', 'UCa6Hg8HmooiDNaCT0_1NbQQ', 'UCqg2eLFNUu3QN3dttNeOWkw', 'UC1tnj_v8Sn-hWERFvqSjBWQ', 'UCYzPXprvl5Y-Sf0g4vX-m6g', 'UCEe076nFuVobN0bAsXK7ICw', 'UCj5i58mCkAREDqFWlhaQbOw', 'UCpqXJOEqGS-TCnazcHCo0rA', 'UCsvn_Po0SmunchJYOWpOxMg', 'UCh6O-aBKR-99dg4rPy69CXg')
                ) as "vm"
                   INNER JOIN youtube_comments yc on vm.video_id = yc.video_id
          group by yc.author
          having count(distinct category_e) >= 2),

a as (select UNNEST(channel_ids) as channel_id from filter_comment_authors_2cat),
-- get all possible combinations without repeat from array
all_comb as (select a.channel_id as ch1, b.channel_id as ch2, 1 as to_sum
from a cross join a as b
where a.channel_id < b.channel_id)

--all_comb as (
--    select
--        a.channel_id as ch1 , b.channel_id as ch2, 1 as to_sum
--    from a
--    join a as b on a.channel_id < b.channel_id
--)
select ch1, ch2, sum(to_sum) from all_comb group by ch1, ch2;
