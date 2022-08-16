import * as React from 'react';
import { createRoot } from 'react-dom/client';

import { WeatherWidget } from './lib';

const container = document.getElementById('app') as HTMLElement;
const root = createRoot(container);
root.render(
    <div style={
        {
            height: '800px',
            width: '800px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            alignContent: 'center',
            background: '#302e38'
        }
    }>
        <WeatherWidget
            appid='<<open_weather_map_api_key>>'
        />
    </div>
);
