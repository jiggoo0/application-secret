import CategoryArchiveTemplate from "@/components/templates/CategoryArchiveTemplate";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "คลังข้อมูลบริการธุรกิจและกฎหมาย | JP-VISOUL",
  description:
    "รวบรวมบริการจดทะเบียนบริษัท นิติกรรมสัญญา และที่ปรึกษาทางธุรกิจ",
};

export default function LegalArchivePage() {
  return (
    <CategoryArchiveTemplate
      category="legal"
      title="ธุรกิจ & กฎหมาย (Archive)"
    />
  );
}
