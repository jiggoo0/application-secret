// app/actions/lead.ts
'use server';

import { z } from 'zod';

interface ActionResponse {
  success: boolean;
  message: string;
  fieldErrors?: { [key: string]: string };
}

const LeadSchema = z.object({
  email: z.string().email({ message: 'รูปแบบอีเมลไม่ถูกต้อง' }),

  monthlyIncome: z.coerce.number().min(1, { message: 'รายได้ต่อเดือนต้องมากกว่า 0' }),

  monthlyDebt: z.coerce.number().min(0, { message: 'ภาระหนี้ต้องไม่เป็นค่าติดลบ' }),

  sourceSlug: z.string().optional(),
});

export async function submitDtiLead(
  prevState: ActionResponse,
  formData: FormData,
): Promise<ActionResponse> {
  const rawFormData = {
    email: formData.get('email'),
    monthlyIncome: formData.get('monthlyIncome'),
    monthlyDebt: formData.get('monthlyDebt'),
    sourceSlug: formData.get('sourceSlug'),
  };

  const validatedFields = LeadSchema.safeParse(rawFormData);

  if (!validatedFields.success) {
    const fieldErrors: Record<string, string> = {};

    for (const issue of validatedFields.error.issues) {
      if (issue.path.length > 0) {
        fieldErrors[issue.path[0] as string] = issue.message;
      }
    }

    return {
      success: false,
      message: 'โปรดตรวจสอบข้อมูลที่กรอกให้ถูกต้อง',
      fieldErrors,
    };
  }

  const { email, monthlyIncome, monthlyDebt, sourceSlug } = validatedFields.data;

  const dti = monthlyDebt / monthlyIncome;
  const dtiPercentage = (dti * 100).toFixed(2);

  try {
    console.log(
      `[SERVER ACTION SUCCESS] New Lead: ${email}, DTI: ${dtiPercentage}% from source: ${sourceSlug}`,
    );

    return {
      success: true,
      message: `DTI เบื้องต้นของคุณคือ ${dtiPercentage}% ผู้เชี่ยวชาญจะติดต่อกลับเพื่อปรึกษาฟรี!`,
    };
  } catch (error) {
    console.error('Database or Server Error:', error);
    return {
      success: false,
      message: 'เกิดข้อผิดพลาดในการบันทึกข้อมูล กรุณาลองใหม่อีกครั้ง',
    };
  }
}
