# An analysis of Youtube viewership to find links between preferred gaming content and political affiliation
 
Please find our data story on the suject [here](https://teal-pixie-cb7687.netlify.app/)

*In this project, we want to find communities in Youtube's gaming viewership, and look towards what side of the political spectrum each community tends to lean. By doing this, we may be able to determine if certain games attract more right/left wing viewers, and see if people's interests are linked to their political preferences. To do this, we will first classify news and political channels on a left-to-right political axis, then look at their shared viewership with gaming channels. We will then look if the viewers tend to watch news/political videos which have similar political ideas to determine if we can classify viewer's political preferences. We then cluster communities in the gaming space and see if their shared viewers have the same political leanings.*
 
 ## Research Questions
 - Is there any viewer crossover between political and gaming videos ? How much ?
 - Can we determine where news/politics channels fall on a left-to-right political axis ?
 - Do viewers always watch news/politics channels on the same political side ?
 
 If it is the case, then : 
 - What gaming channels have right/left wing viewers ?
 - What type of gaming content is related to which side of the political map ?
 - Is the crossover based more on the individual channels, or is there communities around games who have a political preference ?
 
 If we have time : 
 - What about sports channels, or beauty vloggers ?
 - If a gaming channel grows, do the news/political channels who share viewership also benefit from it ? And vice-versa ?
 - How many people change their political opinions ? Does it stem from different gaming viewing habits ? Is it linked to particular political events ?
 
 ## Proposed additional datasets
 We will be using the Youniverse dataset. We downloaded the all of the data on a *postgres* database, which is stored on a hard drive (327GB). We stored all indices on a separate SSD (215GB). We did this because we don't have enough space on our personal computers, but we want to be able to use as musch of the data as we see fit. This also greatly speeds up our computations, as we can get queries directly from the database, using multiple cores, instead of using pandas.
 
 If we can't find a way to classify the news/politics channels politically, we may have to look into datasets that do the job for us.
 
 If we have time, we might want to use a dataset containing a timeline of political events between 2005 and 2019, to try and relate political interest to particular events (such as the american presidential elections). But this will only happen if we have achieved our primary goal.
 
 ## Methods
For the remaininder of the project, we will assume that a video's comments users represents that video's viewer base. This is not necessarily the case, but as we only have access to the comments dataset, we will make this approximation.

To classify the news/politics channels, we might use **spectral clustering** to cluster similar channels together using shared viewerbase as edges. If this doesn't work, we might look into finding lists of channels that are already put on a political map, from the internet, and use that subset of channels for our analysis.
**Spectral clustering** can also be used to find gaming communities.

 
 ## Proposed timeline
 - Check how many links video descriptions we can find (channels linking other channels). This is limited by the fact the descriptions are truncated.
 - Classify the News & Pol. channels into political affiliation (spectrum or binary)
 - At the same time, find which gaming and political channels have shared viewerbase
 - Check if viewers always always watch channels on the same political side
 - Classify viewers into political affiliation based on what political channels they watch
 - Check if there is any significant correlation between what gaming and political YouTubers viewers watch
 - If yes, classify gaming channels into clusters to find communities (probably based on what game is played)
 - Check correlation between political channels and those communities
 
 ## Organization within the team
 Everyone will work on all parts of the above milestones, but here are our main tasks :
 - Adrien : Database management, loading data
 - Alexander : Queries, network visualisations
 - Changling : Website, explanations, team management
 - Ewan : Analysis, algorithms