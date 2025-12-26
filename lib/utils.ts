/** @format */ // lib/utils.ts

/**

🌟 Classnames Utility

รวม class หลายตัวเข้าด้วยกันแบบ conditional */ export function cn(
  ...classes: (string | boolean | undefined | null)[]
) {
  return classes.filter(Boolean).join(" ")
}
