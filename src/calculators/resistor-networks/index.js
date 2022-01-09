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

function updateNinvOpamp()
{
    let es = $('#eSeries').val()
    $('#ninvopamp_r').html('<div style="font-family: \'Courier New\';">' + JSON.stringify(calc($('#ninvopamp_vout').val() / $('#ninvopamp_vin').val(), es), null, 2).replaceAll('\n', '<br/>').replaceAll(' ', '&nbsp;') + '</div>');
}
var updateNinvOpamp_input_lastWasVin = true;
function updateNinvOpamp_input(vIn, vOut)
{
    if(vIn && !vOut)
    {
        updateNinvOpamp_input_lastWasVin = true;
        $('#ninvopamp_a').val($('#ninvopamp_vout').val() / $('#ninvopamp_vin').val());
    }
    else if(!vIn && vOut)
    {
        updateNinvOpamp_input_lastWasVin = false;
        $('#ninvopamp_a').val($('#ninvopamp_vout').val() / $('#ninvopamp_vin').val());
    }
    else if(!vIn && !vOut)
    {
        if(updateNinvOpamp_input_lastWasVin)
        {
            $('#ninvopamp_vout').val($('#ninvopamp_vin').val() * $('#ninvopamp_a').val());
        }
        else
        {
            $('#ninvopamp_vin').val($('#ninvopamp_vout').val() / $('#ninvopamp_a').val());
        }
    }
    else alert('updateNinvOpamp_input(' + vIn + ', ' + vOut + ')');

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
    $('#eSeries').bind('onchange', update);

    $('#voltdiv_v1').bind('keyup mouseup', updateVoltDiv);
    $('#voltdiv_v2').bind('keyup mouseup', updateVoltDiv);

    $('#ninvopamp_vin').bind('keyup mouseup', () => { updateNinvOpamp_input(true, false); });
    $('#ninvopamp_vout').bind('keyup mouseup', () => { updateNinvOpamp_input(false, true); });
    $('#ninvopamp_a').bind('keyup mouseup', () => { updateNinvOpamp_input(false, false); });
    updateNinvOpamp_input(true, false);

    update();
});
