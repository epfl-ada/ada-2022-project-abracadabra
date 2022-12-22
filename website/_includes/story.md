# Analysis

## Trying to find similar channels

Our first intuition was to take the aforementioned gaming and political channels and trying to find groups of YouTubers with similar commenters, regardless of the channel type. By doing this, if we found clusters containing both news/politics and gaming channels, we might have already found what we were looking for, as it would mean that some gaming YouTubers shared more viewers with some news or politics channels than to other gaming creators.

To do this, we looked at every commenter who left a comment on videos created by at least two of these channels. We then created a 400 by 400 matrix called the similarity matrix (depicted below). Each element of this matrix represents the number of commenters that left a comment on both channels. For example, the first row and column of the matrix represents PlayStation's shared commenters with every other channel. PewDiePie is represented by the fourth row and column, so if we look at the fourth element of the first row (or the first element of the first column), we will find how many people commented on both channels.

----------------- SIMILARITY MATRIX IMG -----------------------------------