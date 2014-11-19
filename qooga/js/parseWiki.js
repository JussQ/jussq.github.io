(function($) {
    'use strict';
    $.parseWiki = function(element, optinos) {
        var defaults = {

        };

        var plugin = this;

        plugin.settings = this;

        var $element = $(element),
            element = element;

        plugin.init = function() {
            console.log("plugin ParseWiki is init");
            plugin.getData();
        };

        plugin.getData = function() {
            $.ajax({
                url: 'http://ru.wikipedia.org/w/api.php?action=parse&format=json&page=Dragon_Age:_Inquisition&callback=?',
                contentType: "application/json; charset=utf-8",
                dataType: 'json',
                method: 'get',
                success: function(data) {

                    var text = data.parse.text['*'];
                    text = $("<div></div>").html(text);

                    text.find("sup").remove();

                    $("#content").html(text);
                    
                    
                    var genre = text.find("a[title='Классификация компьютерных игр']").parent().parent().next().find("a").html();
                    $("#genre").append(genre);
                    console.log(genre);
                    //*[@id="content"]/div/table[2]/tbody/tr[9]/td[1]/b/a
                    //*[@id="content"]/div/table[2]/tbody/tr[9]/td[2]/div/a

                    var title = data.parse.title;
                    $("#title").append(title);
                    
                    // details for game
                    /* 
                     * Developers
                     * publisher
                     * part of a series
                     * Date of announcement
                     * release date
                     * genre
                     * platform
                     * The game engine
                     * game Mode
                     */
                    
                    var developers,
                        publisher,
                        partSeries,
                        dateAnnouncement,
                        releaseDate,
                        genre,
                        platform,
                        gameEngine,
                        gameMode;
                    var template = '';
                    
                    template = '<table><tr colspan="2"><td><h2>Детали игры</h2></td></tr>';
                    
                    developers = text.find("b:contains('Разработчики')").parent().next().find("div > a").text();
                    console.log(developers);
                    
                    publisher = text.find("b:contains('Издатель')").parent().next().find("div > a").text();
                    console.log(publisher);
                    
                    partSeries = text.find("b:contains('Часть серии')").parent().next().find("div > i > a").text();
                    console.log(partSeries);
                    
                    dateAnnouncement = text.find("b:contains('Дата анонса')").parent().next().find("div").text();
                    console.log(dateAnnouncement);
                    
                    var dates = {};
                    text.find("b:contains('Даты выпуска')").parent().next().find("span").each(function(){
                        dates = {
                            "1": "asdasd",
                            "2": "sadsd"
                        };
                        console.log(dates);
                        console.log($(this).next().text());
                    });
                    console.log(text.find("b:contains('Даты выпуска')").parent().next().text());
                    
                    template = '</table>';

                    console.log(data);
                },
                error: function(errorMessage) {

                }
            });
        };
        plugin.init();
    };

    $.fn.parseWiki = function(options) {
        return this.each(function() {
            if(undefined === $(this).data('parseWiki')) {
                var plugin = new $.parseWiki(this, options);
                $(this).data('parseWiki', plugin);
            }
        });
    };
    $('body')
        .parseWiki({});
})(jQuery);