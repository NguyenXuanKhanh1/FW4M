import * as FileSaver from 'file-saver';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { Injectable } from '@angular/core';

const CSV_TYPE = 'text/csv;charset=utf-8';
const CSV_EXTENSION = '.csv';

@Injectable({
    providedIn: "root"
})

export class ExportFile {
    public exportToPdf(data: any[], fileName: string) {
        var dd = {
            content: [
                { text: 'Consumers', style: 'header' },
                {
                    table: {
                        headerRows: 1,
                        body: [
                            [{ text: 'custom_id', style: 'tableHeader', color: 'white', bold: true },
                            { text: 'id', style: 'tableHeader', color: 'white', bold: true },
                            { text: 'tags', style: 'tableHeader', color: 'white', bold: true },
                            { text: 'username', style: 'tableHeader', color: 'white', bold: true },
                            { text: 'created', style: 'tableHeader', color: 'white', bold: true }]
                        ]
                    },
                    layout: {
                        fillColor: function (rowIndex, node, columnIndex) {
                            return (rowIndex % 2 === 0 && rowIndex != 0) ? '#FFFFFF' : (rowIndex === 0) ? '#5D9AD2' : '#DAECF9';
                        }
                    }
                }
            ]
        }
        for (let index = 0; index < data.length; index++) {
            dd.content[1].table.body.push([data[index].custom_id, data[index].id, data[index].tags, data[index].username, data[index].created_at])
        }
        pdfMake.vfs = pdfFonts.pdfMake.vfs;
        pdfMake.createPdf(dd).download(fileName);
    }

    public exportToCSV(data: any[], excelFileName: string): void {
        if (!data || !data.length) {
            return;
        }
        const separator = ',';
        const keys = Object.keys(data[0]);
        const excel =
            keys.join(separator) +
            '\n' +
            data.map(row => {
                return keys.map(k => {
                    let cell = row[k] === null || row[k] === undefined ? '' : row[k];
                    cell = cell instanceof Date
                        ? cell.toLocaleString()
                        : cell.toString().replace(/"/g, '""');
                    if (cell.search(/("|,|\n)/g) >= 0) {
                        cell = `"${cell}"`;
                    }
                    return cell;
                }).join(separator);
            }).join('\n');
        const blob = new Blob([excel], { type: CSV_TYPE });
        FileSaver.saveAs(blob, excelFileName + '_export_' + new Date().getTime() + CSV_EXTENSION);
    }
}