export interface DIMapper {
    factory(token: string, factoryFn:(...args: any[]) => any ): DIMapper
    single(token: string, factoryFn: (...args: any[]) => any ): DIMapper
}