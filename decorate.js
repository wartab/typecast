function __decorate(decorators, target, key, descriptor) {
    const decorator = decorators[0];
    const result = decorator(target, key);
    Object.defineProperty(target, key, result);
    return result;
}