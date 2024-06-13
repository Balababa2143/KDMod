import Immutable from "immutable";
declare module "immutable" {
  type KeyPathValue<T extends object> = {
    [Key in keyof Required<T>]:
    T[Key] extends object ?
    [[Key], T[Key]] | {
      [SubKey in keyof Required<T[Key]>]:
      [[Key, SubKey], Extract<KeyPathValue<T[Key]>, [[SubKey], any]>[1]]
    }[keyof T[Key]] :
    [[Key], T[Key]]
  }[keyof T];
  
  type KeyPath<T extends object> = KeyPathValue<T>[0];
  
  type PropAtPath<T extends object, Path extends KeyPath<T>> =
    Extract<KeyPathValue<T>, [Path, any]>[1];
  
  type KeyValue<T extends object> = {
    [Key in keyof T]: [Key, T[Key]]
  }[keyof T];
  
  type TypeOrPartial<T> =    
    T extends object ?
    (T extends ArrayLike<any> ? T : Partial<T> | Iterable<KeyValue<T>>) :
    T;
  
  type RecordFieldOf<T extends object, K extends keyof T> =
    Extract<KeyValue<T>, [K, any]>[1]
    
  interface Record<TProps extends object> {
    setIn<Path extends KeyPath<TProps>, Prop extends TypeOrPartial<PropAtPath<TProps, Path>>>(keyPath: Path, value: Prop): this;
    updateIn<Path extends KeyPath<TProps>, Prop extends TypeOrPartial<PropAtPath<TProps, Path>>>(
      keyPath: Path,
      updater: (value: Prop) => Prop
    ): this;
    mergeIn<Path extends KeyPath<TProps>, Prop extends TypeOrPartial<PropAtPath<TProps, Path>>>(
      keyPath: Path, ...collections: Array<Prop>): this;
    mergeDeepIn<Path extends KeyPath<TProps>, Prop extends TypeOrPartial<PropAtPath<TProps, Path>>>(
      keyPath: Path,
      ...collections: Array<Prop>
    ): this;

    /**
     * @alias removeIn
     */
    deleteIn<Path extends KeyPath<TProps>>(keyPath: Path): this;
    removeIn<Path extends KeyPath<TProps>>(keyPath: Path): this;
  }
}