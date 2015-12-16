define(["require", "exports", 'bobril', 'fun-model', './button', './rows', './textbox'], function (require, exports, b, fun_model_1, button, rows, textbox) {
    let containerStyle = b.styleDef({
        position: 'absolute',
        top: '0px',
        right: '0px',
        backgroundColor: '#ddd',
        overflow: 'auto',
        overflowX: 'hidden',
        fontFamily: 'Lucida Console',
        zIndex: 1000
    });
    let openedStyle = b.styleDef({
        bottom: '0px'
    });
    let createDefaultData = (cursor) => {
        return {
            isOpen: false,
            stateStamps: [],
            cursor
        };
    };
    let createMonitor = b.createComponent({
        render(ctx, me) {
            me.tag = 'div';
            b.style(me, containerStyle);
            if (ctx.data.isOpen)
                b.style(me, openedStyle);
            let state = fun_model_1.getState(ctx.data.cursor);
            me.children = [
                button.create({
                    title: ctx.data.isOpen ? 'HIDE >' : '<',
                    style: ctx.data.isOpen ? button.style.mainButtonOpen : button.style.mainButtonClose,
                    onClick: () => {
                        ctx.data.isOpen = !ctx.data.isOpen;
                        b.invalidate(ctx);
                    }
                }),
                !!ctx.data.isOpen && [
                    b.styledDiv([
                        textbox.create({
                            value: ctx.stateJSON,
                            setFocus: ctx.setFocusForCopy,
                            style: textbox.style.copyState,
                            float: !!ctx.stateJSON ? 'left' : undefined,
                            onChange: (value) => {
                                ctx.stateJSON = value;
                                b.invalidate(ctx);
                            },
                            onKeyDown: (event) => {
                                if (event.ctrl && event.which === 67) {
                                    ctx.stateJSON = '';
                                    b.invalidate();
                                }
                            }
                        }),
                        !!ctx.stateJSON && button.create({
                            title: 'GO',
                            style: button.style.actionButton,
                            onClick: () => {
                                if (!ctx.stateJSON)
                                    return;
                                fun_model_1.setState(ctx.data.cursor, JSON.parse(ctx.stateJSON));
                                b.invalidate();
                            },
                        })
                    ]),
                    b.styledDiv(rows.create({
                        rows: ctx.data.stateStamps.map((stateStamp, index) => {
                            return {
                                header: index.toString(),
                                info: stateStamp.time.toLocaleTimeString(),
                                frames: stateStamp.frames,
                                isActive: state === stateStamp.state,
                                onGo: () => {
                                    fun_model_1.setState(ctx.data.cursor, stateStamp.state);
                                    b.invalidate();
                                },
                                onCopy: () => {
                                    ctx.stateJSON = JSON.stringify(stateStamp.state);
                                    ctx.setFocusForCopy = true;
                                    b.invalidate(ctx);
                                }
                            };
                        }).reverse()
                    }))
                ]
            ];
            ctx.setFocusForCopy = false;
        }
    });
    exports.init = (cursor = { key: '' }) => {
        let data = createDefaultData(cursor);
        let routeUrl = '';
        let callback = (m, p) => {
            if (m && p && m.indexOf('Current state') >= 0) {
                if (!routeUrl || routeUrl === window.location.href) {
                    if (!data.stateStamps.some(stateStamp => stateStamp.state === p))
                        data.stateStamps.push({
                            change: 'change',
                            time: new Date(),
                            state: p,
                            frames: b.frame()
                        });
                }
                else {
                    data.stateStamps = [];
                }
                routeUrl = window.location.href;
            }
        };
        b.addRoot(() => createMonitor(data));
        return callback;
    };
});
