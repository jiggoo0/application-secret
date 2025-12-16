// blocks/salary_certificate_template.js
// Template for generating a formal Salary Certificate PDF (Thai/English).

/**
 * Builds the PDF content for the Salary Certificate.
 * NOTE: This template assumes standard A4 portrait layout.
 *
 * @param {object} data - Data structure containing employee and company details.
 * @returns {Array} pdfmake content array (Document Definition Content).
 */
export function buildSalaryCertificateContent(data) {
  const isThai = data.language === 'TH';

  // --- Styles ---
  const styleBase = { font: isThai ? 'THSarabunNew' : 'Roboto' };
  const headerStyle = {
    ...styleBase,
    fontSize: 20,
    bold: true,
    color: '#003366',
    margin: [0, 0, 0, 15],
  };
  const subHeaderStyle = { ...styleBase, fontSize: 14, bold: true, margin: [0, 15, 0, 5] };
  const bodyTextStyle = { ...styleBase, fontSize: 11, lineHeight: 1.5 };
  const tableHeaderStyle = {
    ...styleBase,
    bold: true,
    fontSize: 11,
    fillColor: '#f0f0f0',
    margin: [0, 3, 0, 3],
  };
  const tableCellStyle = { ...styleBase, fontSize: 10, margin: [0, 2, 0, 2] };

  // Helper function for translating text
  const t = (thText, enText) => (isThai ? thText : enText);

  // --- 1. Document Title ---
  const titleBlock = [
    {
      text: t('หนังสือรับรองเงินเดือน', 'SALARY CERTIFICATE'),
      style: headerStyle,
      alignment: 'center',
    },
    // 💡 Add company details
    {
      text: t('บริษัท JP-VISOUL-DOCS จำกัด', 'JP-VISOUL-DOCS Co., Ltd.'),
      style: bodyTextStyle,
      alignment: 'center',
    },
    {
      text: t(
        `ที่อยู่: ${data.company.address || 'ไม่ระบุ'} | โทรศัพท์: ${data.company.phone || 'ไม่ระบุ'}`,
        `Address: ${data.company.address || 'N/A'} | Phone: ${data.company.phone || 'N/A'}`,
      ),
      style: { ...bodyTextStyle, fontSize: 9, alignment: 'center', margin: [0, 0, 0, 20] },
    },
  ];

  // --- 2. Recipient and Subject ---
  const recipientBlock = [
    { text: t('เรียน ผู้เกี่ยวข้อง', 'To Whom It May Concern'), style: subHeaderStyle },
    {
      text: t(
        'เรื่อง: ขอรับรองการทำงานและเงินเดือน',
        'Subject: Employment and Salary Certification',
      ),
      style: { ...bodyTextStyle, bold: true, margin: [0, 5, 0, 10] },
    },

    // Main Body Text
    {
      text: [
        { text: t('บริษัท ', 'This is to certify that '), style: bodyTextStyle },
        {
          text: t('JP-VISOUL-DOCS จำกัด', 'JP-VISOUL-DOCS Co., Ltd. '),
          style: { ...bodyTextStyle, bold: true },
        },
        { text: t('ขอรับรองว่า ', 'certifies that '), style: bodyTextStyle },
        {
          text: `${data.employee.title || ''} ${data.employee.name}`,
          style: { ...bodyTextStyle, bold: true, decoration: 'underline' },
        },
        { text: t(' ได้ปฏิบัติงานในตำแหน่ง ', ' has been employed as '), style: bodyTextStyle },
        {
          text: data.employee.position,
          style: { ...bodyTextStyle, bold: true, decoration: 'underline' },
        },
        { text: t(' แผนก/ฝ่าย ', ' in the '), style: bodyTextStyle },
        {
          text: data.employee.department,
          style: { ...bodyTextStyle, bold: true, decoration: 'underline' },
        },
        {
          text: t(
            ` โดยเริ่มปฏิบัติงานตั้งแต่วันที่ ${data.employee.startDate} จนถึงปัจจุบัน`,
            ` since ${data.employee.startDate} to the present time.`,
          ),
          style: bodyTextStyle,
        },
      ],
      margin: [0, 0, 0, 15],
    },
  ];

  // --- 3. Salary Details Table ---
  const salaryDetailsBlock = [
    {
      text: t('รายละเอียดเงินเดือน (Salary Details)', 'SALARY DETAILS'),
      style: subHeaderStyle,
      color: '#c62828',
    },
    {
      table: {
        widths: ['25%', '25%', '*'],
        body: [
          [
            { text: t('รายการ (Description)', 'Description'), style: tableHeaderStyle },
            {
              text: t('อัตราต่อเดือน (Amount/Month)', 'Amount/Month'),
              style: tableHeaderStyle,
              alignment: 'right',
            },
            { text: t('ตัวอักษร (In Words)', 'In Words'), style: tableHeaderStyle },
          ],
          [
            { text: t('เงินเดือนประจำ (Base Salary)', 'Base Salary'), style: tableCellStyle },
            {
              text: `${data.salary.base} ${data.salary.currency || 'THB'}`,
              style: tableCellStyle,
              alignment: 'right',
            },
            { text: data.salary.baseInWords || '', style: tableCellStyle },
          ],
          [
            {
              text: t('ค่าตำแหน่ง/ค่าอื่น ๆ (Allowances/Others)', 'Allowances/Others'),
              style: tableCellStyle,
            },
            {
              text: `${data.salary.allowance} ${data.salary.currency || 'THB'}`,
              style: tableCellStyle,
              alignment: 'right',
            },
            { text: '', style: tableCellStyle },
          ],
          [
            {
              text: t('รวมรายได้ต่อเดือน (Total Gross Income)', 'Total Gross Income'),
              style: { ...tableHeaderStyle, fillColor: '#e3f2fd', color: '#003366' },
            },
            {
              text: `${data.salary.total} ${data.salary.currency || 'THB'}`,
              style: { ...tableHeaderStyle, fillColor: '#e3f2fd', color: '#003366' },
              alignment: 'right',
            },
            {
              text: data.salary.totalInWords || '',
              style: { ...tableHeaderStyle, fillColor: '#e3f2fd', color: '#003366' },
            },
          ],
        ],
      },
      layout: 'lightHorizontalLines',
      margin: [0, 5, 0, 15],
    },
  ];

  // --- 4. Purpose and Footer ---
  const footerBlock = [
    // Purpose
    {
      text: t(
        'หนังสือรับรองนี้ออกให้เพื่อใช้สำหรับ:',
        'This certificate is issued for the purpose of:',
      ),
      style: subHeaderStyle,
    },
    {
      text: data.purpose,
      style: { ...bodyTextStyle, bold: true, decoration: 'underline', margin: [0, 5, 0, 15] },
    },

    // Concluding Statement
    {
      text: t(
        `จึงเรียนมาเพื่อโปรดทราบและใช้เป็นหลักฐานประกอบการดำเนินการตามวัตถุประสงค์ข้างต้น ออกให้เมื่อวันที่ ${data.issueDate}`,
        `This letter is issued upon request of the employee for the purpose stated above and is valid only for the duration of employment. Issued on ${data.issueDate}.`,
      ),
      style: bodyTextStyle,
      margin: [0, 0, 0, 50],
    },

    // Signature Block (using columns for placement)
    {
      columns: [
        {
          width: '50%',
          stack: [
            {
              text: t(
                'ลงชื่อ____________________________________',
                'Signature_________________________________',
              ),
              style: bodyTextStyle,
            },
            {
              text: t(
                '(____________________________________)',
                '(____________________________________)',
              ),
              style: bodyTextStyle,
            },
            {
              text: t(
                'ตำแหน่ง: _________________________________',
                'Title: ____________________________________',
              ),
              style: bodyTextStyle,
            },
          ],
        },
        {
          width: '50%',
          stack: [
            {
              text: t('(ประทับตราบริษัท)', '(Company Seal)'),
              style: { ...bodyTextStyle, alignment: 'right' },
            },
          ],
        },
      ],
      margin: [0, 0, 0, 10],
    },
  ];

  return [...titleBlock, ...recipientBlock, ...salaryDetailsBlock, ...footerBlock];
}
