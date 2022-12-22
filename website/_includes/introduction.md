# Introduction

News sources today are diverse: newspapers, radio stations, websites and more.
They are also widely accessible. The internet has allowed us to collect news
from all around the world, covering practically any topic. From anywhere, we
can read Russian sports news and hear about the latest celebrity gossip from
Argentina.

The goal of this project is to organize these news outlets into communities.
We want to answer the following questions:

- Can we find a meaningful way to group news outlets?
- Once found, is there a way to find which attributes characterize these groups?
- Do some attributes strongly predict how groups are formed?
- Can we visually convey the identity of such groups?

# The main idea

What do newspapers that cover the same topics share ? It seems reasonable that
similar newspapers would cite the same people. For example, two science
magazines will likely cite authors of the latest research. US political news
will cite politicians.

Our hypothesis is that two journals that cite the same people are very likely
to be similar. For example, they might discuss the same topic or be located in
the same geographical area. This will form the basis of our analysis.

# How did we do it?

We used the 2020 [Quotebank dataset](https://zenodo.org/record/4277311), which
contains a list of quotes. Each quote is associated with its likely speaker and
the news outlet in which the quote appeared. Additional data about the speakers
and the news outlets was extracted from the [Wikidata
platform](https://www.wikidata.org/wiki/Wikidata:Main_Page). 

As a first step, we used Quotebank to link news outlets to the people they
cite. Using the data it provided, we were able to create news communities. With
our method, news outlets are grouped by the authors of quotes. If two news
outlets cite the same person many times, they are more likely to end up in the
same group.

## A technical parenthesis

A good starting point is to look at the distribution of the data we are going to use. In our case, 
the distribution of the number quotes per journal and of the number of different people cited per journal.

![Log-log plot of the distribution of speakers and quotes](/assets/img/journal_distr.png)

The figure shows that the distributions are heavy tailed. We find heavy tailed distributions in many real world phenomenons, 
for examples the distribution of city sizes, of people friends in a network or the distribution of word counts in a text. As our data share a similar distribution with these phenomenons, it is also likely to share other properties with them. For instance, 
we know that the way we mesure similarity works especially well with text and that real networks have tendency to form local clusters. It is a hint we are in the good direction.

