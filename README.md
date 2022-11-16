# An analysis of Youtube viewership to find links between preferred gaming content and political affiliation

*In this project, we want to determine if there are any links between certain types of gaming channels and political preferences. To do this, we will categorize news and politics youtubers on a left to right axis, then look if gaming channels have any significant crossover in viewership. We will then group similar gaming channels and look if they share viewership with the same political channels.*
 
 ## Research Questions
 - Is there any viewer crossover between political and gaming videos ?
 - Can we determine where news/politics channels fall on a left to right political axis ?
 - Do viewers always watch channels on the same political side ?
 
 If it is the case, then : 
 - What type of gaming content is related to which side of the political map ?
 - Is the crossover based more on the individual channels, or is there a more general political divide in gaming content ?
 
 If we have time : 
 - What about sports channels, or beauty vloggers ?
 - If a gaming channel grows, do the news/political channels who share viewership also benefit from it ? And vice-versa ?
 - How many people change their political opinions ? Does it stem from different gaming viewing habits ? Is it linked to particular political events ?
 
 ## Proposed additional datasets
 *List the additional dataset(s) you want to use (if any), and some ideas on how you expect to get, manage, process, and enrich it/them. Show us that you’ve read the docs and some examples, and that you have a clear idea on what to expect. Discuss data size and format if relevant. It is your responsibility to check that what you propose is feasible.*
 
 We will be using the Youniverse dataset. We downloaded the all of the data on a *postgres* database, which is stored on a hard drive (327GB). We stored all indices on a separate SSD (215GB). We did this because we don't have enough space on our personal computers, but we want to be able to use as musch of the data as we see fit. This also greatly speeds up our computations, as we can get queries directly from the database, using multiple cores, instead of using pandas.
 
 We might want to use a dataset containing a timeline of political events between 2005 and 2019, to try and relate political interest to particular events (such as the american presidential elections). But this will only happen if we have achieved our primary goal.
 
 ## Methods
For the remaining of the project, we will assume that a video's comments users represents that video's viewer base. This is not necessarily the case, but as we only have access to the comments dataset, we will make this approximation.

To classify the news/politics channels, we might use **spectral clustering** to cluster similar channels together using shared news/political viewerbase as links. If this doesn't work, we might look into finding lists of channels that are already put on a political map, from the internet, and use that subset of channels for our analysis.

**Spectral clustering** can also be used to find gaming communities and even find gaming channels that are close to news/political channels.

 
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
 Everyone will work on all parts of the project, but here are our main tasks :
 - Adrien : Database management, loading data
 - Alexander : Graphs, visualizations
 - Changling : Clustering algorithms, parameter tuning
 - Ewan : Clustering algorithms, parameter tuning
 
 ## Questions for TAs
- Do you have a good tools/methods for us to politically classify the news/politics channels ?
