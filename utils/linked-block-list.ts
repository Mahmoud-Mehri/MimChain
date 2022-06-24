class ReverseLinkedListItem<dataType> {
    data: dataType;
    previous?: dataType;

    constructor(_data: dataType, _previous: dataType | undefined) {
        this.data = _data;
        this.previous = _previous;
    }
}

// DRAFT ...

export class ReverseLinkedList<dataType> {
    last?: ReverseLinkedListItem<dataType>;

    constructor(_last: ReverseLinkedListItem<dataType> | undefined) {
        this.last = _last;

    }

    size() {
        let counter = 0;
        let node = this.last;
        while (node) {
            counter++;
            // node = node.previous;
        }
    }
}