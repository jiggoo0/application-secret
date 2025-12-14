// /lib/html_templates/generateNotFoundHtml.js

/**
 * @description สร้าง HTML Page สำหรับหน้า 404 Not Found (JP VISOUL Theme)
 * @param {object} data - ข้อมูลสำหรับปรับแต่งข้อความ error (Optional)
 * @returns {string} - โค้ด HTML ที่สมบูรณ์
 */
export const generateNotFoundHtml = (data = {}) => {
  // 💡 Data Destructuring - กำหนดค่า Default หากไม่มีการส่งข้อมูลมา
  const {
    brand_name = 'JP VISOUL - DOCS',
    error_code = '404',
    title = 'DOCUMENT NOT FOUND',
    message = 'We apologize, but the document or resource you were looking for could not be found on our server. It might have been moved, deleted, or the link you followed is incorrect.',
    redirect_url = '/',
    redirect_label = 'Go to Homepage / Main Dashboard',
    reference_id = null, // e.g. 'ERR-123456'
  } = data;

  // Semantic Color Definitions
  const accent = '#c62828'; // JP Red
  const lightAccent = '#ffcdd2';
  const bg = '#f5f5f5';
  const border = '#e0e0e0';

  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8" />
    <title>${error_code} - ${title} | ${brand_name}</title>
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <style>
        :root {
            --accent: ${accent};
            --light-accent: ${lightAccent};
            --muted: #666;
            --bg: ${bg};
            --border: ${border};
            --font-sans: "Arial", "Helvetica", sans-serif;
        }

        /* Base */
        html, body {
            height: 100%;
            margin: 0;
            background: var(--bg);
            font-family: var(--font-sans);
            color: #333;
            display: flex;
            justify-content: center;
            align-items: center;
            text-align: center;
        }

        /* Container */
        .container {
            width: 100%;
            max-width: 500px;
            padding: 40px;
            margin: 20px;
            border: 1px solid var(--border);
            background: #ffffff;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
            border-radius: 8px;
            box-sizing: border-box;
        }

        /* Error Code */
        .error-code {
            font-size: 80px;
            font-weight: 900;
            color: var(--accent);
            margin: 0;
            line-height: 1;
            letter-spacing: -2px;
        }

        /* Header */
        h1 {
            font-size: 24px;
            color: #111;
            margin: 10px 0 20px 0;
            border-bottom: 2px solid var(--light-accent);
            padding-bottom: 15px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }

        /* Message */
        p {
            font-size: 15px;
            color: var(--muted);
            margin-bottom: 25px;
            line-height: 1.6;
        }

        /* Brand & Link */
        .brand {
            font-size: 14px;
            font-weight: 700;
            color: var(--accent);
            margin-bottom: 5px;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        
        .action-link {
            display: inline-block;
            padding: 12px 24px;
            background: var(--accent);
            color: white;
            text-decoration: none;
            border-radius: 4px;
            font-weight: 700;
            font-size: 14px;
            transition: background 0.2s ease, transform 0.1s ease;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .action-link:hover {
            background: #b71c1c; /* Darker Red */
            transform: translateY(-1px);
        }
        .action-link:active {
            transform: translateY(0);
        }

        /* Utility */
        .ref-id {
            margin-top: 25px; 
            font-size: 11px; 
            color: #bbb;
            font-family: monospace;
        }
    </style>
</head>
<body>
    <div class="container" role="alert" aria-live="assertive">
        <div class="brand">${brand_name}</div>
        <div class="error-code">${error_code}</div>
        <h1>${title}</h1>
        <p>
            ${message}
        </p>
        
        <a href="${redirect_url}" class="action-link">${redirect_label}</a>
        
        ${
          reference_id
            ? `<div class="ref-id">Ref ID: ${reference_id}</div>`
            : '<div class="ref-id">Please contact support if the problem persists.</div>'
        }
    </div>
</body>
</html>
  `;
};
