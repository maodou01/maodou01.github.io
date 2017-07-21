/*
 * @Author: songtianning 
 * @Date: 2017-03-09 10:37:26 
 * @Last Modified by: songtianning
 * @Last Modified time: 2017-07-21 09:51:08
 */
(function(window,undefined){
    (function reload(){
        var str_font=((window.innerWidth / 640) * 100) + 'px';
        if(window.innerWidth>640) str_font='50px';
        document.documentElement.style.fontSize= str_font;
        window.onresize=reload;
    })();
})(window);
