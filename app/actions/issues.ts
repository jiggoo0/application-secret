// app/actions/issues.ts
'use server';

import { supabaseServer } from '@/lib/supabase/server';

/**
 * @name updateClientIssue
 * @description Server Action จัดการ UPSERT (Insert/Update) ปัญหาของลูกค้า
 */
export async function updateClientIssue(formData: FormData) {
  const issueId = formData.get('issueId') as string;
  const clientId = formData.get('clientId') as string;
  const issueType = formData.get('issueType') as string;
  const description = formData.get('description') as string;
  const priority = formData.get('priority') as string;

  // 1. Validation (Business Logic)
  if (!clientId || !issueType || !description || !priority) {
    return { success: false, message: 'กรุณากรอกข้อมูลที่จำเป็นให้ครบถ้วน' };
  }

  // 2. Persistence (Supabase UPSERT)
  try {
    const isUpdate = !!issueId;

    const payload = {
      id: isUpdate ? issueId : undefined,
      client_id: clientId,
      issue_type: issueType,
      description: description,
      priority: priority,
      status: isUpdate ? 'UPDATED' : 'OPEN',
      updated_at: new Date().toISOString(),
      created_at: isUpdate ? undefined : new Date().toISOString(),
    };

    const { data, error } = await supabaseServer
      .from('client_issues')
      .upsert(payload, { onConflict: 'id' })
      .select('id')
      .single();

    if (error) throw new Error(error.message);
    if (!data) throw new Error('ไม่สามารถบันทึกข้อมูลได้');

    const savedIssueId = data.id;

    return {
      success: true,
      message: `บันทึกปัญหา ${savedIssueId} สำเร็จ`,
      issueId: savedIssueId,
    };
  } catch (error) {
    console.error('Database save error:', error);
    return {
      success: false,
      message: `เกิดข้อผิดพลาดในการบันทึกข้อมูล: ${(error as Error).message}`,
    };
  }
}
