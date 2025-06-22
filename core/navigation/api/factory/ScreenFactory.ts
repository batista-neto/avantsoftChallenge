import React from 'react';

export interface ScreenFactory {
    create(RootScreen?: React.ElementType<any>): React.ReactElement
}