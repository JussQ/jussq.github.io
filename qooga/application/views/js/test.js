(function($){
            'use strict';
            $.parseWiki = function(element, optinos)
            {
                var defaults = {
                    
                }
                
                var plugin = this;
                
                plugin.settings = this;
                
                var $element = $(element),
                    element = element;
            
                plugin.init = function()
                {
                    console.log("plugin ParseWiki is init");
                    plugin.getData();
                }
                
                plugin.getData = function()
                {
                    $.ajax({
                        url: 'http://ru.wikipedia.org/w/api.php?action=parse&format=json&page=Dragon_Age:_Inquisition&callback=?',
                        contentType: "application/json; charset=utf-8",
                        dataType: 'json',
                        method: 'get',
                        success: function(data){
                            
                            var text = data.parse.text['*'];
                                text = $("<div></div>").html(text);
                                
                            text.find("sup").remove();
                            
                            //$("#content").html(text);
                            
                            console.log(data);
                        },
                        error: function(errorMessage){
                            
                        }
                    });
                    /*var url = 'http://ru.wikipedia.org/w/api.php?format=json&action=parse&page=Dragon_Age:_Inquisition&callback=?';
                    $.getJSON(url, function(data){
                        var hash = data;
                        var page_value = "";
                        console.log(data);
                        
                        
                        
                        //hash = $(hash);
                        //hash = hash.find("sup").remove();
                        
                        $("#content").html(hash.parse.text['*']);
                    });*/
                }
                plugin.init();
            }
            
            $.fn.parseWiki = function(options)
            {
                return this.each(function(){
                    if(undefined == $(this).data('parseWiki'))
                    {
                        var plugin = new $.parseWiki(this, options);
                        $(this).data('parseWiki', plugin);
                    }
                })
            }
            $('body').parseWiki({});
        })(jQuery);