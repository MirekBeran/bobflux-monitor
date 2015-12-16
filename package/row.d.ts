import * as b from 'bobril';
export interface IData {
    header: string;
    info: string;
    frames: number;
    isActive: boolean;
    onGo: () => void;
    onCopy: () => void;
}
export declare let create: (data: IData, children?: boolean | string | b.IBobrilNode | (boolean | string | b.IBobrilNode)[]) => b.IBobrilNode;
