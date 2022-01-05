/*
author          Oliver Blaser
date            05.01.2022
copyright       MIT - Copyright (c) 2022 Oliver Blaser
*/

/*
Copyright (c) 2022 Oliver Blaser

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
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

// ojs tests
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
/**/
//#p endrm
