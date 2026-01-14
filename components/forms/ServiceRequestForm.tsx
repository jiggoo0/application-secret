"use client";

import React, { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage,
  FormDescription
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { toast } from "sonner";
import { Loader2, FileText } from "lucide-react";

// นำเข้า Validation และ Action ที่แก้ไขแล้ว
import { serviceRequestSchema, type ServiceRequestInput } from "@/lib/validations/documentSchema";
import { createServiceRequest } from "@/actions/documentActions";

interface ServiceRequestFormProps {
  defaultService?: string;
}

export default function ServiceRequestForm({ defaultService }: ServiceRequestFormProps) {
  const [isPending, startTransition] = useTransition();

  // สร้าง Form โดยใช้ชื่อฟิลด์ที่ตรงกับ Schema ใหม่
  const form = useForm<ServiceRequestInput>({
    resolver: zodResolver(serviceRequestSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      service_type: defaultService || "", // แก้จาก category
      details: "",                      // แก้จาก message
      urgency: "normal",
      privacyPolicy: false,
    },
  });

  const onSubmit = async (values: ServiceRequestInput) => {
    startTransition(async () => {
      try {
        const result = await createServiceRequest(values);
        if (result.success) {
          toast.success(result.message || "บันทึกคำขอรับบริการเรียบร้อยแล้ว");
          form.reset();
        } else {
          toast.error(result.error || "เกิดข้อผิดพลาดในการส่งข้อมูล");
        }
      } catch {
        // ลบ (err) ออกเพื่อผ่าน Linting
        toast.error("การเชื่อมต่อเซิร์ฟเวอร์ขัดข้อง โปรดลองอีกครั้ง");
      }
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-medium text-[#0A192F]">ชื่อ-นามสกุล (ผู้ติดต่อ)</FormLabel>
                <FormControl>
                  <Input placeholder="ระบุชื่อตามหน้าพาสปอร์ตหรือบัตรประชาชน" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-medium text-[#0A192F]">เบอร์โทรศัพท์ติดต่อ</FormLabel>
                <FormControl>
                  <Input type="tel" placeholder="08x-xxx-xxxx" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-medium text-[#0A192F]">อีเมล (เพื่อรับใบเสนอราคา)</FormLabel>
              <FormControl>
                <Input type="email" placeholder="example@jp-visoul.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="service_type"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-medium text-[#0A192F]">ประเภทบริการที่ต้องการ</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="เลือกประเภทบริการ" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="translation">แปลเอกสาร (Translation)</SelectItem>
                    <SelectItem value="legalization">รับรองเอกสาร (Legalization)</SelectItem>
                    <SelectItem value="visa-consultancy">ปรึกษาเรื่องวีซ่า (Visa)</SelectItem>
                    <SelectItem value="notary">รับรองทนาย (Notary Public)</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="urgency"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-medium text-[#0A192F]">ระยะเวลาที่ต้องการ</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="normal">มาตรฐาน (3-5 วันทำการ)</SelectItem>
                    <SelectItem value="urgent">เร่งด่วน (1-2 วันทำการ)</SelectItem>
                    <SelectItem value="express">ด่วนพิเศษ (Same Day)</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="details"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-medium text-[#0A192F]">รายละเอียดเพิ่มเติม / รายการเอกสาร</FormLabel>
              <FormControl>
                <Textarea 
                  rows={4} 
                  placeholder="ระบุชื่อเอกสารที่ต้องการแปล หรือประเภทวีซ่าที่ต้องการปรึกษา..." 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="privacyPolicy"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-lg border border-slate-200 p-4 bg-slate-50/50">
              <FormControl>
                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel className="text-sm font-medium cursor-pointer">
                  ยอมรับเงื่อนไขการจัดการข้อมูลส่วนบุคคล
                </FormLabel>
                <FormDescription className="text-xs">
                  ข้อมูลจะถูกเก็บเป็นความลับสูงสุดตามมาตรฐาน PDPA Compliance
                </FormDescription>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />

        <Button 
          type="submit" 
          disabled={isPending}
          className="w-full bg-[#0A192F] hover:bg-[#112240] text-white py-6 shadow-md transition-all active:scale-[0.98]"
        >
          {isPending ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              กำลังประมวลผลความปลอดภัย...
            </>
          ) : (
            <>
              <FileText className="mr-2 h-5 w-5" />
              ส่งคำขอรับบริการ (Secure Submit)
            </>
          )}
        </Button>
      </form>
    </Form>
  );
}
