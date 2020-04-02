/* ===================================================================

 * スムーススクロール

=================================================================== */
$(function(){
   // #で始まるアンカーをクリックした場合に処理
   $('a[href^=#]').click(function() {
      // スクロールの速度
      var speed = 400;// ミリ秒
      // アンカーの値取得
      var href= $(this).attr("href");
      // 移動先を取得
      var target = $(href == "#" || href == "" ? 'html' : href);
      // 移動先を数値で取得
      var position = target.offset().top;
      // スムーススクロール
      $($.browser.safari ? 'body' : 'html').animate({scrollTop:position}, speed, 'swing');
      return false;
   });
});

/* ===================================================================

 * <head>タグの中身
 
=================================================================== */
function include(filename, afterfunc) {

  include.seq = (include.seq)? include.seq + 1: 1;

  var id = new Date().getTime() + "-" + include.seq;
  var inc = document.createElement("iframe");

  inc.id = "inc-" + id;
  inc.src = filename;
  inc.style.display = "none";
  document.write("<span id=\"" + id + "\"></span>");
  
  var incfunc = function() {
    var s = (function() {
      var suffix = (n = filename.lastIndexOf(".")) >= 0 ? filename.substring(n): "default";
      if (suffix == ".html") return inc.contentWindow.document.body.innerHTML;
      if (suffix == ".htm") return inc.contentWindow.document.body.innerHTML;
      if (suffix == ".txt") return inc.contentWindow.document.body.firstChild.innerHTML;
      if (suffix == "default") return inc.contentWindow.document.body.innerHTML;
    })();

    var span = document.getElementById(id);

    var insertBeforeHTML = function(htmlStr, refNode) {
      if (document.createRange) {
        var range = document.createRange();
        range.setStartBefore(refNode);
        refNode.parentNode.insertBefore(range.createContextualFragment(htmlStr), refNode);
      } else {
        refNode.insertAdjacentHTML('BeforeBegin', htmlStr);
      }
    };

    insertBeforeHTML(s.split("&gt;").join(">").split("&lt;").join("<"), span);
    document.body.removeChild(inc);
    span.parentNode.removeChild(span);
    if (afterfunc) afterfunc();
  };

  if (window.attachEvent) {
    window.attachEvent('onload', 
      function() {
        document.body.appendChild(inc); 
        inc.onreadystatechange = function() { if (this.readyState == "complete") incfunc(); };
      });
  }
  else {
	//	alert("a");
    document.body.appendChild(inc);
    inc.onload = incfunc;
  }
}

