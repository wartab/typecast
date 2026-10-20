export function TypeCast<T>(targetType: {new (): T} | typeof Date, undefinedAsNull = false) {
    function castValue(value: any) {
        if (value === undefined || value === null) {
            return undefinedAsNull ? null : value;
        }

        if (value instanceof targetType) {
            return value;
        }

        if ((targetType === Date) && (typeof value === "string")) {
            return new targetType(value);
        }

        // @ts-expect-error
        return Object.assign(new targetType(), value);
    }

    return function (target: any, key: string) {
        Object.defineProperty(target, key, {
            set(initialValue: any) {
                let newValue = castValue(initialValue);
                Object.defineProperty(this, key, {
                    enumerable: true,
                    configurable: true,
                    writable: true,
                });

                this[key] = newValue;
            },
            enumerable: true,
            configurable: true,
        });
    };
}

export function ArrayTypeCast<T>(targetType: {new (): T} | typeof Date, undefinedAsNull = false) {
    function castValue(value: any) {
        if (value === undefined || value === null) {
            return undefinedAsNull ? null : value;
        }

        if (value instanceof targetType) {
            return value;
        }

        if ((targetType === Date) && (typeof value === "string")) {
            return new targetType(value);
        }

        // @ts-expect-error
        return Object.assign(new targetType(), value);
    }

    return function (target: any, key: string) {
        Object.defineProperty(target, key, {
            set(initialValues: any[] | null | undefined) {
                let newValues = initialValues?.map(castValue);

                Object.defineProperty(this, key, {
                    enumerable: true,
                    configurable: true,
                    writable: true,
                });

                this[key] = newValues;
            },
            enumerable: true,
            configurable: true,
        });
    };
}