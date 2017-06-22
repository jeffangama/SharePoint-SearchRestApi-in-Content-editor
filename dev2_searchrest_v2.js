//http://sp:81/sites/o8/_api/search/query?querytext='(contentclass:STS_Web)'&rowlimit=500&selectproperties=%27Url,Title%27
//Technical design 
//Description : Get the list of sites for the current user using the search API. Any community site is excluded from the list.
//TO DO : Exclude communities
//DONE : List url that the user has access to
// /*jslint browser:true, devel: true*/
/*global jQuery*/
var siteCollectionTypeToIgnore = "Community";
var tabListOfSites = [];

$(document).ready(function () {

    GetListOfSitesForCurrentUser().then(
        function () {
            RenderData();
        }
    );

    //    iterateEveryItemFromSiteCollectionList();
});

function RenderData() {
    var sortedListOfSites = sortAtoZArrayObject(tabListOfSites);
    sortedListOfSites.forEach(function (websiteItem) {
        if (websiteItem.Title != "") {
            $('#one').append('<a href=\'' + websiteItem.Url + '\'>' + capitalizeFirstLetter(websiteItem.Title) + '</a><br/>');
        }
    }, this);
}

function GetListOfSitesForCurrentUser() {
    var url = _spPageContextInfo.webAbsoluteUrl + "/_api/search/query?querytext='" + "(contentclass:STS_Web)" + "'&rowlimit=" + 500 + "&selectproperties=%27Url,Title%27";
    console.log(url);
    return executeJson(url).then(
        function (data) {
            //console.log(data);
            var queryResults = data.d.query.PrimaryQueryResult.RelevantResults.Table.Rows.results;
            if (queryResults.length > 0) {
                //console.log(queryResults);
                for (var i = 0; i < queryResults.length; i++) {
                    var r = queryResults[i];
                    var cells = r.Cells;

                    var title = 'undefined';
                    var url = 'undefined';

                    for (var x = 0; x < cells.results.length; x++) {
                        var c = cells.results[x];
                        switch (c.Key) {
                            case "Url":
                                url = c.Value;
                                //console.log(url);
                                break;
                            case "Title":
                                title = c.Value;
                                //console.log(title);
                                break;
                        }

                        if (title != "undefined" && url != "undefined") {
                            var itemWeb = {
                                "Title": title,
                                "Url": url
                            }

                            tabListOfSites.push(itemWeb);
                            break;
                        }
                    }
                }
            }
            console.log(tabListOfSites);
        });
}

function sortAtoZArrayObject(arrayToSort) {
    return arrayToSort.sort(function (a, b) {
        var textA = a.Title.toUpperCase();
        var textB = b.Title.toUpperCase();
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    });
};

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function executeJson(url, method, headers, payload) {
    method = method || 'GET';
    headers = headers || {};
    headers["Accept"] = "application/json;odata=verbose";
    headers["X-FORMS_BASED_AUTH_ACCEPTED"] = "f";
    if (method == "POST") {
        headers["X-RequestDigest"] = $("#__REQUESTDIGEST").val();
    }
    var ajaxOptions = {
        url: url,
        type: method,
        contentType: "application/json;odata=verbose",
        headers: headers
    };
    if (typeof payload != 'undefined') {
        ajaxOptions.data = JSON.stringify(payload);
    }
    return $.ajax(ajaxOptions);
}
