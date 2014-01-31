Pager
=====

シンプルなページング用Javascriptライブラリです。
サーバサイドでのページング処理ではなく、全データをJSONで画面に渡し、Javascriptでページング処理を行います。

[Hogan.js](http://twitter.github.io/hogan.js/)をテンプレートエンジンとして使っています。

使い方は以下です。

```
<!DOCTYPE html>
<html>
<head>
	<script type="text/javascript" src="jquery-2.1.0.min.js"></script>
	<script type="text/javascript" src="hogan.min.js"></script>
	<script type="text/javascript" src="pager.js"></script>
	<script>
		$(function() {
			var data = [
				{a: 1, b: 2, c:3}
				, {a: 4, b: 5, c:6}
				, {a: 7, b: 8, c:9}
				, {a: 10, b: 11, c:12}
				, {a: 13, b: 14, c:15}
			];

			var page = new Pager({
				id: '#table'
				, data: data
				, page_size: 10
				, template: $('#template').text()
			});
			page.show_page();

		});
	</script>
	<script type="text/template" id="template">
		<table>
			<thead>
			<tr>
				<th>a</th>
				<th>b</th>
				<th>c</th>
			</tr>
			</thead>
			<tbody>
			{{#data}}
			<tr>
				<td>{{a}}</td>
				<td>{{b}}</td>
				<td>{{c}}</td>
			</tr>
			{{/data}}
			</tbody>
		</table>
		{{#has_prev_page}}
		<button type="button" class="prev"><</button>
		{{/has_prev_page}}
		{{#page_numbers}}
		<a href="javascript:void(0);" class="move" data-page-number="{{.}}">{{.}}</a>
		{{/page_numbers}}

		{{#has_next_page}}
		<button type="button" class="next">></button>
		{{/has_next_page}}
	</script>
</head>
<body>
<h2>Pager test</h2>
<div id="table"></div>
<div>
	powered by wata
</div>
</body>
</html>
```