import React from 'react';
import {IInputObject} from './interfaces';

const defaultContext = {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars,@typescript-eslint/no-empty-function
    register: (uuid: string, inputObject: IInputObject): void => {},
};

export default React.createContext(
    defaultContext,
);
