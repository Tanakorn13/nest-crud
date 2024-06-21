import { Injectable } from '@nestjs/common';
import { CreatePdfDto } from './dto/create-pdf.dto';
import { UpdatePdfDto } from './dto/update-pdf.dto';
import * as PDFDocument from 'pdfkit'
import * as PDF from 'pdf-lib'
import axios from 'axios';
import * as fs from 'fs'
import * as path from 'path'
import * as ejs from 'ejs';
import * as fontkit from 'fontkit';

@Injectable()
export class PdfService {
  create(createPdfDto: CreatePdfDto) {
    return 'This action adds a new pdf';
  }


  async genreatePdf(): Promise<string> {
    let resData = await axios.get('https://gosongkhla.one.th/go/api/v1/content/public/b32d5d05-916c-4e7b-92ef-6f89b9aeb38b')
    // console.log('resData: ', resData.data);
    const extractData = resData.data
    console.log("extractData:", extractData);

    const outputDir = path.join(__dirname, '..', 'public');
    const pdfPath = path.join(outputDir, 'generated.pdf');
    const fontDir = path.join(__dirname, '..', 'assets', 'fonts');
    const fontPath = path.join(fontDir, 'THSarabunNew.ttf');
    let photoArray = [];
    // console.log("PhotoArray: ", photoArray);
    for (let i = 0; i < extractData.data.contentAttachments.length; i++) {
      const photo = extractData.data.contentAttachments[i];
      photoArray.push(encodeURI('https://gosongkhla.one.th/go' + photo.src))
    }

    // console.log("photoArray", photoArray);

    const imgUrl = photoArray[0]
    const imageBuffer = await this.downloadImageAsBuffer(imgUrl);


    const pdfDoc = new PDFDocument({ bufferPages: true });

    pdfDoc.pipe(fs.createWriteStream(pdfPath));

    // Example of adding content to PDF
    pdfDoc.font(fontPath).fontSize(12);

    pdfDoc.text(`${extractData.data.cName_th}`, { align: 'center' });

    pdfDoc.image(imageBuffer, 150, 90, {
      width: 300,
      align: 'center',
      valign: 'center'
    })
    pdfDoc.moveDown(1)
    pdfDoc.text(`Name (TH): ${extractData.data.cName_th}`, 50, 275, { align: 'left' });
    pdfDoc.text(`Name (EN): ${extractData.data.cName_en}`, { align: 'left' });
    pdfDoc.text(`Description (TH): ${extractData.data.cDesc_th}`, { align: 'left' });
    pdfDoc.text(`Description (EN): ${extractData.data.cDesc_en}`, { align: 'left' });

    pdfDoc.end();

    return pdfPath;
  }

  private async downloadImageAsBuffer(url: string): Promise<Buffer> {
    const response = await axios({
      url,
      method: 'GET',
      responseType: 'arraybuffer',
    });

    return Buffer.from(response.data);
  }

  //----------------------------------------
  async createPdf(data: any): Promise<Buffer> {
    // โหลดฟอนต์ภาษาไทย
    const fontPath = path.join(__dirname, '..', 'assets', 'fonts', 'THSarabunNew.ttf');
    const fontBytes = fs.readFileSync(fontPath);

    // สร้างเอกสาร PDF ใหม่
    const pdfDoc = await PDF.PDFDocument.create();

    // ลงทะเบียน fontkit
    pdfDoc.registerFontkit(fontkit);

    const page = pdfDoc.addPage();
    const { width, height } = page.getSize();

    // ฝังฟอนต์ภาษาไทย
    const customFont = await pdfDoc.embedFont(fontBytes);

    // กำหนด Template และข้อมูล
    const templatePath = path.join(__dirname, '..', 'templates', 'template.ejs');
    const template = fs.readFileSync(templatePath, 'utf8');
    const html = ejs.render(template, { data });

    // เขียน HTML ลงใน PDF
    const fontSize = 12;
    const textWidth = customFont.widthOfTextAtSize(html, fontSize);
    page.drawText(html, {
      x: 50,
      y: height - 50 - textWidth,
      size: fontSize,
      font: customFont,
      color: PDF.rgb(0, 0, 0),
    });

    // ส่งออกเป็น Buffer
    const pdfBytes = await pdfDoc.save();
    return Buffer.from(pdfBytes);
  }

  //----------------------------------------
  findAll() {
    return `This action returns all pdf`;
  }

  findOne(id: number) {
    return `This action returns a #${id} pdf`;
  }

  update(id: number, updatePdfDto: UpdatePdfDto) {
    return `This action updates a #${id} pdf`;
  }

  remove(id: number) {
    return `This action removes a #${id} pdf`;
  }
}
