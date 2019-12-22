import { addDecorator, configure } from "@storybook/react";
import { withInfo } from '@storybook/addon-info';
import { withKnobs } from "@storybook/addon-knobs";

import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

// automatically import all files ending in *.stories.js from root
const req = require.context( "../", true, /.stories.tsx?$/ );

function loadStories() {
    req.keys().forEach( ( filename ) => req( filename ) );
}

addDecorator(
    withInfo( {
        inline: true,
        styles: {
            infoStory: {
                padding: "5px 20px",
                fontFamily: 'Avenir'
            },
        },
    } )
);

addDecorator( withKnobs );

configure( loadStories, module );
