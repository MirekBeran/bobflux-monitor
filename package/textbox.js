define(["require", "exports", 'node_modules/bobril/index'], function (require, exports, b) {
    exports.style = {
        copyState: b.styleDef({
            width: '150px',
            height: '28px',
            cssFloat: 'left'
        })
    };
    var focus = function (ctx, element) {
        if (ctx.data.setFocus) {
            element.focus();
            element.select();
        }
    };
    exports.create = b.createComponent({
        render: function (ctx, me) {
            if (ctx.data.value !== undefined && ctx.data.value !== null)
                ctx.value = ctx.data.value;
            else
                ctx.value = '';
            me.tag = 'input';
            me.attrs = { type: 'text', value: ctx.value };
            if (ctx.data.style)
                b.style(me, ctx.data.style);
        },
        postInitDom: function (ctx, me, element) {
            focus(ctx, element);
        },
        postUpdateDom: function (ctx, me, element) {
            focus(ctx, element);
        },
        onChange: function (ctx, value) {
            ctx.value = value;
            if (ctx.data.onChange)
                ctx.data.onChange(value);
        },
        onKeyDown: function (ctx, event) {
            if (ctx.data.onKeyDown)
                ctx.data.onKeyDown(event);
            return false;
        }
    });
});
