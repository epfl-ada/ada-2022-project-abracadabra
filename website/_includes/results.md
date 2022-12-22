# Let's explore the results!

Our clustering method yields 15 clusters, let's explore them! The labels for
clusters in the following visualizations were picked by hand, based on the
results of our semantic analysis.

We first inspect the distribution of news outlets per cluster:

<img alt="Distribution of media per cluster" src="/assets/img/media_percluster.PNG" style="width:80%; display: block; margin: 0 auto">

Quotebank contains mostly english-speaking media, which is reflected. Now we inspect the distribution of quotes per cluster:

<img alt="Distribution of quotes per cluster" src="/assets/img/quotes_percluster.PNG" style="width:80%; display: block; margin: 0 auto">

An first important observation is that the number of quotes is not entirely correlated with the number of news outlets. For example, although the "Celebrities" cluster has the third most news outlets, it is only 6th for the number of quotes. Let's inspect the average number of quotes per outlet for each cluster instead:

<img alt="Average quotes/media per cluster" src="/assets/img/quotes_peroutlet.PNG" style="width:80%; display: block; margin: 0 auto">

Interestingly, the different communities do not cite people at the same rate.
Gaming news outlet cite the least amount of people. This could be explained by
the fact that the gaming scene is not personality based. In contrast, more
traditional outlets like those in the Indian, Australian, US and UK are
comparatively more likely to cite.
Let's have a look at our clusters!

{% include clusters.html caption="3D representation of clusters using PCA" %} 

> **Click on the cluster names to show information panel**.
> Drag to rotate the graph.

# Analysis

Before diving into individual clusters, here are some interesting observations to be made:

## Cluster separation
Quotebank contains mostly english quotes. One could expect english-speaking countries to be heavily represented and discussed. Indeed, we observe a nice geographic separation between our groupings. The biggest english-speaking countries (India, Canada, Australia, Ireland, UK) each have their own cluster. Regarding the United States, we even have a semblance of West/East coast separation as California and New York media have been grouped separately.

But clusters are not only separated geographically. We also notice cultural and sports groupings. This suggests that politics and news media have low overlap with news outlets discussing "leisure" topics. For example, we find clusters for video games, religion, celebrities, sports, etc... 

## Insight into the United States
As a majority of journals included in Quotebank are related to the United States, the groupings related to the country give insight into American culture. If we make the assumption that media covers the main areas of interest of the local population, we can deduce popular aspects of US life. Aside from politics, we observe that religion and celebrities are big interests of the US population. Furthermore, there is a large interest in sports; notably, American football, Basketball, Hockey, Golf, Baseball, and motorsports. 

We can also infer some of the nation's most famous individuals or best athletes by looking at the top speakers. For example, Tiger Woods is the most quoted speaker in the "Golf" group, with 2.11% of all quotes. This might indicate his strong reputation in the sport. 

Our clusters indicate that New York and California are important geographic locations of the country. Each have their dedicated cluster. This can be seen by looking at the top journals for the New York cluster (_gothamist.com_, _newyorkupstate.com_, _brooklyneagle.com_) and the top speakers for the California cluster (_Gavin Newsom_, _Eric Garcetti_, _Alex Villanueva_).

We see that Quotebank has given us a vast array of information about the life and politics in the United states. 

## Donald Trump
Amazingly, Donald Trump is a top quoted speaker in 10 of our 15 clusters. In the "religion" cluster, he is even the second most quoted individual, after Pope Francis himself! He has dominated political discussion in the United States for 2020 with around 7% of quotes attributed to him in our "US politics" grouping, with his presidential opponent Joe Biden trailing in second with less than 2% of quotes in comparison. 

In our local clusters, New York and California, he remains in the top 3 cited individuals with around 3% of quotes. Trump is also popular in the international media. He once again appears in the 10 most cited individuals in our journal groupings for Ireland (4th with ~2%), Australia (10th with ~1%), UK (3rd with ~1.5%), India (2nd with ~3%), and Canada (2nd with ~2.5%). 

This shows the wide influence of the former US president. His prevalence in clusters not even directly related to US Politics highlights the profound impact the figure had on the worldwide media landscape. 

## Health
For a number of groupings, health seems to be a recurring topic. Given the ongoing coronavirus pandemic, a large media interest on sanitary measures and health discussion can be observed. 

Many government health officials appear in the top speakers of their respective clusters. Some notable individuals include Tedros Adhanom Ghebreyesus (WHO Director-General), and Anthony Fauci (US Medical Advisor). Both are repeatedly cited in several groups.

One can also notice that both are highly cited in the "US Politics" cluster. This is linked to health being a major political subject in 2020, in the United States at least.

## Geography

As we have seen above, location is the most prevalent defining attribute of our communities. Indeed, even though news has largely moved online today, it is natural that the stories outlets cover remained local.

We found it interesting to plot the locations of our journals on a world map. The visualization below lets you explore how communities are distributed around the globe. For news outlets without a precise location, we use the center of its country of origin.

Using this interactive map, we notice that naming the clusters according to location was indeed a good choice. Clusters named after a location have most of their news outlets in the given location.

What about clusters not named after a location? _Video Games_ and _Celebrities_ are still mainly located in the US and the UK. This is probably because most english-speaking news outlets come from these countries.
