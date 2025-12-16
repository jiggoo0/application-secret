cd /data/data/com.termux/files/home/application-secret/generator

# ลบไฟล์ที่มี (1), -Copy, และตัวซ้ำอื่นๆ
rm -f fonts/*"(1)"*
rm -f fonts/*"-Copy"*
rm -f fonts/THSarabunNew\ Bold\(1\).ttf
rm -f fonts/THSarabunNew\ BoldItalic\(1\).ttf
rm -f fonts/THSarabunNew\(1\).ttf

echo "✅ คลีนไฟล์ซ้ำเสร็จสิ้น"
