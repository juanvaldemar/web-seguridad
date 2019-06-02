import { Injectable } from "@angular/core";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
const EXCEL_TYPE =
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
const EXCEL_EXTENSION = ".xlsx";
@Injectable({
  providedIn: "root"
})
export class ExcelService {
  constructor() { }
  public exportAsExcelFile(json: any[], excelFileName: string): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const workbook: XLSX.WorkBook = {
      Sheets: { data: worksheet },
      SheetNames: ["data"]
    };
    const excelBuffer: any = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array"
    });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }
  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
    let hora = [
      new Date().getDate(),
      new Date().getMonth(),
      new Date().getFullYear(),
      new Date().getHours(),
      new Date().getMinutes(),
      new Date().getSeconds()
    ];

    const horario = hora.map(value => {
      return value < 10 ? '0' + value : value;
    })
    FileSaver.saveAs(
      data,
      fileName +
      "_export_" +
      horario[0] + horario[1] + horario[2] + "_" +
      horario[3] + horario[4] + horario[5] +
      EXCEL_EXTENSION
    );
  }
}
