### List down a list of sites that the user has access to in a content editor webpart
Search operations using Search rest endpoint

//http://sp:81/sites/o8/_api/search/query?querytext='(contentclass:STS_Web)'&rowlimit=500&selectproperties=%27Url,Title%27

### Technical design 

//Description : Get the list of sites for the current user using the search API. Any community site is excluded from the list.
//DONE : List url that the user has access to

### Installation

Create a page > Add content editor webpart > In the content editor webpart properties set https://sp:81/sites/o8/style library/htmlContent.html value > save the Page

Upload the two files shared here (HTML and JS) inside the style library

### Result

It shows the list of sites you have access to

### Product

Tested on SharePoint SP1 CU January 2017

### Read more

Pnp SP Addin : https://github.com/OfficeDev/SharePoint-Add-in-REST-SearchAPIs/search?utf8=%E2%9C%93&q=executeQuery&type=
