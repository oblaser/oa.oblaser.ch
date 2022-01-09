/*
author          Oliver Blaser
date            09.01.2022
copyright       GNU GPLv3 - Copyright (c) 2022 Oliver Blaser
*/

function amp(ra, rb) { return (ra+rb)/rb; } // ratio = V1/V2 = (Ra+Rb)/Rb

function calc(a, eSeries = 'E24')
{
    let eValues = ee_getEValues(eSeries, true);

    if((typeof a !== 'number') || isNaN(a) || (eValues == null)) return { str: 'invalid parameter' };

    if(a <= 1) return { str: 'invalid ratio' };

    let exponents = [0];
    for(let i = 0; i <= 12; ++i) exponents[i] = i;
    for(let i = -12; i < 0; ++i) exponents[exponents.length] = i;

    let exp = exponents[0];
    let ira = 0;
    let irb = 0;

    for(let iExp = 0; iExp < exponents.length; ++iExp)
    {
        for(let i = 0; i < eValues.length; ++i)
        {
            for(let j = 0; j < eValues.length; ++j)
            {
                let err = amp(eValues[ira] * Math.pow(10, exp), eValues[irb]) - a;
                let err_loop = amp(eValues[i] * Math.pow(10, exponents[iExp]), eValues[j]) - a;

                if(Math.abs(err_loop) < Math.abs(err))
                {
                    exp = exponents[iExp];
                    ira = i;
                    irb = j;
                }
            }
        }
    }

    let ra = 0;
    let rb = 0;
    
    if(exp >= 0)
    {
        ra = eValues[ira] * Math.pow(10, exp);
        rb = eValues[irb];
    }
    else
    {
        ra = eValues[ira];
        rb = eValues[irb] * Math.pow(10, -exp);
    }
    
    let r = amp(ra, rb);
    let errA = r - a;
    let errR = errA / a;

    return { str: 'V<sub>2</sub> = ( ' + ojs_expFormatEng(rb) + ' * V<sub>1</sub> ) / ( ' + ojs_expFormatEng(ra) + ' + ' + ojs_expFormatEng(rb) + ' ) = ' + ojs_roundSignificant(r) + ' (Error: ' + ojs_expFormatEng(errA) + ' / ' + ojs_roundSignificant(errR*100, 2) + '%)', ra: ra, rb: rb, a: r, err_abs: errA, err_rel: errR };
}
