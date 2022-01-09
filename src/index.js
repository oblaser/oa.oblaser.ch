/*
author          Oliver Blaser
date            09.01.2022
copyright       MIT - Copyright (c) 2022 Oliver Blaser
*/

const pageData =
{
    config:
    {
        maxWidth: "720px",
        center: true,
        fontFamily: "'Trebuchet MS', Verdana, Helvetica, sans-serif"
    },

    defaultStyle:
    [
        { type: "text", css: "margin:7px 0px;" },
        { type: "title2", css: "margin-top:15px;" },
        { type: "listItem", css: "margin-bottom:3px;" }
    ],

    content:
    [
        { type: "title1", text: "Online Apps" },
        { type: "text", text: "The source code of this page and some subpages can be found <a href=\"https://github.com/oblaser/oa.oblaser.ch\" target=\"_blank\">here</a>." },

        { type: "title2", text: "Calculators" },
        {
            type: "list",
            items:
            [
                { type: "link", url: "./calculators/resistor-networks/", text: "Resistor Networks" }
            ]
        },

        { type: "title2", text: "Games" },
        {
            type: "list",
            items:
            [
                { type: "link", url: "./darwins-dice/", text: "Darwin's Dice" }
            ]
        }
    ],

    footer:
    [
        { type: "text", text: "&copy;&nbsp;Oliver&nbsp;Blaser", htmlStyle: "display: inline-block;" },
        { type: "text", text: "|", htmlStyle: "display: inline-block; padding-left: 7px; padding-right: 7px;" },
        { type: "link", url: "https://oblaser.ch/", newTab: false, text: "Homepage", htmlStyle: "display: inline-block;" },
        { type: "text", text: "|", htmlStyle: "display: inline-block; padding-left: 7px; padding-right: 7px;" },
        { type: "link", url: "https://oblaser.ch/impressum/", newTab: false, text: "Imprint", htmlStyle: "display: inline-block;" }
    ]
};
