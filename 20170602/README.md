圣杯布局
-----------------------------------
html代码参考如下：<br>
```html
<div class="container">
    <div class="middle"></div>
    <div class="left"></div>
    <div class="right"></div>
</div>
```
css代码参考如下：<br>
```css
.container{
    height: 400px;
    padding: 0 200px;
}
.middle{
    width: 100%;
    height: 400px;
    background-color: deeppink;
    float: left;
}
.left{
    width: 200px;
    height: 400px;
    background-color: blue;
    float: left;
    margin-left: -100%;
    position: relative;
    left: -200px;
}
.right{
    width: 200px;
    height: 400px;
    background-color: darkorchid;
    float: left;
    margin-left: -200px;
    position: relative;
    right: -200px;
}
```
[预览](https://skyninger.github.io/20170602/test1.html)
<br><br>

双翼飞布局
-----------------------------------
html代码参考如下：<br>
```html
<div class="container">
    <div class="middle">
        <div class="middle-inner">输入文字后，三栏自动增高</div>
    </div>
    <div class="left"></div>
    <div class="right"></div>
</div>
```
css代码参考如下：<br>
```css
.container{
    overflow: hidden;
}
.middle,.left,.right{
    float: left;
}
.middle{
    width: 100%;
    padding-bottom: 9999px;
    margin-bottom: -9999px;
}
.middle-inner{
    margin: 0 200px;
    background-color: deeppink;
}
.left{
    width: 200px;
    background-color: blue;
    margin-left: -100%;
    padding-bottom: 9999px;
    margin-bottom: -9999px;
}
.right{
    width: 200px;
    background-color: darkorchid;
    margin-left: -200px;
    padding-bottom: 9999px;
    margin-bottom: -9999px;
}
```
[预览](https://skyninger.github.io/20170602/test2.html)
<br><br>

flex布局
-----------------------------------
html代码参考如下：<br>
```html
<div class="grid">
    <div class="left"></div>
    <div class="middle fluid">输入文字后，三栏自动增高</div>
    <div class="right"></div>
</div>
```
css代码参考如下：<br>
```css
.grid{
    display: -webkit-flex;
    display: -moz-flex;
    display: -o-flex;
    display: -ms-flex;
    display: flex;
}
.fluid{
    flex: 1;
}
.middle{
    background-color: deeppink;
}
.left{
    background-color: blue;
    width: 200px;
}
.right{
    background-color: darkorchid;
    width: 200px;
}
```
[预览](https://skyninger.github.io/20170602/test3.html)
<br><br>

浮动布局
-----------------------------------
html代码参考如下：<br>
```html
<div class="container">
    <div class="left"></div>
    <div class="middle"></div>
    <div class="right"></div>
</div>
```
css代码参考如下：<br>
```css
.container{
    width: 100%;
    margin: 0 auto;
}
.container::after{
    content: '';
    display: table;
    clear: both;
}
.middle{
    background-color: deeppink;
    width: 60%;
    float: left;
    height: 200px;
}
.left{
    background-color: blue;
    width: 20%;
    float: left;
    height: 200px;
}
.right{
    background-color: darkorchid;
    width: 20%;
    float: left;
    height: 200px;
}
```
[预览](https://skyninger.github.io/20170602/test4.html)
<br><br>

表格布局
-----------------------------------
html代码参考如下：<br>
```html
<table class="container">
    <tr>
        <td class="left"></td>
        <td class="middle"></td>
        <td class="right"></td>
    </tr>
</table>
```
css代码参考如下：<br>
```css
.container{
    width: 100%;
    margin: 0 auto;
    border-collapse: collapse;
}
.middle{
    background-color: deeppink;
    height: 200px;
}
.left{
    background-color: blue;
    width: 200px;
    height: 200px;
}
.right{
    background-color: darkorchid;
    width: 200px;
    height: 200px;
}
```
[预览](https://skyninger.github.io/20170602/test5.html)
<br><br>

