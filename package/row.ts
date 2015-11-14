import * as b from 'node_modules/bobril/index';
import * as button from './button';

let rowStyle = b.styleDef({
    width: '200px',
    backgroundColor: '#ccc',
    borderBottomStyle: 'solid',
    borderBottomWidth: '1px',
    padding: '0px',
    margin: '0px'

});

let active = b.styleDef({
    backgroundColor: '#999',
    borderColor: '#6699FF',
    borderStyle: 'solid',
    borderWidth: '3px',
});

let actionButtonsContainer = b.styleDef({});

export interface IData {
    header: string;
    info: string;
    frames: number;
    isActive: boolean;
    onGo: () => void;
    onCopy: () => void;
}

interface ICtx extends b.IBobrilCtx {
    data: IData
}

export let create = b.createVirtualComponent<IData>({
    render(ctx: ICtx, me: b.IBobrilNode) {
        me.tag = 'li'
        
        b.style(me, rowStyle);
        if(ctx.data.isActive){
            b.style(me, active);
        }
        
        me.children = [
            { tag: 'div', children: 'Order: ' + ctx.data.header },
            { tag: 'div', children: 'Time: ' + ctx.data.info },
            { tag: 'div', children: 'Frames: ' + ctx.data.frames },
            b.styledDiv([
                button.create({ title: 'GO', style: button.style.actionButton, onClick: ctx.data.onGo, float: 'left', width: '50%' }),
                button.create({ title: 'COPY', style: button.style.actionButton, onClick: ctx.data.onCopy })
            ], actionButtonsContainer)       
        ];
    }
})
