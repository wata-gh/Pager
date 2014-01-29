function Pager(opt) {
	this.id = opt.id;
	this.data = opt.data;
	this.page_size = opt.page_size;
	this.template = Hogan.compile(opt.template);
	this.current_page_index = 0;
	this.max_page = Math.ceil(this.data.length / this.page_size);
	this.page_numbers = [];
	for (var i = 0; i < this.max_page; i++) {
		this.page_numbers[i] = i + 1;
	}
	$(document).on('click', '.prev', this.show_prev_page.bind(this));
	$(document).on('click', '.next', this.show_next_page.bind(this));
	var _this = this;
	$(document).on('click', '.move', function() {
		var pn = $(this).attr('data-page-number');
		var n = parseInt(pn, 10);
		if (n && isFinite(n)) _this.show_page(n);
	});
}
Pager.prototype = {
	get_page_data: function() {
		return this.data.slice(this.current_page_index * this.page_size, this.current_page_index * this.page_size + this.page_size);
	}, show_page: function(n) {
		if (n && parseInt(n)) this.current_page_index = n - 1;
		$(this.id).empty().append(this.template.render({
			current_page: this.current_page()
			, data: this.get_page_data()
			, has_next_page: this.has_next_page()
			, has_prev_page: this.has_prev_page()
			, max_page: this.max_page
			, page_numbers: this.page_numbers
		}));
	}, current_page: function() {
		return this.current_page_index + 1;
	}, show_next_page: function() {
		if (!this.has_next_page()) return;
		this.current_page_index++;
		this.show_page();
	}, show_prev_page: function() {
		if (!this.has_prev_page()) return;
		this.current_page_index--;
		this.show_page();
	}, has_next_page: function() {
		return (this.data.length / this.page_size) >= (this.current_page_index + 1);
	}, has_prev_page: function() {
		return this.current_page_index > 0;
	}
};
