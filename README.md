# Representative Tweets

## Description
A Twiter hot tweets viewer to show at most 10 "representative tweets" selected from the tweets of a twitter user.  
There are two types of "representativeness": (1) the author's definition -- the number of like; and (2) Twitter's popularity.

## Installation
`npm install`

`npm start`

## Implementation
[Since Twitter is running OAuth](https://dev.twitter.com/oauth/overview/introduction), I need a server to fetch tweets and I deploy my server on AAWS EC2

As for the server setup, I use node.js and express web framework.  In order to deal with Twitter's Oauth and pull data from Twitter, [Twitter Libraries](https://dev.twitter.com/resources/twitter-libraries) can help us a lot, and I go with [TwitterJSClient](https://github.com/BoyCook/TwitterJSClient) by @BoyCook to help me.  

## Architecture 
![alt](https://github.com/drjkuo/JujiOA/blob/master/apiv2.png)

![alt](https://github.com/drjkuo/JujiOA/blob/master/apiv1.png)
When an user visit the website 


<img src="https://github.com/drjkuo/JujiOA/blob/master/fileStructure.png" height="480" width="283" >

[Twitter's popularity](https://dev.twitter.com/rest/reference/get/search/tweets)


In this project, I provided two kinds of twitter user's "representative tweets".

On this website http://54.202.23.65:3000/v2, I pull




You will be developing a working website that allows your users to see a twitter user's "representative tweets". At most 10 "representative tweets" must be selected from the tweets of a twitter user. You are free to devise your own implementation of "representativeness", as long as you can articulate your justification.


On your site, when a user enters a person's twitter handle, your user expects to see her/his representative tweets,  as well as the evidence of their representativeness.  

Timeline
Block diagram
Apiv1
Apiv2
Gulp
Unit test, mocha, chai



Feel free to improve the user experience in whatever ways you feel necessary given the time you have.



Your submission includes 
a link to the working Web site, 
http://54.202.23.65:3000/v2
http://54.202.23.65:3000/


a link (or attachment) to the source code, and 
https://github.com/drjkuo/JujiOA

a link (or attachment) to a document 
where you outline and justify your choices in design and implementation. 
You are free to use whatever tools, resources and libraries that you have a right to use.


Timeline
Block diagram
Apiv1
Apiv2
Gulp
Unit test, mocha, chai
