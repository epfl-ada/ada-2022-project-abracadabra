﻿# Links between gaming channels and political affiliation

*In this project, we want to determine if there are any links between certain gaming channels and political affiliation. To do this, we will categorize political youtubers on a left to right axis, then look if there is any significant crossover in comment users with gaming channels.*
 
 ## Research Questions
 - Is there any viewer crossover between political and gaming videos ?
 - Can we determine where political Youtubers fall on a left to right political axis ?
 
 If it is the case, then : 
 - What gaming Youtubers are related to which side of the political map ?
 - Is the crossover based more on the individual channels, or is there a more general political divide in gaming content ?
 
 If we have time : 
 - What about sports channels, or beauty vloggers ?
 - How much do political channels grow during big political events ? Do they also correspond to the growth of a related gaming channel ?
 
 ## Datasets
 We will be using the Youniverse dataset. We downloaded the all of the data on a *postgres* database, which is stored on a hard drive (327GB). We stored all indices on a separate SSD (215GB). We did this because we don't have enough space on our personal computers, but we want to be able to use as musch of the data as we see fit. This also greatly speeds up our computations, as we can get queries directly from the database, using multiple cores, instead of using pandas.
 
 We might want to use a dataset containing a timeline of political events between 2005 and 2019, to try and relate political interest to particular events (such as the american presidential elections).
 
 ## Methods
For the remaining of the project, we will assume that a video's comments users represents that video's viewer base. This is not necessarily the case, but as we only have access to the comments database, we will make this approximation.
 
 ## Proposed timeline
 
 
 ## Organization within the team
 Everyone will touch all parts of the project, but here are our main tasks :
 - Adrien : Database management, loading data
 - Alexander : 
 - Changling : 
 - Ewan : 
 
 ## Questions for TAs
