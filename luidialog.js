;
(function () {
    //定义Beautifier的构造函数
    var Dialog = function (ele, opt) {
        this.$element = ele,
            this.defaults = {
                'init': null,
                'width': 300,
                'height': 200,
                'color': 'red',
                'fontSize': '12px',
                'textDecoration': 'none'
            },
            this.options = $.extend({}, this.defaults, opt)
    }
    //定义dialog的方法
    Dialog.prototype = {
        initDialog: function () {
            var overlay = $('<div id="overlay" class="dui-dialog-shd"></div>');
            var dialog = $('<div id="dialog" class="lui-dialog"></div>');
            var height = this.options.height;
            var width = this.options.width;
            var spacing = 20;
            var oheight = height + spacing;
            var owidth = width + spacing;
            winHeight = document.body.clientHeight;
            winWidth = document.body.clientWidth;
            overlay.css({"position": "fixed", "height": oheight + "px", "width": owidth + "px", "top": (winHeight - oheight) / 2 + "px", "left": (winWidth - owidth) / 2 + "px"});
            dialog.css({"position": "fixed", "height": height + "px", "width": width + "px", "top": (winHeight - height) / 2 + "px", "left": (winWidth - width) / 2 + "px"})
            var container = $('<div class="lui-dialog-content"><a href="#" class="j_close_dialog lui-dialog-close">X</a></div>');
            dia=this;
            $(".j_close_dialog", container).bind("click", function () {
                dia.colseDialog();
            });
            container.css({ "height": height + "px", "width": width + "px"});
            dialog.append(container);
            //克隆dom不克隆事件和数据
            data = this.$element.data('dialog');
            if (!data) {
                this.$element.data('dialog', {src: this.$element.clone()})
            }
            container.append(this.$element);
            $("body").append(overlay).append(dialog);
            this.shd = overlay;
            this.dialog = dialog;
            overlay.show();
            dialog.show();
            this.$element.show();
            if (this.options.init && typeof(this.options.init) == "function") {
                this.options.init();
            }
            return this.$element;
        },
        colseDialog: function () {
            $("body").append(this.$element.data("dialog").src);
            this.shd.remove();
            this.dialog.remove();
        }
    }
    var methods = {
        init: function (options) {
            //创建dialog的实体
            var dialog = new Dialog(this, options);
            var $this = $(this);
            $dialog = dialog.initDialog();
            data = $this.data('dialog');
            if (!data) {
                $(this).data('dialog', {
                    target: $this,
                    dialog: dialog
                });
            } else {
                var diadata = $.extend($(this).data('dialog'), {
                    target: $this,
                    dialog: dialog
                });
                $(this).data('dialog', diadata);
            }
        },
        close: function () {
            // is
            var $this = $(this),
                data = $this.data('dialog');
            $(window).unbind('.lui-dialog')
            data.dialog.colseDialog();
        }
    };
    //在插件中使用dialog对象
    $.fn.luiDialog = function (method) {

        // 方法调用
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method' + method + 'does not exist on jQuery.tooltip');
        }


    }
})(jQuery);