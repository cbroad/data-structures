
export function isObject(val: any): val is object {
    return isType(val, "Object");
}

export function isType(val: any, typeString: string) {
    return Object.prototype.toString.call(val) === `[object ${typeString}]`;
}


export function getType(val: any): string {
    const typeName = typeof (val);
    switch (typeName) {
        case "object":
            if (val[Symbol.toStringTag] !== undefined) {
                return val[Symbol.toStringTag];
            }
            const constructorName = getConstructorName(val)
            switch (constructorName) {
                case "Array": return "array";
                default:
                    return constructorName;
            }
        default:
            return typeName;
    }

}

export function getConstructorName(val: any): string {
    return Object.prototype.toString.call(val).slice(8, -1);
}