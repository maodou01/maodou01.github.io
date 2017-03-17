/*
 * @Author: songtianning 
 * @Date: 2017-03-09 10:37:26 
 * @Last Modified by: songtianning
 * @Last Modified time: 2017-03-09 10:41:20
 */
(function(window,undefined){
    (function reload(){
        document.documentElement.style.fontSize= ((window.innerWidth / 640) * 100) + 'px';
        window.onresize=reload;
    })();
})(window);
