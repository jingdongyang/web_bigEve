$(function() {


    //拼接根路劲统一管理
    $.ajaxPrefilter(function(options) {

        options.url = 'http://api-breakingnews-web.itheima.net' + options.url


    })
})