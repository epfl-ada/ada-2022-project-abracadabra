<!-- Intro Section -->

<section id="intro">
    <div class="container">
        <div class="row">
            <div class="col-lg-12 text-center">
                <h2 class="section-heading">Introduction</h2>
            </div>
        </div>
        <p>
            Do gaming YouTubers have a political lean? To answer this question, we analysed the shared viewerbase between gaming and news/politics YouTube channels to see if there is a link between the two. By doing this, we can gain insight into the political leanings of gaming YouTubers and then see if specific games attract certain types of political opinions.

Because gaming creators are often watched by younger audiences, it is important to consider if they have any political leanings, as they can have a large influence on their viewers. If we were to find any link, this project would be important in order to inform viewers on potential bias in the content they are consuming.
        </p>
        &nbsp;


        <h4 class="section-heading">Important assumptions</h4>
        
        <p>
            As our dataset doesn't contain any information about viewers, we assume that the commenter-base of a video is statistically representative of its viewerbase. This is clearly not the case, because people who watch every video from a certain content creator would probably have more of a tendency to write comments on their videos, but this assumption needs to be done to get any kind of analysis done.
    
    Furthermore, the comments dataset does not contain any information on the comment's text. So we also need to assume that all comments enjoyed or are in agreement with the video. Again, this is a questionable assumption, as hate comments are a notoriously common experience for any Youtuber.
    
    Because the dataset is very big, we only considered the comments from the top 200 most subscribed gaming channels as well as the top 200 news/politics channels.
        </p>
    
    </div>
</section>

<!-- Analysis Section -->
<section id="analysis">
<div class="col-lg-12 text-center">
    <h2 class="section-heading">Analysis</h2>
</div>


<h4 class="section-heading">Trying to find similar channels</h4>


Our first intuition was to take the aforementioned gaming and political channels and trying to find groups of YouTubers with similar commenters, regardless of the channel type. By doing this, if we found clusters containing both news/politics and gaming channels, we might have already found what we were looking for, as it would mean that some gaming YouTubers shared more viewers with some news or politics channels than to other gaming creators.

To do this, we looked at every commenter who left a comment on videos created by at least two of these channels. We then created a 400 by 400 matrix called the similarity matrix (depicted below). Each element of this matrix represents the number of commenters that left a comment on both channels. For example, the first row and column of the matrix represents PlayStation's shared commenters with every other channel. PewDiePie is represented by the fourth row and column, so if we look at the fourth element of the first row (or the first element of the first column), we will find how many people commented on both channels.

<figure>
    <img alt="Similarity matrix" src="/img/mat_400_sim_matrix.PNG" style="width:60%; display: block; margin: 0 auto">
    <div align="center" >Fig. 1 - Similarity matrix</div>
</figure>
To get a more meaningful measure of similarity, we divided the number of common commenters by the average number of comments left on both channels. This normalization is important as it gives a proportion of shared commenters instead of just a number. This takes takes care of problems having to do with the biggest channel dominating our measures.

The normalized similarity matrix is thus given below :

<figure>
    <img alt="Normalized Similarity Matrix" src="/img/norm_sim_mat_400.PNG" style="width:60%; display: block; margin: 0 auto">
    <div align="center" >Fig. 2 - Normalized Similarity Matrix</div>
</figure>

As we can see, the matrix isn't dominated by particular channels, as we can see that specific connections between channels pop out.

Surprisingly, we find that 5 of the channels do not share commenters with any of the other channels. We did not expect this, as these are some of the most popular channels on YouTube. We thought that any of them would have a common commenter with at least one of the others. 

Let's look at theses disconnected channels :

<figure>
    <img alt="Disconnected channels" src="/img/disconnected_channels.PNG" style="width:60%; display: block; margin: 0 auto">
    <div align="center" >Fig. 3 - Disconnected channels</div>
</figure>



Weird, these seem like popular channels, there should at least be some crossover in viewership with some of the other channels. Have we discovered a subscriber-bot scandal ?

No, after searching for these channels on YouTube, we have simple explanations for 4 of these 5 channels :

- Mastersaint, Jonni Valentayn and ABC News (Australia) simply have their comments turned off
- SOMOY TV is a Bangladeshi television broadcast. This means that their viewers simply might not speak English.

British Pathé is more difficult to explain. This channel publishes archives from 1910 to 1984.  Their videos are in English and consistently get comments. Because the subject matter is quite niche, there might just not be any natural crossover in commenters as none of the other channels work with this type of content.

## Visualizing the clusters

Using the above normalized similarity matrix, we ran a spectral clustering algorithm which gave us 2 groups of channels. We then made a force-based connection network to visualize our channels, using the similarity between two channels as the weight of their common edge. Finally, we colored the nodes based on the clusters computed by our algorithm.

As you can see below, the network makes two clear groups, which mostly correspond to the computed clusters.

<!--On a réussi à mettre un cluster, mtn je te laisse décider où le placer dans la data story-->

<p align="center">
    <iframe style="width:80%;height:700px;" src="https://alpopesc.github.io/ADA_graph_1_2_cluster/" title="bibi"></iframe>
</p>
<p align="center">
    Cluster visualisation
</p>

At first, we thought it separated the channels into gaming and news/politics content, as most nodes in the left cluster are news channels, and most of the others are gaming.

However, there is a much better explanation for the way these groups formed.

## Oh yeah, countries exist

If you look at the actual channels that are in the left cluster, all of them are news channels from India and Pakistan. Obviously, people will tend to watch news that is the most relevant to them.

We thought this type of problem wouldn't arise as our dataset should only contain English speaking YouTubers. Unfortunately for us, a lot of popular news channels are either bilingual, or are just misclassified.

What tripped us at first was that the clusters look a lot like the gaming and news/politics divide. This is actually just because there are a lot more gaming channels than news channels, and they are for the most part English speaking. For the news channels, there tends to be only a few per country and their number tends to grow with the size of the population. This means that the top 200 most subscribed news/politics channels is dominated by countries with a lot of people, such as India and Pakistan.

Because we still want to find out if gaming YouTubers have a political lean, and that most of the top 200 speak English, we need to filter these non-English channels out. We did not find any good way of doing this before the clustering, as some videos have English titles and descriptions, but speak in another language. Therefore we decided to use our clusters to filter them out, and restart the process with only the right cluster. We also make sure to filter out the disconnected channels.

## Recursive clustering

Once these channels were filtered out, we recomputed a new normalised similarity matrix and separated the channels into two clusters. Again, we found one big cluster of English-speaking channels and one cluster with just 3 Kenyan news channels.

<figure>
    <img alt="Kenyan news channels cluster" src="/img/kenyan_cluster.PNG" style="width:60%; display: block; margin: 0 auto">
    <div align="center" >Fig. 4 - Kenyan news channels cluster</div>
</figure>

At this point, we were quite annoyed, as we thought we might have to go through every country, but as long as we continued recursively clustering and filtering out non-English channels, we would eventually find what we were looking for.

To speed up the process, we decided to make 4 clusters instead of two, so we could filter out more groups at a time. Luckily, this corresponded to exactly how much was left to filter out. 

We were left with 2 clusters, here are their statistics :

<figure>
    <img alt="Cluster statistics" src="/img/stats_gaming_politics_clusters.PNG" style="width:60%; display: block; margin: 0 auto">
    <div align="center" >Fig. 5 - Cluster statistics</div>
</figure>

As we can see, one cluster is clearly has more news/politics channels, and the other corresponds to gaming YouTubers. This means that overall, people that comment on news/politics videos tend not to comment as much on gaming videos and vice-versa.

## Classifying the news/politics channels



</section>

<!--Conclusion section-->

<section id="conclusion">
<div class="col-lg-12 text-center">
    <h2 class="section-heading">Conclusion</h2>
</div>

<!-- Ecrire ici-->

</section>