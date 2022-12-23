<!-- Intro Section -->
<section id="intro">
    <div class="container">
        <div class="row">
            <div class="col-lg-12 text-center">
                <h2 class="section-heading">Introduction</h2>
            </div>
        </div>
        <p>
            Youtube is a website with a diverse set of creators and viewers. However, similarly to the real world, 
            one would assume that similar people have similar interests and thus interact with the same type of media. 
            This should particularly be the case for political and news outlets, as the topics they discuss tend to be 
            particularly divisive.
            Our hypothesis is that this behaviour extends to interests that are seemingly unaffiliated to politics. 
            Specifically, we want to see if the viewerbase of gaming content creators are related in any way to that 
            of news and political Youtubers. If this is the case, we could then classify gaming communities on a 
            political spectrum, and it could give us insights on the radicalization pipelines that we know already
            exist on Youtube.
        </p>
        &nbsp;
        
        <h4 class="section-heading">Important assumptions</h4>
        
        <p>
            As our dataset doesn't contain any information about viewers, we assume that the commenter-base of a 
            video is statistically representative of its viewerbase. This is clearly not the case, because people 
            who watch every video from a certain content creator would probably have more of a tendency to write 
            comments on their videos, but this assumption needs to be done to get any kind of analysis done.

            Furthermore, the comments dataset does not contain any information on the comment's text. So we also 
            need to assume that all comments enjoyed or are in agreement with the video. Again, this is a questionable
            assumption, as hate comments are a notoriously common experience for any Youtuber.
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

Surprisingly, we find that 5 of the channels do not share commenters with any of the other channels. We did not expect this, as these are some of the most popular channels on YouTube. We thought that any of them would have a common commenter with at least one of the others. 

Let's look at theses disconnected channels :

<figure>
    <img alt="Disconnected channels" src="/img/disconnected_channels.PNG" style="width:60%; display: block; margin: 0 auto">
    <div align="center" >Fig. 2 - Disconnected channels</div>
</figure>


Weird, these seem like popular channels, there should at least be some crossover in viewership with some of the other channels. Have we discovered a subscriber-bot scandal ?

No, after searching for these channels on YouTube, we have simple explanations for 4 of these 5 channels :

- Mastersaint, Jonni Valentayn and ABC News (Australia) simply have their comments turned off
- SOMOY TV is a Bangladeshi television broadcast. This means that their viewers simply might not speak English.

British Pathé is more difficult to explain. This channel publishes archives from 1910 to 1984.  Their videos are in English and consistently get comments. Because the subject matter is quite niche, there might just not be any natural crossover in commenters as none of the other channels work with this type of content.

<!--On a réussi à mettre un cluster, mtn je te laisse décider où le placer dans la data story-->
<p align="center">
    <iframe style="width:80%;height:700px;" src="https://alpopesc.github.io/ADA_graph_1_2_cluster/" title="bibi"></iframe>
</p>
<p align="center">
    Caption : Cluster machin truc much
</p>

</section>

<!--Conclusion section-->

<section id="conclusion">
<div class="col-lg-12 text-center">
    <h2 class="section-heading">Conclusion</h2>
</div>

<!-- Ecrire ici-->

</section>