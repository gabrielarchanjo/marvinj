# MarvinJ
MarvinJ was created to be the Javascript version of Marvin Image Processing Framework aiming to provide the same features in the web, server and mobile platforms powered by Javascript.

If you are not familiar with Marvin Framework and want to play with MarvinJ, don't worry. The rest of this article shows the basic image processing features of MarvinJ using JSFiddle snippets that you can make your own version and play with it.

### Image Loading
In the case of MarvinJ we load images from URLs and usually use a HTML5 canvas for displaying processed images.

```
var canvas = document.getElementById("canvas");
var image = new MarvinImage();

image.load("https://i.imgur.com/4O8VFQY.jpg", function(){
   image.draw(canvas);
});
```
Continue Reading:

### "Playing with image processing in Javascript using MarvinJ 1.0 (JSFiddle Examples)"
http://marvinj.org/en/releases/marvinj_1.0.html

