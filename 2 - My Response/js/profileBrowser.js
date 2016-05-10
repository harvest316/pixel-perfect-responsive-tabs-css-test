/*
profileBrowser.js
Loads the text from data.js and populates easyResponsiveTabs.

By Paul Harvey
26/09/2013
*/

$(document).ready(function () {
    try {
        // Clean Bio Text
        for (var i = 0; i < data.length; i++) {
            data[i].bio = cleanText(data[i].bio);
        }

        // Load Data
        var template = $('#template'),
            tabsDiv = $('#verticalTab');
        var html = parseTemplate(template.html(), {data: data.sort(sortByName)});
        tabsDiv.append(html);
        template.remove();

        // Add Interactivity
        tabsDiv.easyResponsiveTabs({
            type: 'vertical',
            width: 'auto',
            fit: true
        });
    } catch (err) {
        console.log(err.message);
    }

    function sortByName(a, b){
        try {
            var aName = (a.firstName + a.lastName).toLowerCase();
            var bName = (b.firstName + b.lastName).toLowerCase();
            return ((aName < bName) ? -1 : ((aName > bName) ? 1 : 0));
        } catch (err) {
            console.log(err.message);
        }
    }

    function cleanText(input) {
        // Removes unwanted characters from a string, to prepare it for display
        try {
            var output = jQuery('<p>' + input + '</p>').text(); // remove HTML
            output = output.replace(/\n/g, '<br/>'); // replace new lines
            output = output.replace('\uFFFD',''); // remove junk unicode
            //console.log(output);
            return output;
        } catch (err) {
            console.log(err.message);
        }
    }
});
