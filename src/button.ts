import * as b from 'node_modules/bobril/index';

export let style = {
    mainButtonOpen: b.styleDef({
        textAlign: 'center',
        height: '20px',
        width: '200px',
        backgroundColor: '#ccc'
    }),
    mainButtonClose: b.styleDef({
        textAlign: 'center',
        height: '20px',
        width: '30px',
        backgroundColor: '#ccc'
    }),
    actionButton: b.styleDef({
        textAlign: 'center',
        backgroundColor: '#181818',
        color: '#fff',
        borderStyle: 'solid',
        borderWidth: '1px',
        cursor: 'pointer'
    }, { hover: { backgroundColor: '#585858' } })
};

export interface IData {
    title: string;
    style?: b.IBobrilStyle;
    onClick: () => void;
}

interface ICtx extends b.IBobrilCtx {
    data: IData
}

export let create = b.createVirtualComponent<IData>({
    render(ctx: ICtx, me: b.IBobrilNode) {
        me.children = b.styledDiv(ctx.data.title, ctx.data.style);
    },
    onClick(ctx: ICtx) {
        if (ctx.data.onClick)
            ctx.data.onClick();
        return true;
    }
})
