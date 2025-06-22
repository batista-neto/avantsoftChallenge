import { ScreenInfo, ScreenFactory } from "../api";
import React from 'react'
import { NavRoot } from "./NavRoot";


export class StackNavFactory implements ScreenFactory {
    private static counter = 0

    constructor(private groupName: string, private infos: ScreenInfo[], private initialRoute: string) {}

    create(): React.ReactElement {
        
        return (
            <NavRoot.Navigator 
                key={`${this.groupName}-${++StackNavFactory.counter}`} initialRouteName={this.initialRoute}>
                {
                    this.infos.map(item => {
                        return (
                            <NavRoot.Screen
                                name={item.getRoute()}
                                component={item.getComponent()}
                                key={item.getRoute()} 
                                options={ { title: item.getTitle(), headerShown: item.isHeaderShown() } } />
                        )
                    })
                }
            </NavRoot.Navigator>
        )
    }
}