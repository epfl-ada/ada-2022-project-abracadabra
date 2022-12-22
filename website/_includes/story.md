# Analysis

## Trying to find similar channels

Our first intuition was to take the aforementioned gaming and political channels and trying to find groups of YouTubers with similar commenters, regardless of the channel type. By doing this, if we found clusters containing both news/politics and gaming channels, we might have already found what we were looking for, as it would mean that some gaming YouTubers shared more viewers with some news or politics channels than to other gaming creators.

To do this, we looked at every commenter who left a comment on videos created by at least two of these channels. We then created a 400 by 400 matrix called the similarity matrix (depicted below). Each element of this matrix represents the number of commenters that left a comment on both channels. For example, the first row and column of the matrix represents PlayStation's shared commenters with every other channel. PewDiePie is represented by the fourth row and column, so if we look at the fourth element of the first row (or the first element of the first column), we will find how many people commented on both channels.

----------------- SIMILARITY MATRIX IMG -----------------------------------

Surprisingly, we find that 5 of the channels do not share commenters with any of the other channels. We did not expect this, as these are some of the most popular channels on YouTube. We thought that any of them would have a common commenter with at least one of the others. 

Let's look at theses disconnected channels :

--------------- DISONNECTED CHANNELS IMG ----------------------------

Weird, these seem like popular channels, there should at least be some crossover in viewership with some of the other channels. Have we discovered a subscriber bot scandal ?

No, after searching for these channels on YouTube, we have explanations for 4 of these 5 channels :

- Mastersaint, Jonni Valentayn and ABC News (Australia) simply have their comments turned off
- SOMOY TV is a Bangladeshi television broadcast. This means that their viewers might simply not speak English.

The only channel we can't quite explain why it is disconnected is British Pathé. This channel publishes archives from 1910 to 1984.  Their videos are in English and consistently get comments. Because the subject matter is quite niche, there might just not be any natural crossover in commenters.