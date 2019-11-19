export declare class TreeViewComponent {
    nodes: {
        id: number;
        name: string;
        children: ({
            id: number;
            name: string;
            children?: undefined;
        } | {
            id: number;
            name: string;
            children: {
                id: number;
                name: string;
            }[];
        })[];
    }[];
    options: {};
}
