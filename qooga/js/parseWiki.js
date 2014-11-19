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
                    
                    template += '<table><tr><td><h2>Детали игры</h2></td></tr>';
                    
                    developers = text.find("b:contains('Разработчики')").parent().next().find("div > a").text();
                    template += '<tr><td>Разработчики</td><td>' + developers + '</td></tr>';
                    console.log(developers);
                    
                    publisher = text.find("b:contains('Издатель')").parent().next().find("div > a").text();
                    template += '<tr><td>Издатель</td><td>' + publisher + '</td></tr>';
                    console.log(publisher);
                    
                    partSeries = text.find("b:contains('Часть серии')").parent().next().find("div > i > a").text();
                    template += '<tr><td>Часть серии</td><td>' + partSeries + '</td></tr>';
                    console.log(partSeries);
                    
                    dateAnnouncement = text.find("b:contains('Дата анонса')").parent().next().find("div").text();
                    template += '<tr><td>Дата анонса</td><td>' + dateAnnouncement + '</td></tr>';
                    console.log(dateAnnouncement);
                    
                    
                    // доработать вывод даты
                    var releaseDateT = text.find("b:contains('Даты выпуска')").parent().next().find("span");
                    var dates = {};
                    var datesLength = 0;
                    var _splitDate = releaseDateT.parent().text().split('\n');
                    
                    releaseDateT.each(function(e){
                        var dataDates = _splitDate[e].substr(1).split(' ');
                        
                        dates[e] = {
                            day: dataDates[0],
                            monthName: dataDates[1],
                            year: dataDates[2],
                            yearPrefix: dataDates[3]
                        };
                        
                        datesLength = e;
                    });
                    
                    template += '<tr><td>Даты выпуска</td><td>' + dates[0].day + '-' + dates[datesLength].day + ' ' + dates[0].monthName + ' ' + dates[0].year + ' ' + dates[0].yearPrefix + ' <span style="color:red;">(need optimize this view template for date)</span></td></tr>';
                    
                    genre = text.find("a[title='Классификация компьютерных игр']").parent().parent().next().find("a").text();
                    template += '<tr><td>Жанр</td><td>' + genre + '</td></tr>';
                    console.log(genre);
                    
                    platform = text.find("a[title='Компьютерная платформа']").parent().parent().next().text();
                    var platforms = {};
                    
                    template += '<tr><td>Платформы</td><td>' + platform + ' <span style="color:red;">(need optimize this view template for platforms)</span></td></tr>';
                    console.log(platform);
                    
                    gameEngine = text.find("a[title='Игровой движок']").parent().parent().next().text();
                    template += '<tr><td>Игровой движок</td><td>' + gameEngine + '</td></tr>';
                    console.log(gameEngine);
                    
                    gameMode = text.find("b:contains('Режим игры')").parent().next().text();
                    template += '<tr><td>Режим игры</td><td>' + gameMode + ' <span style="color:red;">(need optimize this view template for gameMode)</span></td></tr>';
                    console.log(gameMode);
                    
                    template += '</table>';
                    
                    $("#details_game").html(template);

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