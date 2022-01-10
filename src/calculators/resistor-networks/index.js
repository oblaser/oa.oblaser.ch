/*
author          Oliver Blaser
date            09.01.2022
copyright       GNU GPLv3 - Copyright (c) 2022 Oliver Blaser
*/

function updateVoltDiv()
{
    let es = $('#eSeries').val()
    $('#voltdiv_r').html('<div style="font-family: \'Courier New\';">' + JSON.stringify(calc($('#voltdiv_v1').val() / $('#voltdiv_v2').val(), es), null, 2).replaceAll('\n', '<br/>').replaceAll(' ', '&nbsp;') + '</div>');
}

function ninvOpamp_getVin() { return parseFloat($('#ninvopamp_vin').val()); }
function ninvOpamp_getVout() { return parseFloat($('#ninvopamp_vout').val()); }
function ninvOpamp_getA() { return parseFloat($('#ninvopamp_a').val()); }
function updateNinvOpamp()
{
    let a = ninvOpamp_getA();
    let es = $('#eSeries').val();
    $('#ninvopamp_r').html('<div style="font-family: \'Courier New\';">' + JSON.stringify(calc(a, es), null, 2).replaceAll('\n', '<br/>').replaceAll(' ', '&nbsp;') + '</div>');
}
var updateNinvOpamp_input_lastWasVin = true;
function updateNinvOpamp_input(vIn, vOut)
{
    if(!vIn && !vOut)
    {
        if(updateNinvOpamp_input_lastWasVin)
        {
            $('#ninvopamp_vout').val(ninvOpamp_getVin() * ninvOpamp_getA());
        }
        else
        {
            $('#ninvopamp_vin').val(ninvOpamp_getVout() / ninvOpamp_getA());
        }
    }
    else
    {
        if(!vIn || !vOut)
        {
            if(vIn) updateNinvOpamp_input_lastWasVin = true;
            else updateNinvOpamp_input_lastWasVin = false;
        }

        $('#ninvopamp_a').val(ninvOpamp_getVout() / ninvOpamp_getVin());
    }

    updateNinvOpamp();
}

function update()
{
    updateVoltDiv();
    updateNinvOpamp();
}

$(function()
{
    $('#eSeries').html('');
    for(let i = 0; i < ee_eSeries.length; ++i) $('#eSeries').append('<option value="' + ee_eSeries[i] + '">' + ee_eSeries[i] + '</option>');
    $('#eSeries').val(ee_eSeries[3]);
    $('#eSeries').bind('change', update);

    $('#voltdiv_v1').bind('keyup mouseup', updateVoltDiv);
    $('#voltdiv_v2').bind('keyup mouseup', updateVoltDiv);

    $('#ninvopamp_vin').bind('keyup mouseup', () => { updateNinvOpamp_input(true, false); });
    $('#ninvopamp_vout').bind('keyup mouseup', () => { updateNinvOpamp_input(false, true); });
    $('#ninvopamp_a').bind('keyup mouseup', () => { updateNinvOpamp_input(false, false); });
    $('#ninvopamp_calcV').bind('click', () => { updateNinvOpamp_input(true, true); });
    $('#ninvopamp_calcA').bind('click', () => { updateNinvOpamp_input(false, false); });
    updateNinvOpamp_input(true, false);

    update();
});
