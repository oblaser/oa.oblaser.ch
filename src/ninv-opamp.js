/*





Copyright (C) <year>  <name of author>

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


const E3 = [ 1, 1.1, 1.2, 1.3, 1.5, 1.6, 1.8, 2, 2.2, 2.4, 2.7, 3, 3.3, 3.6, 3.9, 4.3, 4.7, 5.1, 5.6, 6.2, 6.8, 7.5, 8.2, 9.1, Infinity ];
const E6 = [ 1, 1.1, 1.2, 1.3, 1.5, 1.6, 1.8, 2, 2.2, 2.4, 2.7, 3, 3.3, 3.6, 3.9, 4.3, 4.7, 5.1, 5.6, 6.2, 6.8, 7.5, 8.2, 9.1, Infinity ];
const E12 = [ 1, 1.1, 1.2, 1.3, 1.5, 1.6, 1.8, 2, 2.2, 2.4, 2.7, 3, 3.3, 3.6, 3.9, 4.3, 4.7, 5.1, 5.6, 6.2, 6.8, 7.5, 8.2, 9.1, Infinity ];
const E24 = [ 1, 1.1, 1.2, 1.3, 1.5, 1.6, 1.8, 2, 2.2, 2.4, 2.7, 3, 3.3, 3.6, 3.9, 4.3, 4.7, 5.1, 5.6, 6.2, 6.8, 7.5, 8.2, 9.1, Infinity ];

class ojs
{
    static roundSignificant(value, nDigits = 4)
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

    static expFormatEng(value, nSigDig = 4)
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

                r = this.roundSignificant(rv, nSigDig).toString();
                if(range != 0) r += 'e' + range.toString();
            }
        }
        else r = value.toString();

        return r;
    }
}

/*
console.log(ojs.roundSignificant(0));
console.log(ojs.roundSignificant(123.456));
console.log(ojs.roundSignificant(123456));
console.log(ojs.roundSignificant(123456.4));
console.log(ojs.roundSignificant(123456.5));
console.log(ojs.roundSignificant(0.000123456));
console.log(ojs.roundSignificant(-123.456));
console.log(ojs.roundSignificant(-123456));
console.log(ojs.roundSignificant(-123456.4));
console.log(ojs.roundSignificant(-123456.5));
console.log(ojs.roundSignificant(-0.000123456));
console.log(ojs.roundSignificant(Infinity));
console.log(ojs.roundSignificant(-Infinity));
console.log(ojs.roundSignificant(1/0));
console.log(ojs.roundSignificant(-1/0));
console.log('=========================');
console.log(ojs.expFormatEng(0));
console.log(ojs.expFormatEng(123.456));
console.log(ojs.expFormatEng(123456));
console.log(ojs.expFormatEng(123456.4));
console.log(ojs.expFormatEng(123456.5));
console.log(ojs.expFormatEng(0.000123456));
console.log(ojs.expFormatEng(-123.456));
console.log(ojs.expFormatEng(-123456));
console.log(ojs.expFormatEng(-123456.4));
console.log(ojs.expFormatEng(-123456.5));
console.log(ojs.expFormatEng(-0.000123456));
console.log(ojs.expFormatEng(Infinity));
console.log(ojs.expFormatEng(-Infinity));
console.log(ojs.expFormatEng(1/0));
console.log(ojs.expFormatEng(-1/0));
*/



function amp(ra, rb) { return 1 + (ra / rb); }

function calc(a)
{
    if((typeof a !== 'number') || isNaN(a)) return "invalid parameter";

    let exp = 0;
    let ira = 0;
    let irb = 0;

    for(let iExp = 0; iExp <= 12; ++iExp)
    {
        for(let i = 0; i < E24.length; ++i)
        {
            for(let j = 0; j < E24.length; ++j)
            {
                let err = amp(E24[ira] * Math.pow(10, exp), E24[irb]) - a;
                let err_loop = amp(E24[i] * Math.pow(10, iExp), E24[j]) - a;

                if(Math.abs(err_loop) < Math.abs(err))
                {
                    exp = iExp;
                    ira = i;
                    irb = j;
                }
            }
        }
    }

    let ra = E24[ira] * Math.pow(10, exp);
    let rb = E24[irb];
    let r = amp(ra, rb);
    let errA = r - a;
    let errR = errA / a;

    return { str: 'A = 1 + ( ' + ojs.expFormatEng(ra) + ' / ' + ojs.expFormatEng(rb) + ' ) = ' + ojs.roundSignificant(r) + ' (Error: ' + ojs.expFormatEng(errA) + ' / ' + ojs.roundSignificant(errR*100, 2) + '%)', ra: ra, rb: rb, a: r, err_abs: errA, err_rel: errR };
}

console.log(calc());
console.log(calc(null));
console.log(calc(NaN));
console.log(calc('asdf'));
console.log(calc(1));
console.log(calc(1.0001));
console.log(calc(1.586));
console.log(calc(34));
console.log(calc(34567));
