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

function ojs_roundSignificant(value, nDigits = 4)
{
    let r = 0;

    if(value != 0)
    {
        if(value === Infinity) r = Infinity;
        else if(value === -Infinity) r = -Infinity;
        else
        {
            let signfactor = (value > 0 ? 1 : -1);
            value *= signfactor;

            let range = Math.floor(Math.log10(value));

            if(range >= (nDigits - 1)) r = Math.round(value);
            else
            {
                let fact = Math.pow(10, (nDigits - range - 1));
                r = Math.round(value * fact) / fact;
            }

            r *= signfactor;
        }
    }

    return r;
}

function ojs_expFormatEng(value, nSigDig = 4)
{
    let r = '';

    if(value != 0)
    {
        if(value === Infinity) r = 'Infinity';
        else if(value === -Infinity) r = '-Infinity';
        else
        {
            let signfactor = (value > 0 ? 1 : -1);
            let range = Math.floor( Math.floor(Math.log10(value * signfactor)) / 3 ) * 3;
            let rv = value / Math.pow(10, range);

            r = ojs_roundSignificant(rv, nSigDig).toString();
            if(range != 0) r += 'e' + range.toString();
        }
    }
    else r = value.toString();

    return r;
}

//#p rm
/*
console.log(ojs_roundSignificant(0));
console.log(ojs_roundSignificant(123.456));
console.log(ojs_roundSignificant(123456));
console.log(ojs_roundSignificant(123456.4));
console.log(ojs_roundSignificant(123456.5));
console.log(ojs_roundSignificant(0.000123456));
console.log(ojs_roundSignificant(-123.456));
console.log(ojs_roundSignificant(-123456));
console.log(ojs_roundSignificant(-123456.4));
console.log(ojs_roundSignificant(-123456.5));
console.log(ojs_roundSignificant(-0.000123456));
console.log(ojs_roundSignificant(Infinity));
console.log(ojs_roundSignificant(-Infinity));
console.log(ojs_roundSignificant(1/0));
console.log(ojs_roundSignificant(-1/0));
console.log('=========================');
console.log(ojs_expFormatEng(0));
console.log(ojs_expFormatEng(123.456));
console.log(ojs_expFormatEng(123456));
console.log(ojs_expFormatEng(123456.4));
console.log(ojs_expFormatEng(123456.5));
console.log(ojs_expFormatEng(0.000123456));
console.log(ojs_expFormatEng(-123.456));
console.log(ojs_expFormatEng(-123456));
console.log(ojs_expFormatEng(-123456.4));
console.log(ojs_expFormatEng(-123456.5));
console.log(ojs_expFormatEng(-0.000123456));
console.log(ojs_expFormatEng(Infinity));
console.log(ojs_expFormatEng(-Infinity));
console.log(ojs_expFormatEng(1/0));
console.log(ojs_expFormatEng(-1/0));
*/
//#p endrm
