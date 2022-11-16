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
