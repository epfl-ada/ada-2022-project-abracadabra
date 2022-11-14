Copy (with filter_comment_authors_2cat as (SELECT yc.author
FROM (select title, video_id, category_e
      from video_metadata where category_e in ('News & Politics', 'Gaming')
) as "vm"
INNER JOIN youtube_comments yc on vm.video_id = yc.video_id
group by yc.author
having count(distinct category_e) = 2),

author_vid_id as (select yc.author, yc.video_id from youtube_comments yc inner join filter_comment_authors_2cat
    on yc.author = filter_comment_authors_2cat.author)

select vm.video_id, vm.category_e, author_vid_id.author, vm.title from video_metadata vm
    inner join author_vid_id on author_vid_id.video_id = vm.video_id
    where category_e in ('News & Politics', 'Gaming')) To '/mnt/slow-disk/output/adrien/comments_gaming_politics.csv' With CSV DELIMITER ',' HEADER;


Copy (select vm.video_id, vm2.video_id as id_in_desc, vm2.channel_id as channel_in_desc
from video_metadata vm join
     video_metadata vm2 on
     vm.description LIKE '%' || vm2.video_id || '%' OR
         vm.description LIKE '%' || vm2.channel_id || '%') To '/mnt/slow-disk/output/adrien/videos_rel.csv' With CSV DELIMITER ',' HEADER;
