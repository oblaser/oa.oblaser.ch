/*
author          Oliver Blaser
date            26.06.2021
copyright       GNU GPLv3 - Copyright (c) 2021 Oliver Blaser
*/

const ee_E3 = [ 1, 2.2, 4.7 ];
const ee_E6 = [ 1, 1.5, 2.2, 3.3, 4.7, 6.8 ];
const ee_E12 = [ 1, 1.2, 1.5, 1.8, 2.2, 2.7, 3.3, 3.9, 4.7, 5.6, 6.8, 8.2 ];
const ee_E24 = [ 1, 1.1, 1.2, 1.3, 1.5, 1.6, 1.8, 2, 2.2, 2.4, 2.7, 3, 3.3, 3.6, 3.9, 4.3, 4.7, 5.1, 5.6, 6.2, 6.8, 7.5, 8.2, 9.1 ];

function ee_getEValues(eSeries = 'E24', addInfinity = false)
{
    let r = null;

    if(eSeries.toUpperCase() == 'E3') r = ee_E3.slice(0);
    if(eSeries.toUpperCase() == 'E6') r = ee_E6.slice(0);
    if(eSeries.toUpperCase() == 'E12') r = ee_E12.slice(0);
    if(eSeries.toUpperCase() == 'E24') r = ee_E24.slice(0);

    if((r != null) && addInfinity) r[r.length] = Infinity;

    return r;
}
