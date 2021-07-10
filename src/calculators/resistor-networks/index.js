/*

author         Oliver Blaser
date           26.06.2021
copyright      GNU GPLv3 - Copyright (c) 2021 Oliver Blaser

*/

/*
Copyright (C) 2021 Oliver Blaser

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

function amp(ra, rb) { return (ra+rb)/rb; } // ratio = V1/V2 = (Ra+Rb)/Rb

function calc(a, eSeries = 'E24')
{
    let eValues = ee_getEValues(eSeries, true);

    if((typeof a !== 'number') || isNaN(a) || (eValues == null)) return "invalid parameter";

    if(a<=1) return { str: 'invalid ratio' };

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

function update()
{
    $('#voltdiv_r').html('<div style="font-family: mono;">' + JSON.stringify(calc($('#voltdiv_v1').val() / $('#voltdiv_v2').val(), 'e24'), null, 2).replaceAll('\n', '<br/>') + '</div>');
}

$(function()
{
    $('#voltdiv_v1').bind('keyup mouseup', update);
    $('#voltdiv_v2').bind('keyup mouseup', update);

    update();
});
