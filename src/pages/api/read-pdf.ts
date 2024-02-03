/* 
    Using pdf.js-extract to extract text from a pdf

    test pdf is located in the public directory
     
*/

import type { NextApiRequest, NextApiResponse } from 'next';
import {
    PDFExtract,
    PDFExtractResult,
    PDFExtractOptions,
} from 'pdf.js-extract';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    async function run(): Promise<void> {
        const pdfExtract = new PDFExtract();
        const options: PDFExtractOptions = { normalizeWhitespace: true };

        const data: PDFExtractResult = await pdfExtract.extract(
            'public/josh-tully-resume-1-24-1.pdf',
            options
        );

        const pagesArr = data.pages;
        let fullText: string[] = [];

        pagesArr.forEach((page) => {
            const contentArr = page.content;
            let strArr = contentArr.map((content) => content.str);
            fullText = fullText.concat(strArr);
        });

        const stringOfText = fullText.join();

        res.status(200).send({ message: 'success', data: stringOfText });
        return;
    }

    run().catch((e) => {
        console.log(e);
        res.status(500).send({ message: e });
        return;
    });
}
